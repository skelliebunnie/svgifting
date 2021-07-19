import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid, Input, InputLabel, InputAdornment, TextField, FormControlLabel, FormControl, FormHelperText, Checkbox, Select, MenuItem, Slider, Typography, Button, RadioGroup, Radio } from '@material-ui/core'

import ItemList from '../ItemList'

import API from '../../utils/API'

import weatherIcon_sun from '../../assets/other_icons/weather_sun.png'
import weatherIcon_rain from '../../assets/other_icons/weather_rain.png'

const CustomCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.green[600],
    // '&$checked': {
    //   color: theme.palette.green[600]
    // }
  }
}))((props) => <Checkbox color="default" {...props} />)

const CustomSlider = withStyles((theme) => ({
  root: {
    marginTop: '3.25rem',
    color: theme.palette.green[600],
  },
  markLabel: {
    fontSize: '0.7rem',
    marginTop: '-0.5rem',
    transformOrigin: 'center left',
    transform: 'rotateZ(88deg)',
    textAlign: 'left',
    padding: 0,
  }
}))((props) => <Slider color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  formControl: {
    margin: theme.spacing(1),
    '& label': {
      color: theme.palette.sand[700],
      fontSize: '1.2rem'
    }
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: 'gainsboro',
    color: '#333',
    padding: '0 0.3rem'
  },
  btn: {
    width: '100%',
    marginTop: '2rem',
    marginBottom: '3rem',
    transition: 'all 0.3s ease-in-out'
  },
  saveBtn: {
    backgroundColor: theme.palette.green[300],
    '&:hover': {
      backgroundColor: theme.palette.green[500],
      color: 'white'
    }
  },
  clearBtn: {
    backgroundColor: theme.palette.red[300],
    '&:hover': {
      backgroundColor: theme.palette.red[500],
      color: 'white'
    }
  }
}));

