import { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid, Input, InputLabel, InputAdornment, TextField, FormControlLabel, FormControl, FormHelperText, Checkbox, Select, MenuItem, Slider, Typography, Button, RadioGroup, Radio } from '@material-ui/core'

import ItemList from '../ItemList'
import AlertSnack from '../AlertSnack'

import API from '../../utils/API'

import weatherIcon_sun from '../../assets/other_icons/weather_sun.png'
import weatherIcon_rain from '../../assets/other_icons/weather_rain.png'

import seasonIcon_spring from '../../assets/season_icons/24px-Spring.png'
import seasonIcon_summer from '../../assets/season_icons/24px-Summer.png'
import seasonIcon_fall from '../../assets/season_icons/24px-Fall.png'
import seasonIcon_winter from '../../assets/season_icons/24px-Winter.png'
import seasonIcon_all from '../../assets/season_icons/24px-All_Seasons_Icon.png'

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

export default function UpsertItemForm() {
  const classes = useStyles();

  const [alert, setAlert] = useState({
    open: false,
    severity: 'info',
    message: 'A Snackbar Alert'
  });

  const [selected, setSelected] = useState(null)

  const defaultItemAvailability = {
    weather: 'any',
    SeasonId: [
      {
        id: 1,
        name: 'Spring',
        icon: seasonIcon_spring,
        isChecked: false
      },
      {
        id: 2,
        name: 'Summer',
        icon: seasonIcon_summer,
        isChecked: false
      },
      {
        id: 3,
        name: 'Fall',
        icon: seasonIcon_fall,
        isChecked: false
      },
      {
        id: 4,
        name: 'Winter',
        icon: seasonIcon_winter,
        isChecked: false
      },
      {
        id: 5,
        name: 'All',
        icon: seasonIcon_all,
        isChecked: true
      }
    ],
    LocationId: [],
    chance: 0,
    time: [600, 200]
  };

  const defaultFormOptions = {
    name: '',
    source: '',
    sellPrice: 0,
    edible: false,
    difficulty: 0,
    behavior: '',
    size: [],
    initialGrowthTime: 0,
    reproductionTime: 0,
    processingTime: 0,
    EquipmentId: '',
    AnimalId: [],
    TypeId: '',
    ...defaultItemAvailability
  }

  const [formOptions, setFormOptions] = useState({
    ...defaultFormOptions,
    ...defaultItemAvailability
  });

  const [itemList, setItemList] = useState([])
  const [itemTypes, setItemTypes] = useState([])
  const [equipment, setEquipment] = useState([])
  const [animals, setAnimals] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    API.getItemTypes().then(list => {
      setItemTypes([{id: 0, name: "None"}, ...list.data])
    }).catch(err => console.error(err));

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

    getItems();
  // eslint-disable-next-line
  }, []);

  const getItems = () => {
    API.getItems()
      .then(list => {
        setItemList(list.data)
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if(selected !== null) {
      let newFormOptions = { ...selected }
      newFormOptions.AnimalId = selected.AnimalId !== null ? [selected.AnimalId] : []
      newFormOptions.EquipmentId = selected.EquipmentId !== null ? selected.EquipmentId : 0
      newFormOptions.LocationId = selected.LocationId !== null ? selected.LocationId : 0
      newFormOptions.TypeId = selected.TypeId !== null ? selected.TypeId : 0
      newFormOptions.behavior = selected.behavior !== null ? selected.behavior : ''
      newFormOptions.difficulty = selected.difficulty !== null ? selected.difficulty : 0
      newFormOptions.size = selected.size !== null ? selected.size : ''
      newFormOptions.initialGrowthTime = selected.initialGrowthTime !== null ? selected.initialGrowthTime : 0
      newFormOptions.reproductionTime = selected.reproductionTime !== null ? selected.reproductionTime : 0
      newFormOptions.processingTime = selected.processingTime !== null ? selected.processingTime : 0
      newFormOptions.sellPrice = selected.sellPrice !== null ? selected.sellPrice : 0

      setFormOptions({...newFormOptions, ...defaultItemAvailability});

    } else {
      setFormOptions({...defaultFormOptions, ...defaultItemAvailability});

    }
  // eslint-disable-next-line
  }, [selected])

  const handleTextChange = e => {
    setFormOptions({
      ...formOptions,
      [e.target.name]: e.target.value
    });

  }

  const handleNumberChange = e => {
    // AnimalId must be an array so that multiple animals can be selected (e.g. for Wool, which can come from Rabbits *or* Sheep)
    setFormOptions({
      ...formOptions,
      [e.target.name]: e.target.name !== "AnimalId" && e.target.name !== "LocationId" ? parseInt(e.target.value) : e.target.value
    })
  }

  const handleBoolChange = e => {
    setFormOptions({
      ...formOptions,
      [e.target.name]: e.target.checked
    })
  }

  const handleCheckboxGroupChange = e => {
      let list = formOptions[e.target.name];
      list.forEach(item => {
        if(item.id === parseInt(e.target.value)) {
          item.isChecked = e.target.checked
        }
      })

      setFormOptions({
        ...formOptions,
        [e.target.name]: list
      })
  }

  const handleRadioChange = e => {
    setFormOptions({
      ...formOptions,
      [e.target.name]: e.target.value
    })
  }

  const processingTimeSliderChange = (e, newVal) => {
    setFormOptions({
      ...formOptions,
      processingTime: newVal
    })
  }

  const handleFormSubmit = e => {

    let data = {...formOptions}
    const formKeys = Object.keys(data);

    for(var i = 0; i < formKeys.length; i++) {
      if(data[formKeys[i]] === 0 || data[formKeys[i]] === "") {
        data[formKeys[i]] = null
      }

      if(formKeys[i] === "size" && formKeys[i].length === 2) {
        data.size = formOptions.size.join("-");
      } else {
        data.size = null;
      }

      if(formKeys[i] === "time" && formKeys[i].length === 2) {
        data.size = formOptions.size.join("-");
      } else {
        data.size = null;
      }
    }

    // if the item is *not* an animal product OR the AnimalId.length === 0
    // just 'null' the AnimalId and insert/update
    if(formOptions.TypeId !== 4 || formOptions.AnimalId.length === 0) {
      data.AnimalId = null;
      // if it's not a *fish* either, go ahead and 'null' the weather as well
      // since forage items will have item availability but won't be weather dependent
      if(data.TypeId !== 14) data.weather = null;

      itemToDatabase(data)

    } else {
      // now here we're handling animal products that are actually assigned to an animal
      // if the length is 1, we can just move on
      if(formOptions.AnimalId.length === 1) {
        data.AnimalId = data.AnimalId[0];

        itemToDatabase(data)

      } else if(formOptions.AnimalId.length > 1) {
        // otherwise, we need to add an item for each animal selected (just how it works)
        for(var j = 0; j < formOptions.AnimalId.length; j++) {
          data.AnimalId = formOptions.AnimalId[j];

          itemToDatabase(data)
        }

      }
    }
  }

  const itemToDatabase = (data) => {
    API.upsertItem(data)
      .then(results => {
        setAlert({ open: true, message: formOptions.id !== undefined ? `${formOptions.name} updated successfully` : `${formOptions.name} saved successfully`, severity: 'success' });
        setFormOptions({...defaultFormOptions, ...defaultItemAvailability})
        setSelected(null)
        getItems();
      })
      .catch(err => {
        setAlert({ open: true, message: formOptions.id !== undefined ? `Error: ${formOptions.name} was not updated. Message: ${err.message}` : `Error: ${formOptions.name} was not saved. Message: ${err.message}`, severity: 'error' })
        console.error(err.message);
      });
  }

  const clearForm = e => {
    setFormOptions({
      ...defaultFormOptions,
      ...defaultItemAvailability
    });

    setSelected(null)
  }

  const handleAlertClose = (event, reason) => {
    if(reason === 'clickaway') return;
    
    setAlert({...alert, open: false});
  }

  const handleItemClick = e => {
    if(selected === null || selected.id !== e.id) {
      setSelected(e);

    } else {
      setSelected(null);

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
        <Grid item lg={4}>
          <Typography variant="h3" style={{marginLeft: '1rem', textAlign: 'center'}}>Items</Typography>
          <ItemList onItemClick={handleItemClick} selected={selected} list={itemList} />
        </Grid>
        <Grid item lg={8}>
          <Container className={classes.form}>
            <Typography variant="h2" gutterBottom style={{textAlign: 'center'}}>
              {selected === null ? 'New' : 'Update'} Item
            </Typography>
            {/* NAME */}
            <FormControl className={classes.formControl}>
              <TextField id="name" label="Name" name="name" value={formOptions.name} onChange={handleTextChange} required />
            </FormControl>
            {/* TYPE ID */}
            <FormControl className={classes.formControl}>
              <InputLabel id="itemtype-label">Item Type</InputLabel>
                <Select
                  labelId="itemtype-label"
                  id="TypeId"
                  name="TypeId"
                  value={formOptions.TypeId}
                  onChange={handleNumberChange}
                  style={{fontSize: '1.4rem'}}
                >
                  {itemTypes.map(type => <MenuItem key={`typeid-${type.id}`} value={type.id}>{type.name}</MenuItem>)}
                </Select>
            </FormControl>
            {/* IF TYPE IS "CROP, <xyz>" */}
            {
              (formOptions.TypeId === 5 || formOptions.TypeId === 6 || formOptions.TypeId === 7) &&
              <>
              <FormControl className={classes.formControl}>
                <InputLabel>Initial Growth Time</InputLabel>
                <Input type="number" name="initialGrowthTime" value={formOptions.initialGrowthTime} onChange={handleNumberChange} />
                <FormHelperText>How many <strong>days</strong> does it take the crop to grow from seed (no fertilizer)?</FormHelperText>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Reproduction Time</InputLabel>
                <Input type="number" name="reproductionTime" value={formOptions.reproductionTime} onChange={handleNumberChange} />
                <FormHelperText>If this crop continues to reproduce after reaching maturity, how many <strong>days</strong> between harvests? If the crop does <em>not</em> reproduce, leave as 0</FormHelperText>
              </FormControl>
              </>
            }
            {/* IF TYPE IS ARTISAN GOODS */}
            {
              (formOptions.TypeId === 3) &&
              <>
              <FormControl className={classes.formControl}>
                <InputLabel id="equipment-label">Equipment</InputLabel>
                  <Select
                    labelId="equipment-label"
                    id="EquipmentId"
                    name="EquipmentId"
                    value={formOptions.EquipmentId}
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
                      value={formOptions.processingTime}
                      valueLabelDisplay="on"
                      min={0}
                      max={10000}
                      color="secondary"
                    />
                  </Grid>
                  <Grid item style={{marginTop: '1rem', padding: 0}}>
                    <Input name="processingTime" value={formOptions.processingTime} margin="dense" onBlur={handleNumberChange} onChange={handleNumberChange} inputProps={{step: 1, min: 0, max: 10000, type: 'number', 'aria-labelledby': 'proccessing-time-slider'}} endAdornment={<InputAdornment position="end">min.</InputAdornment>} />
                  </Grid>
                </Grid>
              </FormControl>
              </>
            }
            {/* IF TYPE IS ANIMAL PRODUCTS */}
            {
              (formOptions.TypeId === 4) &&
              <FormControl className={classes.formControl}>
                <InputLabel id="animals-label">Animal</InputLabel>
                <Select
                    labelId="animals-label"
                    id="AnimalId"
                    name="AnimalId"
                    value={formOptions.AnimalId}
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
              (formOptions.TypeId === 14) &&
              <>
              {/* Difficulty, Behavior, Size */}
              <Box style={{display: 'flex', flexFlow: 'row wrap'}}>
                <FormControl className={classes.formControl} style={{flex: 1}}>
                  <InputLabel>Difficulty</InputLabel>
                  <Input name="difficulty" value={formOptions.difficulty} onBlur={handleNumberChange} onChange={handleNumberChange} min={0} max={100} />
                </FormControl>
                <FormControl className={classes.formControl} style={{flex: 1}}>
                  <InputLabel id="fish-behavior-label">Behavior</InputLabel>
                  <Select
                    labelId="fish-behavior-label"
                    id="fish-behavior"
                    name="behavior"
                    value={formOptions.behavior}
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
                  <RadioGroup aria-label="weather" name="weather" value={formOptions.weather} onChange={handleRadioChange} style={{display: 'flex', flexFlow: 'row wrap'}}>
                    <FormControlLabel value="any" control={<Radio />} label="any" />
                    <FormControlLabel value="sun" control={<Radio />} label={<p style={{position: 'relative'}}><img src={weatherIcon_sun} alt="Sunny Weather" height={30} /><br/><span style={{position: 'absolute', fontSize: '0.75rem', textAlign: 'center', display: 'block', width: '100%', bottom: '-0.75rem'}}>Sun</span></p>} />
                    <FormControlLabel value="rain" control={<Radio />} label={<p style={{position: 'relative'}}><img src={weatherIcon_rain} alt="Rainy Weather" height={30} /><br/><span style={{position: 'absolute', fontSize: '0.75rem', textAlign: 'center', display: 'block', width: '100%', bottom: '-0.75rem'}}>Rain</span></p>} />
                  </RadioGroup>
                </Box>
                <Box style={{flex: 1}}>
                  <Typography variant="h4" gutterBottom>
                    Season
                  </Typography>
                  {formOptions.SeasonId.map(season => (
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
              <Input type="number" name="sellPrice" value={formOptions.sellPrice} onChange={handleNumberChange} />
            </FormControl>

            {/* SOURCE & EDIBILITY */}
            <Box style={{width: '100%'}}>
              {formOptions.TypeId !== 2 && formOptions.TypeId !== 14 ?
                <FormControl className={classes.formControl} style={{display: 'inline-block', width: '88%'}}>
                  <TextField id="source" label="Source" name="source" value={formOptions.source} onChange={handleTextChange} style={{width: '100%'}} />
                  <FormHelperText>If the source is a recipe recieved in the mail, please use the format <span className={classes.code}>Name (mail, X+ :heart:)</span> where 'Name' is the name of the NPC and 'X' is the number of hearts required with that NPC</FormHelperText>
                </FormControl>
                :
                <Box style={{flex: 1}}>
                  {formOptions.TypeId === 2 &&
                  <>
                  <Typography variant="h4" gutterBottom>
                    Season
                  </Typography>
                  {formOptions.SeasonId.map(season => (
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
                        value={formOptions.LocationId}
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
                    checked={formOptions.edible} />
                }
                style={{display: 'inline-block', marginTop: '0.75rem'}}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item lg={6}>
                <Button variant="contained" className={`${classes.btn} ${classes.saveBtn}`} onClick={(e) => handleFormSubmit(e)}>
                  <Typography variant="h2">Save</Typography>
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button variant="contained" className={`${classes.btn} ${classes.clearBtn}`} onClick={(e) => clearForm(e)}>
                  <Typography variant="h2">Clear</Typography>
                </Button>
              </Grid>
            </Grid>
            <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={handleAlertClose} />
          </Container>
        </Grid>
      </Grid>
  )
}
