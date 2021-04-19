import { makeStyles } from '@material-ui/core/styles'
import { Box, Container } from '@material-ui/core'

import VillagerCard from '../VillagerCard'

const data = require('../../utils/data')

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

  return (
    <Box className="App">
      <Container className={classes.root}>
        {data.villagers.map((villager, idx) => <VillagerCard key={villager} name={villager} status={data.marriageable.includes(villager)} portrait={data.portraits[idx]} icon={data.icons[idx]} />)}
      </Container>
    </Box>
  );
}
