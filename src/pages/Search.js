// import { makeStyles } from '@material-ui/core/styles'
import { Box, Container } from '@material-ui/core'
import Navbar from '../components/Navbar'

import VillagersList from '../components/VillagersList'

export default function Search() {

  return (
    <Box>
      <Navbar />
      <Container>
        <input type="text" value="Not Available Yet" disabled/>
      </Container>
      <VillagersList />
    </Box>
  );
}
