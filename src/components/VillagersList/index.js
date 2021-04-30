import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container } from '@material-ui/core'
import API from '../../utils/API'

import VillagerCard from '../VillagerCard'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    width: 'auto',
    maxWidth: '100%'
  },
}));

export default function VillagersList() {
  const classes = useStyles();

  const [villagers, setVillagers] = useState([]);

  useEffect(() => {
    API.getVillagers().then(list => {
      console.log(list.data);
      setVillagers(list.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <Box className="App">
      <Container className={classes.root}>
        {villagers.map(villager => <VillagerCard key={villager.name} name={villager.name} status={villager.available} gifts={villager.Items} />)}
      </Container>
    </Box>
  );
}
