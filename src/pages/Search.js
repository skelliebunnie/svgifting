import { useState } from 'react'
import { Box, Container, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import Navbar from '../components/Navbar'

import VillagersList from '../components/VillagersList'

export default function Search() {
  const [uLovesChecked, setULovesChecked] = useState(true)

  const toggleUniversalLoves = () => {
    setULovesChecked(!uLovesChecked)
  }

  return (
    <Box>
      <Navbar />
      <Container maxWidth={'lg'}>
        <TextField type="search" value="Search Not Available Yet" style={{width: '100%', margin: '1rem 0'}} disabled />
        <FormControlLabel
          label="Include Universally Loved Items"
          control={
            <Checkbox
              name="includeUniversalLoves"
              value="includeUniversalLoves"
              onChange={toggleUniversalLoves} 
              checked={uLovesChecked}
              style={{ display: 'inline-block' }}
            />
          }
        />
      </Container>
      <VillagersList includeULoves={uLovesChecked} />
    </Box>
  );
}