export default function AdminItemsForm(props) {
  const classes = useStyles();

  const { dbItems, dbItemTypes, addItemFormSubmit, addItemFormOptions, setAddItemFormOptions, defaultAddItemFormOptions, defaultItemAvailability, selectedItem, setSelectedItem } = useContext(DatabaseContext)

  const [itemList, setItemList] = useState([])
  const [itemTypes, setItemTypes] = useState([])
  const [equipment, setEquipment] = useState([])
  const [animals, setAnimals] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    setItemList(dbItems)
    setItemTypes(dbItemTypes)
  }, [dbItems, dbItemTypes])

  useEffect(() => {
    API.getEquipment().then(list => {
      setEquipment(list.data)
    }).catch(err => console.error(err));

    API.getAnimals().then(list => {
      setAnimals(list.data)
    }).catch(err => console.error(err));

    API.getLocations().then(list => {
      const locations = list.data.filter(location => (location.name.includes('River') && !location.name.includes("Road")) || location.name.includes("Forest") || (location.name.includes("Mountain") && !location.name.includes("Road")) || location.name.includes("Mines") || location.name.includes("Cave") || location.name.includes("Ocean") || location.name.includes("Forest") || (location.name.includes("Desert") && !location.name.includes("Trader")) || location.name.includes("Beach") || location.name.includes("Tide") )
      locations.sort((a, b) => a.name > b.name ? 1 : -1)
      setLocations( locations )
    }).catch(err => console.error(err));
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(selectedItem !== null) {
      let newFormOptions = { ...selectedItem }
      newFormOptions.AnimalId = selectedItem.AnimalId !== null ? [selectedItem.AnimalId] : []
      newFormOptions.EquipmentId = selectedItem.EquipmentId !== null ? selectedItem.EquipmentId : 0
      newFormOptions.LocationId = selectedItem.LocationId !== null ? selectedItem.LocationId : 0
      newFormOptions.TypeId = selectedItem.TypeId !== null ? selectedItem.TypeId : 0
      newFormOptions.behavior = selectedItem.behavior !== null ? selectedItem.behavior : ''
      newFormOptions.difficulty = selectedItem.difficulty !== null ? selectedItem.difficulty : 0
      newFormOptions.size = selectedItem.size !== null ? selectedItem.size : ''
      newFormOptions.initialGrowthTime = selectedItem.initialGrowthTime !== null ? selectedItem.initialGrowthTime : 0
      newFormOptions.reproductionTime = selectedItem.reproductionTime !== null ? selectedItem.reproductionTime : 0
      newFormOptions.processingTime = selectedItem.processingTime !== null ? selectedItem.processingTime : 0
      newFormOptions.sellPrice = selectedItem.sellPrice !== null ? selectedItem.sellPrice : 0

      setAddItemFormOptions({...newFormOptions, ...defaultItemAvailability});

    } else {
      setAddItemFormOptions({...defaultAddItemFormOptions, ...defaultItemAvailability});

    }
  // eslint-disable-next-line
  }, [selectedItem])

  const handleTextChange = e => {
    setAddItemFormOptions({
      ...addItemFormOptions,
      [e.target.name]: e.target.value
    });

  }

  const handleNumberChange = e => {
    // AnimalId must be an array so that multiple animals can be selected (e.g. for Wool, which can come from Rabbits *or* Sheep)
    setAddItemFormOptions({
      ...addItemFormOptions,
      [e.target.name]: e.target.name !== "AnimalId" && e.target.name !== "LocationId" ? parseInt(e.target.value) : e.target.value
    })
  }

  const handleBoolChange = e => {
    setAddItemFormOptions({
      ...addItemFormOptions,
      [e.target.name]: e.target.checked
    })
  }

  const handleCheckboxGroupChange = e => {
      let list = addItemFormOptions[e.target.name];
      list.forEach(item => {
        if(item.id === parseInt(e.target.value)) {
          item.isChecked = e.target.checked
        }
      })

      setAddItemFormOptions({
        ...addItemFormOptions,
        [e.target.name]: list
      })
  }

  const handleRadioChange = e => {
    setAddItemFormOptions({
      ...addItemFormOptions,
      [e.target.name]: e.target.value
    })
  }

  const processingTimeSliderChange = (e, newVal) => {
    setAddItemFormOptions({
      ...addItemFormOptions,
      processingTime: newVal
    })
  }

  const clearForm = () => {
    setAddItemFormOptions({
      ...defaultAddItemFormOptions,
      ...defaultItemAvailability
    });

    setSelectedItem(null)
  }

  const handleItemClick = item => {
    if(selectedItem === null || selectedItem.id !== item.id) {
      setSelectedItem(item);

    } else {
      setSelectedItem(null);

    }
  }

  const processingTimeMarks = [
    {
      value: 0
    },
    {
      value: 60,
      label: '1 hr'
    },
    {
      value: 120,
      // label: '2 hrs'
    },
    {
      value: 180,
      label: '3 hrs'
    },
    {
      value: 200,
      // label: '≈3 hrs'
    },
    {
      value: 240,
      // label: '4 hrs'
    },
    {
      value: 360,
      label: '6 hrs'
    },
    {
      value: 600,
      label: '10 hr'
    },
    {
      value: 1000,
      label: '≈16 hrs'
    },
    {
      value: 1750,
      label: '1 day'
    },
    {
      value: 2250,
      label: '1-2 days'
    },
    {
      value: 3200,
      label: '2 days'
    },
    {
      value: 4000,
      label: '2-3 days'
    },
    {
      value: 6000,
      label: '4 days'
    },
    {
      value: 10000,
      label: '6.25 days'
    },
  ]

  const valuetext = (value) => {
    return `${value} min.`
  }

  return (
    <Grid container spacing={0} style={{marginTop: '1rem'}}>
        {props.includeItemList &&
        <Grid item lg={4}>
          <Typography variant="h3" style={{marginLeft: '1rem', textAlign: 'center'}}>Items</Typography>
          <ItemList onItemClick={handleItemClick} selected={selectedItem} list={itemList} />
        </Grid>
        }
        <Grid item lg={props.includeItemList ? 8 : 12}>
          <Container className={classes.form}>
            <Typography variant="h2" gutterBottom style={{textAlign: 'center'}}>
              {selectedItem === null ? 'New' : 'Update'} Item
            </Typography>
            {/* NAME */}
            <FormControl className={classes.formControl}>
              <TextField id="name" label="Name" name="name" value={addItemFormOptions.name} onChange={handleTextChange} required />
            </FormControl>
            {/* TYPE ID */}
            <FormControl className={classes.formControl}>
              <InputLabel id="itemtype-label">Item Type</InputLabel>
              <Select
                labelId="itemtype-label"
                id="TypeId"
                name="TypeId"
                value={addItemFormOptions.TypeId}
                onChange={handleNumberChange}
                style={{fontSize: '1.4rem'}}
              >
                {itemTypes.map(type => <MenuItem key={`typeid-${type.id}`} value={type.id}>{type.name}</MenuItem>)}
              </Select>
            </FormControl>
            {/* IF TYPE IS "CROP, <xyz>" */}
            {
              (addItemFormOptions.TypeId === 5 || addItemFormOptions.TypeId === 6 || addItemFormOptions.TypeId === 7) &&
              <>
              <FormControl className={classes.formControl}>
                <InputLabel>Initial Growth Time</InputLabel>
                <Input type="number" name="initialGrowthTime" value={addItemFormOptions.initialGrowthTime} onChange={handleNumberChange} />
                <FormHelperText>How many <strong>days</strong> does it take the crop to grow from seed (no fertilizer)?</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Reproduction Time</InputLabel>
                <Input type="number" name="reproductionTime" value={addItemFormOptions.reproductionTime} onChange={handleNumberChange} />
                <FormHelperText>If this crop continues to reproduce after reaching maturity, how many <strong>days</strong> between harvests? If the crop does <em>not</em> reproduce, leave as 0</FormHelperText>
              </FormControl>
              </>
            }
            {/* IF TYPE IS ARTISAN GOODS */}
            {
              (addItemFormOptions.TypeId === 3) &&
              <>
              <FormControl className={classes.formControl}>
                <InputLabel id="equipment-label">Equipment</InputLabel>
                  <Select
                    labelId="equipment-label"
                    id="EquipmentId"
                    name="EquipmentId"
                    value={addItemFormOptions.EquipmentId}
                    onChange={handleNumberChange}
                    style={{fontSize: '1.4rem'}}
                  >
                    {equipment.map(equipment => <MenuItem key={`equipmentid-${equipment.id}`} value={equipment.id}>{equipment.name}</MenuItem>)}
                  </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Grid container spacing={0} alignItems="center">
                  <InputLabel>Processing Time (in <strong>minutes</strong>)</InputLabel>
                  <Grid item style={{width: '88%', marginTop: '1rem', marginRight: '1.25rem', padding: 0}}>
                    <CustomSlider
                      getAriaValueText={valuetext}
                      aria-labelledby="processing-time-slider"
                      step={null}
                      marks={processingTimeMarks}
                      name="processingTime"
                      id="processingTimeSlider"
                      onChange={processingTimeSliderChange}
                      value={addItemFormOptions.processingTime}
                      valueLabelDisplay="on"
                      min={0}
                      max={10000}
                      color="secondary"
                    />
                  </Grid>
                  <Grid item style={{marginTop: '1rem', padding: 0}}>
                    <Input name="processingTime" value={addItemFormOptions.processingTime} margin="dense" onBlur={handleNumberChange} onChange={handleNumberChange} inputProps={{step: 1, min: 0, max: 10000, type: 'number', 'aria-labelledby': 'proccessing-time-slider'}} endAdornment={<InputAdornment position="end">min.</InputAdornment>} />
                  </Grid>
                </Grid>
              </FormControl>
              </>
            }
            {/* IF TYPE IS ANIMAL PRODUCTS */}
            {
              (addItemFormOptions.TypeId === 4) &&
              <FormControl className={classes.formControl}>
                <InputLabel id="animals-label">Animal</InputLabel>
                <Select
                    labelId="animals-label"
                    id="AnimalId"
                    name="AnimalId"
                    value={addItemFormOptions.AnimalId}
                    onChange={handleNumberChange}
                    style={{fontSize: '1.4rem'}}
                    multiple
                  >
                    {animals.map(animal => <MenuItem key={`animalid-${animal.id}`} value={animal.id}>{animal.name}</MenuItem>)}
                  </Select>
              </FormControl>
            }

            {/* IF TYPE IS FISH */}
            {
              (addItemFormOptions.TypeId === 14) &&
              <>
              {/* Difficulty, Behavior, Size */}
              <Box style={{display: 'flex', flexFlow: 'row wrap'}}>
                <FormControl className={classes.formControl} style={{flex: 1}}>
                  <InputLabel>Difficulty</InputLabel>
                  <Input name="difficulty" value={addItemFormOptions.difficulty} onBlur={handleNumberChange} onChange={handleNumberChange} min={0} max={100} />
                </FormControl>
                <FormControl className={classes.formControl} style={{flex: 1}}>
                  <InputLabel id="fish-behavior-label">Behavior</InputLabel>
                  <Select
                    labelId="fish-behavior-label"
                    id="fish-behavior"
                    name="behavior"
                    value={addItemFormOptions.behavior}
                    onChange={handleTextChange}
                  >
                    <MenuItem value="floater">Floater</MenuItem>
                    <MenuItem value="sinker">Sinker</MenuItem>
                    <MenuItem value="smooth">Smooth</MenuItem>
                    <MenuItem value="dart">Dart</MenuItem>
                    <MenuItem value="mixed">Mixed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* Weather & Season */}
              <Box style={{display: 'flex', flexFlow: 'row wrap'}}>
                <Box style={{flex: 1}}>
                  <Typography variant="h4" gutterBottom>
                    Weather
                  </Typography>
                  <RadioGroup aria-label="weather" name="weather" value={addItemFormOptions.weather} onChange={handleRadioChange} style={{display: 'flex', flexFlow: 'row wrap'}}>
                    <FormControlLabel value="any" control={<Radio />} label="any" />
                    <FormControlLabel value="sun" control={<Radio />} label={<p style={{position: 'relative'}}><img src={weatherIcon_sun} alt="Sunny Weather" height={30} /><br/><span style={{position: 'absolute', fontSize: '0.75rem', textAlign: 'center', display: 'block', width: '100%', bottom: '-0.75rem'}}>Sun</span></p>} />
                    <FormControlLabel value="rain" control={<Radio />} label={<p style={{position: 'relative'}}><img src={weatherIcon_rain} alt="Rainy Weather" height={30} /><br/><span style={{position: 'absolute', fontSize: '0.75rem', textAlign: 'center', display: 'block', width: '100%', bottom: '-0.75rem'}}>Rain</span></p>} />
                  </RadioGroup>
                </Box>
                <Box style={{flex: 1}}>
                  <Typography variant="h4" gutterBottom>
                    Season
                  </Typography>
                  {addItemFormOptions.SeasonId.map(season => (
                    <FormControlLabel
                      key={`season-${season.id}`}
                      label={<p style={{position: 'relative', display: 'inline-block'}}><img src={season.icon} alt={`Season: ${season.name}`} height={30} /><br/><span style={{position: 'absolute', fontSize: '0.75rem', textAlign: 'center', display: 'block', minWidth: '100%', bottom: '-0.75rem'}}>{season.name}</span></p>}
                      control={
                        <CustomCheckbox
                          name="SeasonId"
                          value={season.id}
                          onChange={handleCheckboxGroupChange} 
                          checked={season.isChecked}
                          style={{ display: 'inline-block' }}
                        />
                      }
                    />
                  ))}
                </Box>
              </Box>
              </>
            }

            {/* SELL PRICE (base) */}
            <FormControl className={classes.formControl}>
              <InputLabel>Sell Price</InputLabel>
              <Input type="number" name="sellPrice" value={addItemFormOptions.sellPrice} onChange={handleNumberChange} />
            </FormControl>

            {/* SOURCE & EDIBILITY */}
            <Box style={{width: '100%'}}>
              {addItemFormOptions.TypeId !== 2 && addItemFormOptions.TypeId !== 14 ?
                <FormControl className={classes.formControl} style={{display: 'inline-block', width: '88%'}}>
                  <TextField id="source" label="Source" name="source" value={addItemFormOptions.source} onChange={handleTextChange} style={{width: '100%'}} />
                  <FormHelperText>If the source is a recipe recieved in the mail, please use the format <span className={classes.code}>Name (mail, X+ :heart:)</span> where 'Name' is the name of the NPC and 'X' is the number of hearts required with that NPC</FormHelperText>
                </FormControl>
                :
                <Box style={{flex: 1}}>
                  {addItemFormOptions.TypeId === 2 &&
                  <>
                  <Typography variant="h4" gutterBottom>
                    Season
                  </Typography>
                  {addItemFormOptions.SeasonId.map(season => (
                    <FormControlLabel
                      key={`season-${season.id}`}
                      label={<p style={{position: 'relative', display: 'inline-block'}}><img src={season.icon} alt={`Season: ${season.name}`} height={30} /><br/><span style={{position: 'absolute', fontSize: '0.75rem', textAlign: 'center', display: 'block', minWidth: '100%', bottom: '-0.75rem'}}>{season.name}</span></p>}
                      control={
                        <CustomCheckbox
                          name="SeasonId"
                          value={season.id}
                          onChange={handleCheckboxGroupChange} 
                          checked={season.isChecked}
                          style={{ display: 'inline-block' }}
                        />
                      }
                    />
                  ))}
                  </>
                  }
                  <FormControl className={classes.formControl} style={{display: 'inline-block', width: '100%'}}>
                    <InputLabel id="location-label" style={{width: '100%'}}>Location</InputLabel>
                    <Select
                        labelId="location-label"
                        id="LocationId"
                        name="LocationId"
                        value={addItemFormOptions.LocationId}
                        onChange={handleNumberChange}
                        style={{fontSize: '1.4rem', width: '100%'}}
                        multiple
                      >
                        {locations.map(location => <MenuItem key={`locationid-${location.id}`} value={location.id}>{location.name}</MenuItem>)}
                      </Select>
                  </FormControl>
                </Box>
              }
              <FormControlLabel
                label="Edible?"
                control={
                  <CustomCheckbox
                    className={classes.formControl}
                    name="edible"
                    value="edible"
                    onChange={handleBoolChange} 
                    checked={addItemFormOptions.edible} />
                }
                style={{display: 'inline-block', marginTop: '0.75rem'}}
              />
            </Box>

          	{/* Available in standard game, or a mod? */}
          	<FormControl className={classes.formControl}>
	            <InputLabel id="availableIn-label">Available in standard game, or a mod?</InputLabel>
	            <Select
	              labelId="availableIn-label"
	              id="availableIn"
	              name="availableIn"
	              value={addItemFormOptions.availableIn}
	              onChange={handleTextChange}
	              style={{fontSize: '1.4rem'}}
	            >
	              {['Vanilla', 'SVE', 'Ridgeside Village', 'Downtown Zuzu', 'Garden Village', 'Walk to the Desert', 'Mermaid Island', 'Deep Woods', 'Other'].map(mod => <MenuItem key={`checkupSeason-${mod}`} value={mod}>{mod}</MenuItem>)}
	            </Select>
	          </FormControl>

          	{/* Save & Clear Buttons */}
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Button variant="contained" className={`${classes.btn} ${classes.saveBtn}`} onClick={() => addItemFormSubmit(addItemFormOptions)}>
                  <Typography variant="h2">Save</Typography>
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button variant="contained" className={`${classes.btn} ${classes.clearBtn}`} onClick={(e) => clearForm(e)}>
                  <Typography variant="h2">Clear</Typography>
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
  )
}
