import { useState } from 'react'
import { Box, Container, Grid, FormControl, FormControlLabel, Checkbox, InputLabel, RadioGroup, Radio } from '@material-ui/core'

import SearchVillagers from '../components/SearchVillagers'
import VillagersList from '../components/VillagersList'

function FilterUniversallyLovedGifts({ uLovesChecked, toggleUniversalLoves }) {
  return (
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
  )
}

function SortVillagers({ options, sortBy, handleInputChange }) {
  return (
    <>
    <InputLabel id="sortby-label">Sort By</InputLabel>
    <FormControl>
      <RadioGroup aria-label="sort villagers by" name="sortby" value={sortBy} onChange={(e) => handleInputChange(e, 'sort')}>
        <Grid container>
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

function DisplayOptions({ options, display, handleInputChange }) {
  return (
    <>
    <InputLabel id="display-label">Display Format</InputLabel>
    <FormControl>
      <RadioGroup aria-label="display format" name="display" value={display} onChange={(e) => handleInputChange(e, 'display')}>
        <Grid container>
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

export default function Villagers() {
  const sortOptions = ["Villager Name", "Birthday <Season, Day>", "Availability"]
  const displayOptions = ["Grid", "List", "Table"]

  const [uLovesChecked, setULovesChecked] = useState(true)
  const [sortBy, setSortBy] = useState('Villager Name')
  const [display, setDisplay] = useState('Grid')

  const toggleUniversalLoves = () => {
    setULovesChecked(!uLovesChecked)
  }

  const handleInputChange = (e, input) => {
    if(input === 'sort') setSortBy(e.target.value)
    if(input === 'display') setDisplay(e.target.value)
  }

  return (
    <Box>
      <Container maxWidth={'lg'}>
        <SearchVillagers />
        <FilterUniversallyLovedGifts uLovesChecked={uLovesChecked} toggleUniversalLoves={toggleUniversalLoves} />
        <Grid container>
          <Grid item xs={12} lg={6}>
            <DisplayOptions options={displayOptions} display={display} handleInputChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} lg={6}>
          {display !== 'Table' &&
            <SortVillagers options={sortOptions} sortBy={sortBy} handleInputChange={handleInputChange} />
          }
          </Grid>
        </Grid>
      </Container>
      <VillagersList includeULoves={uLovesChecked} format={display} sortBy={sortBy} />
    </Box>
  );
}
