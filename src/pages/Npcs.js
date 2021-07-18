import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../contexts/DatabaseContext";
import { Box, Container, Grid, FormControl, FormControlLabel, Checkbox, InputLabel, RadioGroup, Radio } from '@material-ui/core'

import API from '../utils/API'

import SearchNpcs from '../components/SearchNpcs'
import NpcsList from '../components/NpcsList'

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

function SortOptions({ options, sortBy, handleInputChange }) {
  return (
    <>
    <InputLabel id="sortby-label">Sort By</InputLabel>
    <FormControl>
      <RadioGroup aria-label="sort npcs by" name="sortby" value={sortBy} onChange={(e) => handleInputChange(e, 'sort')}>
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

export default function Npcs() {
  const { getIcon, sortNpcData } = useContext(DatabaseContext);

  const sortOptions = ["Npc Name", "Birthday <Season, Day>", "Number of Loved Gifts"]
  const displayOptions = ["Grid", "List", "Table"]

  const [uLovesChecked, setULovesChecked] = useState(JSON.parse(localStorage.getItem("sv_include_uloves")) || false);
  const [sortBy, setSortBy] = useState('Npc Name')
  const [display, setDisplay] = useState('Grid')

  const [npcs, setNpcs] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [searchInputValue, setSearchInputValue] = useState('')

  useEffect(() => {
    API.getNpcs()
      .then((list) => {
        let data = sortNpcData(list.data, sortBy);
        setNpcs(data);
        setSearchValue(data[0].name);

        for (var i = 0; i < data.length; i++) {
          // filter out gifts that are not 'loved'
          data[i].Items = data[i].Items.filter(
            (item) => item.Gift.preference === "love"
          );

          for (var j = 0; j < data[i].Items.length; j++) {
            const item = data[i].Items[j];
            const icon = getIcon(item.name, "item_icons", "png", false).default;
            data[i].birthday =
              data[i].Seasons.length > 0
                ? `${data[i].Seasons[0].name} ${data[i].Seasons[0].Event.day}`
                : "unavailable";
            data[i].Items[j].icon = icon;
          }

          data[i].birthdaySeasonId = data[i].Seasons[0].id;
          data[i].birthdaySeason = data[i].Seasons[0].name;
          data[i].birthdayDate = data[i].Seasons[0].Event.day;
        }
      })
      .catch((err) => console.error(err));
  // eslint-disable-next-line
  }, [])

  const toggleUniversalLoves = () => {
    setULovesChecked(!uLovesChecked)

    localStorage.setItem("sv_include_uloves", !uLovesChecked);
  }

  const handleInputChange = (e, input) => {
    if(input === 'sort') setSortBy(e.target.value)
    if(input === 'display') setDisplay(e.target.value)
  }

  return (
    <Box>
      <Container maxWidth={"lg"}>
        <SearchNpcs
          value={searchValue}
          setValue={setSearchValue}
          inputValue={searchInputValue}
          setInputValue={setSearchInputValue}
        />
        <FilterUniversallyLovedGifts
          uLovesChecked={uLovesChecked}
          toggleUniversalLoves={toggleUniversalLoves}
        />
        <Grid container>
          <Grid item xs={12} lg={6}>
            <DisplayOptions
              options={displayOptions}
              display={display}
              handleInputChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            {display !== "Table" && (
              <SortOptions
                options={sortOptions}
                sortBy={sortBy}
                handleInputChange={handleInputChange}
              />
            )}
          </Grid>
        </Grid>
      </Container>
      <NpcsList
        includeULoves={uLovesChecked}
        format={display}
        sortBy={sortBy}
        npcs={npcs}
      />
    </Box>
  );
}
