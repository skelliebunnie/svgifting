import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, AppBar, Tabs, Tab, Container } from '@material-ui/core'

import Navbar from '../components/Navbar'

import TabPanel from '../components/TabPanel'
import GiftListItem from '../components/GiftListItem'

const data = require('../utils/data')

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  giftsList: {
    maxWidth: '80%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',
    margin: '2rem auto 1rem'
  },
}));

export default function Gifts() {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);
  const [lovedGifts, setLovedGifts] = useState([]);
  // eslint-disable-next-line
  const [includeUniversalLoves, setIncludeULoves] = useState(false);

  useEffect(() => {
    let all_loved_gifts = new Map();

    for(let [villager, gifts] of Object.entries(data.loves)) {
      if(!includeUniversalLoves) {
        gifts = gifts.filter(gift => !data.universal_loves.includes(gift));
      }

      for(var j = 0; j < gifts.length; j++) {

        if(!all_loved_gifts.has(gifts[j])) {
          all_loved_gifts.set(gifts[j], [villager])

        } else {
          const original_list = all_loved_gifts.get(gifts[j]);
          all_loved_gifts.set(gifts[j], [...original_list, villager]);
        }
      }
    }
    let sorted_gift_lists = new Map([...all_loved_gifts.entries()].sort((a,b) => a[1].length > b[1].length ? -1 : 1));

    let minimum_list = new Map();
    let assigned_villagers = [];
    for(let [gift, villagers] of sorted_gift_lists) {
      gift = toTitleCase(gift);

      for(var i = 0; i < villagers.length; i++) {
        const villager = toTitleCase(villagers[i]);

        if(!assigned_villagers.includes(villager)) {
          assigned_villagers.push(villager);

          if(!minimum_list.has(gift)) {
            minimum_list.set( gift, {filename: toItemFilename(gift), villagers: [villager]} )

          } else {
            const original_villagers = minimum_list.get(gift).villagers;
            minimum_list.set( gift, {filename: minimum_list.get(gift).filename, villagers: [...original_villagers, villager]} )

          }
        }
      }
    }

    setLovedGifts(minimum_list);

  // eslint-disable-next-line
  }, []);

  const toTitleCase = (str) => {
    str = str.split(' ');

    for(var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }

    return str.join(' ');
  }

  const toItemFilename = (str) => {
    // prefix with '24px-', remove any single quotes, break on spaces, rejoin with underscores, suffix '.png'
    return '24px-' + str.replace('\'', '').split(' ').join('_') + '.png'
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  }

  return (
    <Box>
      <Navbar />
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="villagers grouped by gifts, grouped by preference" indicatorColor="secondary">
            <Tab label={`Loved Gifts (${lovedGifts.size})`} {...{id: 'tab-loved', 'aria-controls': 'loved-gifts-tab'}} />
            <Tab label="Liked Gifts" {...{id: 'tab-liked', 'aria-controls': 'liked-gifts-tab'}} />
            <Tab label="Neutral Gifts" {...{id: 'tab-neutral', 'aria-controls': 'neutral-gifts-tab'}} />
            <Tab label="Disliked Gifts" {...{id: 'tab-disliked', 'aria-controls': 'disliked-gifts-tab'}} />
            <Tab label="Hated Gifts" {...{id: 'tab-hated', 'aria-controls': 'hated-gifts-tab'}} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <Container className={classes.giftsList}>
            {[...lovedGifts.keys()].map(gift => <GiftListItem key={gift} gift={gift} icon={lovedGifts.get(gift).filename} villagers={lovedGifts.get(gift).villagers} />)}
          </Container>
        </TabPanel>
        
      </div>
    </Box>
  )
}
