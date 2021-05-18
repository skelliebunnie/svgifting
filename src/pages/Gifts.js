import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from '../contexts/DatabaseContext'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, Tabs, Tab, Container, FormControlLabel, Checkbox } from '@material-ui/core'
import API from '../utils/API'

import TabPanel from '../components/TabPanel'
import GiftListItem from '../components/GiftListItem'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,

  },
  giftsList: {
    maxWidth: '80%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',
    margin: '0 auto',
    padding: '2rem 0 4rem'
  },
}));

export default function Gifts() {
  const classes = useStyles();

  const { universalLoves, getIcon } = useContext(DatabaseContext)

  const [tabValue, setTabValue] = useState(0);

  const [lovedGifts, setLovedGifts] = useState([]);
  const [likedGifts, setLikedGifts] = useState([]);
  const [neutralGifts, setNeutralGifts] = useState([]);
  const [dislikedGifts, setDislikedGifts] = useState([]);
  const [hatedGifts, setHatedGifts] = useState([]);
  const [includeUniversalLoves, setIncludeULoves] = useState(true);

  const [allGifts, setAllGifts] = useState([])

  const toggleUniversalLoves = () => {
    setIncludeULoves(!includeUniversalLoves)
  }

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
    if(!includeUniversalLoves) {
      setLovedGifts(allGifts[0].filter(gift => !universalLoves.includes(gift.name)))
      setHatedGifts(allGifts[4].filter(gift => !universalLoves.includes(gift.name)))

    } else {
      setLovedGifts(allGifts[0] || [])
      setHatedGifts(allGifts[4] || [])

    }
  }, [includeUniversalLoves, universalLoves, allGifts])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  return (
    <Box>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="villagers grouped by gifts, grouped by preference" indicatorColor="secondary">
            <Tab label={`Loved Gifts (${lovedGifts.length})`} {...{id: 'tab-loved', 'aria-controls': 'loved-gifts-tab'}} />
            <Tab label={`Liked Gifts (${likedGifts.length})`} {...{id: 'tab-liked', 'aria-controls': 'liked-gifts-tab'}} />
            <Tab label={`Neutral Gifts (${neutralGifts.length})`} {...{id: 'tab-neutral', 'aria-controls': 'neutral-gifts-tab'}} />
            <Tab label={`Disliked Gifts (${dislikedGifts.length})`} {...{id: 'tab-disliked', 'aria-controls': 'disliked-gifts-tab'}} />
            <Tab label={`Hated Gifts (${hatedGifts.length})`} {...{id: 'tab-hated', 'aria-controls': 'hated-gifts-tab'}} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <Container maxWidth={'lg'}>
            <FormControlLabel
              label="Include Universally Loved Items"
              control={
                <Checkbox
                  name="includeUniversalLoves"
                  value="includeUniversalLoves"
                  onChange={toggleUniversalLoves} 
                  checked={includeUniversalLoves}
                  style={{ display: 'inline-block' }}
                />
              }
            />
          </Container>
          <Container className={classes.giftsList}>
            {lovedGifts.map(gift => <GiftListItem key={gift.name} gift={gift.name} icon={gift.icon} villagers={gift.Villagers} />)}
          </Container>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Container className={classes.giftsList}>
            {likedGifts.map(gift => <GiftListItem key={gift.name} gift={gift.name} icon={gift.icon} villagers={gift.Villagers} />)}
          </Container>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Container className={classes.giftsList}>
            {neutralGifts.map(gift => <GiftListItem key={gift.name} gift={gift.name} icon={gift.icon} villagers={gift.Villagers} />)}
          </Container>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Container className={classes.giftsList}>
            {dislikedGifts.map(gift => <GiftListItem key={gift.name} gift={gift.name} icon={gift.icon} villagers={gift.Villagers} />)}
          </Container>
        </TabPanel>
        <TabPanel value={tabValue} index={4}>
          <Container maxWidth={'lg'}>
            <FormControlLabel
              label="Include Universally Loved Items"
              control={
                <Checkbox
                  name="includeUniversalLoves"
                  value="includeUniversalLoves"
                  onChange={toggleUniversalLoves} 
                  checked={includeUniversalLoves}
                  style={{ display: 'inline-block' }}
                />
              }
            />
          </Container>
          <Container className={classes.giftsList}>
            {hatedGifts.map(gift => <GiftListItem key={gift.name} gift={gift.name} icon={gift.icon} villagers={gift.Villagers} />)}
          </Container>
        </TabPanel>
      </div>
    </Box>
  )
}
