import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, Tabs, Tab, Container } from '@material-ui/core'
import API from '../utils/API'

import Navbar from '../components/Navbar'

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

  const [tabValue, setTabValue] = useState(0);
  const [lovedGifts, setLovedGifts] = useState([]);
  // eslint-disable-next-line
  const [likedGifts, setLikedGifts] = useState([]);
  // eslint-disable-next-line
  const [neutralGifts, setNeutralGifts] = useState([]);
  // eslint-disable-next-line
  const [dislikedGifts, setDislikedGifts] = useState([]);
  // eslint-disable-next-line
  const [hatedGifts, setHatedGifts] = useState([]);
  // eslint-disable-next-line
  const [includeUniversalLoves, setIncludeULoves] = useState(false);

  useEffect(() => {
    API.getGiftsByPreference('love').then(list => {
      setLovedGifts(list.data);
    }).catch(err => console.error(err));

  // eslint-disable-next-line
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  return (
    <Box>
      <Navbar />
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
          <Container className={classes.giftsList}>
            {lovedGifts.map(gift => <GiftListItem key={gift.name} gift={gift.name} villagers={gift.Villagers} />)}
          </Container>
        </TabPanel>
        
      </div>
    </Box>
  )
}
