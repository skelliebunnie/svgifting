import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from '../contexts/DatabaseContext'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, Tabs, Tab, Container, FormControlLabel, Checkbox, InputLabel, FormControl, RadioGroup, Grid, Radio } from '@material-ui/core'
import SwipeableViews from 'react-swipeable-views';
import API from '../utils/API'

import TabPanel from '../components/TabPanel'
import GiftList from '../components/GiftList'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabPanel: {
    [theme.breakpoints.down("md")]: {
      height: "90vh",
    },
    [theme.breakpoints.up("md")]: {
      padding: '0 2rem'
    }
  },
  displaySortBlock: {
    '& > .MuiGrid-item': {
      padding: 0
    }
  }
}));

function DisplayOptions({ options, display, handleInputChange }) {
  return (
    <div style={{ flex: '1 0 auto', maxWidth: '50%' }}>
      <InputLabel id="display-label">Display Format</InputLabel>
      <FormControl style={{width: '100%'}}>
        <RadioGroup
          aria-label="display format"
          name="display"
          value={display}
          onChange={(e) => handleInputChange(e, "display")}
        >
          <Grid container spacing={4}>
            {options.map((opt) => (
              <Grid key={opt} item xs={12} lg={6}>
                <FormControlLabel label={opt} value={opt} control={<Radio />} />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

function SortOptions({ options, sortBy, handleInputChange }) {
  return (
    <>
      <InputLabel id="sortby-label">Sort By</InputLabel>
      <small>Sorting by seasonal availability of items coming soon!</small>
      <FormControl>
        <RadioGroup aria-label="sort gifts by" name="sortby" value={sortBy} onChange={(e) => handleInputChange(e, 'sort')}>
          <Grid container spacing={4}>
            {options.map(opt =>
              <Grid key={opt} item>
                <FormControlLabel
                  label={opt}
                  value={opt}
                  control={
                    <Radio />
                  }
                />
              </Grid>
            )}
          </Grid>
        </RadioGroup>
      </FormControl>
    </>
  )
}

export default function Gifts() {
  const classes = useStyles();

  const { universalLoves, getIcon, sortItemData, dbNpcs } = useContext(DatabaseContext)

  const [tabValue, setTabValue] = useState(0);
  
  const [lovedGifts, setLovedGifts] = useState([]);
  const [likedGifts, setLikedGifts] = useState([]);
  const [neutralGifts, setNeutralGifts] = useState([]);
  const [dislikedGifts, setDislikedGifts] = useState([]);
  const [hatedGifts, setHatedGifts] = useState([]);

  const [includeUniversalLoves, setIncludeULoves] = useState(JSON.parse(localStorage.getItem("sv_include_uloves")) || false);

  const [minGiftList, setMinGiftList] = useState(JSON.parse(localStorage.getItem("sv_min_gift_list")) || false);

  const [allGifts, setAllGifts] = useState([[],[],[],[],[]])

  const displayOptions = ['cards', 'grid table']
  const [displayStyle, setDisplayStyle] = useState(displayOptions[0]);

  const sortOptions = ["Gift Name", "Number of NPCs"]
  const [sortBy, setSortBy] = useState('Gift Name')

  useEffect(() => {
    getAllGiftItems();

    if(minGiftList) {
      const list = tabValue === 0 ? lovedGifts : tabValue === 1 ? likedGifts : tabValue === 2 ? neutralGifts : tabValue === 3 ? dislikedGifts : hatedGifts;

      filterGiftItems(list);
    }

  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllGiftItems();

    if(minGiftList) {
      const list = tabValue === 0 ? lovedGifts : tabValue === 1 ? likedGifts : tabValue === 2 ? neutralGifts : tabValue === 3 ? dislikedGifts : hatedGifts;

      filterGiftItems(list);
    }

    // eslint-disable-next-line
  }, [sortBy]);

  useEffect(() => {
    let loved = allGifts[0];
    let hated = allGifts[4];

    if(!includeUniversalLoves) {
      loved = loved.filter((gift) => !universalLoves.includes(gift.name));
      hated = hated.filter((gift) => !universalLoves.includes(gift.name));

    }

    if(minGiftList) {
      loved = filterGiftItems(loved);
      hated = filterGiftItems(hated);
    }

    setLovedGifts(loved || []);
    setHatedGifts(hated || []);

  }, [includeUniversalLoves, universalLoves, allGifts])

  useEffect(() => {
    const list = tabValue === 0 ? lovedGifts : tabValue === 1 ? likedGifts : tabValue === 2 ? neutralGifts : tabValue === 3 ? dislikedGifts : hatedGifts;

    if(minGiftList) {
      filterGiftItems(list);

    } else {
      getAllGiftItems();
    }

  }, [minGiftList])

  const getAllGiftItems = () => {
    API.getGiftsByPreference('love').then(list => {
      const allLoved = list.data.map(gift => ({ ...gift, icon: getIcon(gift.name) }));
      let loved = sortItemData(allLoved, sortBy);

      setLovedGifts(loved || []);

      API.getGiftsByPreference('like').then(list => {
        const allLiked = list.data.map(gift => ({ ...gift, icon: getIcon(gift.name) }));
        let liked = sortItemData(allLiked, sortBy);

        setLikedGifts(liked || []);

        API.getGiftsByPreference('neutral').then(list => {
          const allNeutral = list.data.map(gift => ({ ...gift, icon: getIcon(gift.name) }));
          let neutral = sortItemData(allNeutral, sortBy);

          setNeutralGifts(neutral || []);

          API.getGiftsByPreference('dislike').then(list => {
            const allDisliked = list.data.map(gift => ({ ...gift, icon: getIcon(gift.name) }));
            let disliked = sortItemData(allDisliked, sortBy);

            setDislikedGifts(disliked || []);

            API.getGiftsByPreference('hate').then(list => {
              const allHated = list.data.map(gift => ({ ...gift, icon: getIcon(gift.name) }));
              let hated = sortItemData(allHated, sortBy);

              setHatedGifts(hated || []);

              setAllGifts([allLoved, allLiked, allNeutral, allDisliked, allHated]);

            }).catch(err => console.error(err));

          }).catch(err => console.error(err));

        }).catch(err => console.error(err));


      }).catch(err => console.error(err));


    }).catch(err => console.error(err));
  }

  const filterGiftItems = (list) => {
    const allNpcs = dbNpcs;

    // const list = tabValue === 0 ? lovedGifts : tabValue === 1 ? likedGifts : tabValue === 2 ? neutralGifts : tabValue === 3 ? dislikedGifts : hatedGifts;

    let gifts = sortItemData(list, 'Number of NPCs');
    let foundNpcs = [];
    let minGifts = [];

    for (var i = 0; i < gifts.length; i++) {
      if (foundNpcs.length < allNpcs.length) {
        let gift = gifts[i];

        let npcs = gift.Npcs.map(npc => npc.name);
        npcs = npcs.filter(name => !foundNpcs.includes(name));

        // if there are npcs not yet "found", add them to the found list
        // filter out any previously found npcs from the gift's list
        // and push the gift into the minimum list
        if (npcs.length > 0) {
          foundNpcs = [...foundNpcs, ...npcs];
          // console.log(gift.name, npcs)
          gift.Npcs = gift.Npcs.filter(npc => npcs.includes(npc.name));

          gifts[i] = gift;

          minGifts.push(gift);
        }
      }
    }

    if(tabValue === 0) {
      setLovedGifts(minGifts);
    } else if(tabValue === 1) {
      setLikedGifts(minGifts);
    } else if(tabValue === 2) {
      setNeutralGifts(minGifts);
    } else if(tabValue === 3) {
      setDislikedGifts(minGifts);
    } else {
      setHatedGifts(minGifts);
    }

    return sortItemData(minGifts, sortBy);
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  const handleIndexChange = (index) => {
    setTabValue(index)
  }

  const toggleUniversalLoves = () => {
    setIncludeULoves(!includeUniversalLoves)

    localStorage.setItem("sv_include_uloves", !includeUniversalLoves);
  }

  const toggleMinGiftList = () => {
    setMinGiftList(!minGiftList)

    localStorage.setItem("sv_min_gift_list", !minGiftList);
  }

  const handleDisplayChange = (e) => {
    setDisplayStyle(e.target.value)
  }

  const handleInputChange = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <Box>
      <AppBar position="static" className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="npcs grouped by gifts, grouped by preference"
          indicatorColor="secondary"
        >
          <Tab
            label={`Loved (${lovedGifts.length})`}
            {...{ id: "tab-loved", "aria-controls": "loved-gifts-tab" }}
          />
          <Tab
            label={`Liked (${likedGifts.length})`}
            {...{ id: "tab-liked", "aria-controls": "liked-gifts-tab" }}
          />
          <Tab
            label={`Neutral (${neutralGifts.length})`}
            {...{ id: "tab-neutral", "aria-controls": "neutral-gifts-tab" }}
          />
          <Tab
            label={`Disliked (${dislikedGifts.length})`}
            {...{ id: "tab-disliked", "aria-controls": "disliked-gifts-tab" }}
          />
          <Tab
            label={`Hated (${hatedGifts.length})`}
            {...{ id: "tab-hated", "aria-controls": "hated-gifts-tab" }}
          />
        </Tabs>
      </AppBar>

      <Container
        maxWidth={"lg"}
        style={{
          marginTop: "2rem",
          display: "flex",
          flexFlow: "row wrap",
          justifyConten: "space-around",
        }}
      >
        <Grid container spacing={0} className={classes.displaySortBlock}>
          <Grid item container xs={12} lg={6} spacing={0}>
            <Grid item xs={12}>
              <DisplayOptions
                options={displayOptions}
                display={displayStyle}
                handleInputChange={handleDisplayChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                label="Minimum Gifts List"
                style={{
                  display: "inline-block",
                  flex: 1,
                  paddingTop: 0
                }}
                control={
                  <Checkbox
                    name="minGiftList"
                    value="minGiftList"
                    onChange={toggleMinGiftList}
                    checked={minGiftList}
                    style={{ display: "inline-block" }}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <SortOptions
              options={sortOptions}
              sortBy={sortBy}
              handleInputChange={handleInputChange}
            />
          </Grid>
        </Grid>
        
        {tabValue === 0 || tabValue === 4 ? (
        <FormControlLabel
          label="Include Universally Loved Items"
          style={{
            display: "inline-block",
            flex: 1,
            paddingTop: "0.25rem",
            borderTop: '1px solid gainsboro'
          }}
          control={
            <Checkbox
              name="includeUniversalLoves"
              value="includeUniversalLoves"
              onChange={toggleUniversalLoves}
              checked={includeUniversalLoves}
              style={{ display: "inline-block" }}
            />
          }
        />
        ) : (
          ""
        )}
      </Container>
      <SwipeableViews
        axis="x"
        index={tabValue}
        onChangeIndex={handleIndexChange}
      >
        <TabPanel value={tabValue} index={0} className={classes.tabPanel}>
          <GiftList list={lovedGifts} display={displayStyle} preference="love" />
        </TabPanel>
        <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
          <GiftList list={likedGifts} display={displayStyle} preference="like" />
        </TabPanel>
        <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
          <GiftList list={neutralGifts} display={displayStyle} preference="neutral" />
        </TabPanel>
        <TabPanel value={tabValue} index={3} className={classes.tabPanel}>
          <GiftList list={dislikedGifts} display={displayStyle} preference="dislike" />
        </TabPanel>
        <TabPanel value={tabValue} index={4} className={classes.tabPanel}>
          <GiftList list={hatedGifts} display={displayStyle} preference="hate" />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
