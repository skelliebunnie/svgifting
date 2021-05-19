import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'
import { Container, Box, Grid, Button, TextField, FormControl, FormControlLabel, InputLabel, RadioGroup, Radio, Select, MenuItem, Typography } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'

import VillagerIcon from '../VillagerIcon'

import API from '../../utils/API'

const useStyles = makeStyles((theme) => ({
  form: {
    paddingTop: '1rem'
  },
  villagerList: {
    display: 'flex',
    flexFlow: 'row wrap'
  },
  villagerSelect: {
    width: '90%',
    margin: '0 auto',
    '& #villager-birthday-select': {
      paddingLeft: '0.25rem',
    },
    '& img': {
      verticalAlign: 'middle',
      marginRight: '0.25rem'
    }
  },
  formControl: {
    width: '100%',
    padding: theme.spacing(1),
    paddingLeft: 0,
    '& label': {
      color: theme.palette.sand[700],
      fontSize: '1.2rem'
    }
  },
  radioGroupLabel: {
    display: 'inline-block',
    position: 'relative',
    margin: '0.2rem 0.2rem 0 8px',
    padding: '0.25rem 0',
    color: theme.palette.sand[700],
    fontSize: '1.2rem',
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

export default function AddEventForm() {
  const classes = useStyles();

  const { newEvent, defaultNewEvent, setNewEvent, addEvent } = useContext(DatabaseContext)

  const eventTypes = ['Festival', 'Birthday', 'Checkup', 'Other']

  const [villagers, setVillagers] = useState([])

  useEffect(() => {
    API.getVillagers()
      .then(villagers => {
        setVillagers(villagers.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    })
  }

  const handleTimeChange = (target, time) => {
    setNewEvent({
      ...newEvent,
      [target]: time
    })
  }

  const clearForm = (e) => {
    setNewEvent(defaultNewEvent)
  }

  return (
    <Container className={classes.form}>
      <Typography variant="h3">{newEvent.title !== "" ? 'Update' : 'Add'} Event</Typography>
      <Box>
        <FormControl className={classes.formControl}>
          <TextField id="name" label="Event Title" name="name" value={newEvent.name} onChange={handleInputChange} required />
        </FormControl>
      </Box>
      <Grid container spacing={0} style={{marginTop: '1rem'}}>
        <Grid item xs={12} lg={6}>
          <InputLabel id="eventtype-label" className={classes.radioGroupLabel}>Event Type</InputLabel>
          <FormControl className={classes.formControl}>
            <RadioGroup aria-label="event type" name="type" value={newEvent.type} onChange={(e) => handleInputChange(e)}>
              <Grid container className={classes.checkboxes}>
                  {eventTypes.map(type => 
                    <Grid key={type} item>
                      <FormControlLabel
                        label={type}
                        value={type.toLowerCase()}
                        control={
                          <Radio />
                        }
                      />
                    </Grid>
                  )}
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} lg={6}>
          {(newEvent.type !== 'festival') &&
            <FormControl className={classes.formControl}>
              <InputLabel id="villager-select-label">Associated Villager</InputLabel>
              <Select
                labelId="villager-select-label"
                id="villager-select"
                value={newEvent.VillagerId}
                onChange={(e) => handleInputChange(e)}
                name="VillagerId"
                className={classes.villagerSelect}
                style={{fontSize: '1.4rem', marginLeft: 0}}
              >
                {villagers.map(villager => <MenuItem key={villager.id} value={villager.id}><VillagerIcon name={villager.name} style={{marginRight: '0.5rem'}} /> {villager.name}</MenuItem>)}
              </Select>
            </FormControl>
          }
        </Grid>
      </Grid>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <Grid item>
            <KeyboardTimePicker
              format="HH:mm"
              clearable={true}
              margin="normal"
              id="start-time-picker"
              label="Start Time"
              name="startTime"
              value={newEvent.startTime}
              onChange={(date) => handleTimeChange('startTime', date)}
              KeyboardButtonProps={{
                'aria-label': 'change start time'
              }}
            />
          </Grid>
          <Grid item>
            <KeyboardTimePicker
              format="HH:mm"
              clearable={true}
              margin="normal"
              id="end-time-picker"
              label="End Time"
              name="endTime"
              value={newEvent.endTime}
              onChange={(date) => handleTimeChange('endTime', date)}
              KeyboardButtonProps={{
                'aria-label': 'change end time'
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
      <Box>
        <Grid container spacing={2}>
          <Grid item lg={6}>
            <Button variant="contained" className={`${classes.btn} ${classes.saveBtn}`} onClick={addEvent}>
              <Typography variant="h2">Save</Typography>
            </Button>
          </Grid>
          <Grid item lg={6}>
            <Button variant="contained" className={`${classes.btn} ${classes.clearBtn}`} onClick={(e) => clearForm(e)}>
              <Typography variant="h2">Clear</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
