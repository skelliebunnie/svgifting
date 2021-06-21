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
}));

function DisplayOptions({ options, display, handleInputChange }) {
  return (
    <div style={{ flex: '1 0 auto', maxWidth: '20%' }}>
      <InputLabel id="display-label">Display Format</InputLabel>
      <FormControl>
        <RadioGroup
          aria-label="display format"
          name="display"
          value={display}
          onChange={(e) => handleInputChange(e, "display")}
        >
          <Grid container>
            {options.map((opt) => (
              <Grid key={opt} item>
                <FormControlLabel label={opt} value={opt} control={<Radio />} />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default function Gifts() {
  const classes = useStyles();

  const { universalLoves, getIcon } = useContext(DatabaseContext)

  const [tabValue, setTabValue] = useState(0);
  
  const [lovedGifts, setLovedGifts] = useState([]);
  const [likedGifts, setLikedGifts] = useState([]);
  const [neutralGifts, setNeutralGifts] = useState([]);
  const [dislikedGifts, setDislikedGifts] = useState([]);
  const [hatedGifts, setHatedGifts] = useState([]);
  const [includeUniversalLoves, setIncludeULoves] = useState(JSON.parse(localStorage.getItem("sv_include_uloves")) || false);

  const [allGifts, setAllGifts] = useState([[],[],[],[],[]])

  const displayOptions = ['grid', 'table']
  const [displayStyle, setDisplayStyle] = useState(displayOptions[0]);

  useEffect(() => {
    API.getGiftsByPreference('love').then(list => {
      const loved = list.data.map(gift => ({...gift, icon: getIcon(gift.name)}));
      setLovedGifts(loved || []);
      
      API.getGiftsByPreference('like').then(list => {
        const liked = list.data.map(gift => ({...gift, icon: getIcon(gift.name)}));
        setLikedGifts(liked || []);

        API.getGiftsByPreference('neutral').then(list => {
          const neutral = list.data.map(gift => ({...gift, icon: getIcon(gift.name)}));
          setNeutralGifts(neutral || []);

          API.getGiftsByPreference('dislike').then(list => {
            const disliked = list.data.map(gift => ({...gift, icon: getIcon(gift.name)}));
            setDislikedGifts(disliked || []);

            API.getGiftsByPreference('hate').then(list => {
              const hated = list.data.map(gift => ({...gift, icon: getIcon(gift.name)}));
              setHatedGifts(hated || []);

              setAllGifts([loved, liked, neutral, disliked, hated])

            }).catch(err => console.error(err));

          }).catch(err => console.error(err));
      
        }).catch(err => console.error(err));
    
        
      }).catch(err => console.error(err));
  
      
    }).catch(err => console.error(err));

  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(includeUniversalLoves) {
      setLovedGifts(allGifts[0] || [])
      setHatedGifts(allGifts[4] || [])

    } else {
      setLovedGifts(
        allGifts[0].filter((gift) => !universalLoves.includes(gift.name))
      );
      setHatedGifts(
        allGifts[4].filter((gift) => !universalLoves.includes(gift.name))
      );
    }
  }, [includeUniversalLoves, universalLoves, allGifts])

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

  const handleDisplayChange = (e) => {
    setDisplayStyle(e.target.value)
  }

  return (
    <Box>
      <AppBar position="static" className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="villagers grouped by gifts, grouped by preference"
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
        <DisplayOptions
          options={displayOptions}
          display={displayStyle}
          handleInputChange={handleDisplayChange}
        />
        {tabValue === 0 || tabValue === 4 ? (
        <FormControlLabel
          label="Include Universally Loved Items"
          style={{
            display: "inline-block",
            flex: 1,
            paddingTop: "1.25rem",
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
          <GiftList list={lovedGifts} display={displayStyle} />
        </TabPanel>
        <TabPanel value={tabValue} index={1} className={classes.tabPanel}>
          <GiftList list={likedGifts} display={displayStyle} />
        </TabPanel>
        <TabPanel value={tabValue} index={2} className={classes.tabPanel}>
          <GiftList list={neutralGifts} display={displayStyle} />
        </TabPanel>
        <TabPanel value={tabValue} index={3} className={classes.tabPanel}>
          <GiftList list={dislikedGifts} display={displayStyle} />
        </TabPanel>
        <TabPanel value={tabValue} index={4} className={classes.tabPanel}>
          <GiftList list={hatedGifts} display={displayStyle} />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}
