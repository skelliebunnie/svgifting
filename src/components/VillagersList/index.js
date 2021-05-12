import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
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

export default function VillagersList(props) {
  const classes = useStyles();

  const [villagers, setVillagers] = useState([]);

  const { getIcon } = useContext(DatabaseContext)

  useEffect(() => {
    API.getVillagers().then(list => {
      let data = list.data;
      for(var i = 0; i < data.length; i++) {
        for(var j = 0; j < data[i].Items.length; j++) {
          data[i].Items[j].icon = getIcon( data[i].Items[j].name, false).default
        }
      }
      setVillagers(data);
    }).catch(err => console.error(err));
  
  // eslint-disable-next-line
  }, []);

  return (
    <Box className="App">
      <Container className={classes.root}>
        {villagers.map(villager => <VillagerCard key={villager.name} name={villager.name} status={villager.available} gifts={villager.Items} includeULoves={props.includeULoves} />)}
      </Container>
    </Box>
  );
}
