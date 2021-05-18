import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'

import { Container, Grid, Card, CardContent, Button, IconButton, Typography, CardActions, TextField, FormControlLabel, RadioGroup, Radio, Select, MenuItem } from '@material-ui/core'
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import VillagerIcon from '../VillagerIcon'
import ItemIcon from '../ItemIcon'

import API from '../../utils/API'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'transparent'
  },
  calendarWeekday: {
    width: `${100 / 7}%`,
    backgroundColor: theme.palette.nightblue[700],
    color: theme.palette.dayblue[200],
    textAlign: 'center',
    padding: '0.25rem 1rem',
    '& + &': {
      borderLeft: `1px solid ${theme.palette.dayblue[200]}`
    }
  },
  eventCard: {
    width: `${100 / 7}%`,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderBottom: `1px solid ${theme.palette.nightblue[700]}`,
    borderLeft: `1px solid ${theme.palette.nightblue[700]}`,

    '& .card': {
      display: 'inline-block',
      margin: '0 auto',
      padding: '0.25rem 1rem 1rem',
      borderRadius: 0,
    },

    '&:nth-child(7n)': {
      borderRight: `1px solid ${theme.palette.nightblue[700]}`
    }
  },
  eventCardHeader: {
    // backgroundColor: theme.palette.nightblue[700],
    padding: '0.75rem 0.5rem',
    color: theme.palette.dayblue[700],
    '& .date': {
      display: 'inline-block',
      border: `2px solid ${theme.palette.dayblue[500]}`,
      borderRadius: '50%',
      width: '2.25rem',
      height: '2.25rem',
      textAlign: 'center',
      lineHeight: '2.25rem'
    },
    '& .weekday': {
      marginLeft: '0.5rem',
    }
  },
  eventCardActions: {
    // display: 'flex',
    // flexFlow: 'column nowrap',
    // '& .MuiButtonBase-root': {
    //   flex: 0
    // }
  },
  eventCardContent: {
    textAlign: 'left',
    minHeight: '6rem'
  },
  checkboxes: {
    padding: '0 0.5rem',
    '& .MuiFormControlLabel-label': {
      fontSize: 'smaller'
    }
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
  seasonBtn: {
    margin: theme.spacing(1),
    transition: 'all 0.3s ease-out',
  },
  SpringBtn: {
    backgroundColor: theme.palette.green[200],
    border: '2px solid transparent',

    '&:hover': {
      backgroundColor: theme.palette.green[600],
      color: 'white',
    },

    '&.active': {
      backgroundColor: theme.palette.green[500],
      borderColor: theme.palette.green[600],
      color: 'white'
    }
  },
  SummerBtn: {
    backgroundColor: theme.palette.pink[200],
    border: '2px solid transparent',

    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.pink[600],
    },

    '&.active': {
      backgroundColor: theme.palette.pink[400],
      borderColor: theme.palette.pink[600],
      color: 'white'
    }
  },
  FallBtn: {
    backgroundColor: theme.palette.sand[200],
    border: '2px solid transparent',

    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.sand[600],
    },

    '&.active': {
      backgroundColor: theme.palette.sand[400],
      borderColor: theme.palette.sand[600],
      color: 'white',
    }
  },
  WinterBtn: {
    backgroundColor: theme.palette.dayblue[200],
    border: '2px solid transparent',

    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.dayblue[600],
    },

    '&.active': {
      backgroundColor: theme.palette.dayblue[400],
      borderColor: theme.palette.dayblue[600],
      color: 'white'
    }
  },
  deleteBtn: {
    verticalAlign: 'top',
    margin: 0,
    padding: "0 0.1rem",
    color: theme.palette.red[500]
  },
  addBtn: {
    backgroundColor: theme.palette.green[500],
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.green[700]
    }
  }
}));

export default function Calendar() {
  const classes = useStyles();

  const { setAlert, getIcon } = useContext(DatabaseContext)

  const festivalIcon = getIcon('Calendar Flag Static', 'other_icons').default;
  const nightMarketIcon = getIcon('Iridium Quality', 'other_icons').default;
  const checkupIcon = getIcon('Health', 'other_icons').default;
  const cakeIcon = getIcon('Birthday Cake', 'other_icons').default;
  const otherEventTypeIcon = getIcon('Stardew Checkup Icon', 'other_icons').default;

  const [seasons, setSeasons] = useState([])
  const [dates, setDates] = useState([])
  const [events, setEvents] = useState([])

  const [selectedSeason, setSelectedSeason] = useState({id: 1, name: 'Spring'})

  const [newEvents, setNewEvents] = useState({})

  const token = JSON.parse(localStorage.getItem('token')) || false;
  const [villagers, setVillagers] = useState([])
  
  useEffect(() => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let datesArray = []
    let newEventsObj = {};
    let n = 0;
    for(var i = 1; i <= 28; i++) {
      datesArray.push({
        date: i,
        name: weekdays[n]
      });

      if(n < 7) {
        n++;

      } if (n % 7 === 0) {
        n = 0;
      }

      newEventsObj[i] = {
        name: "",
        day: i,
        VillagerId: '',
        SeasonId: selectedSeason.id,
        type: 'other'
      }
    }

    setDates([...datesArray])
    setNewEvents(newEventsObj)


    API.getSeasons()
      .then(seasons => {
        setSeasons([...seasons.data])
      })
      .catch(err => {
        console.error(err);
      })

    API.getVillagers()
      .then(villagers => {
        setVillagers(villagers.data)
      })
      .catch(err => {
        console.error(err)
      })
    
    getEvents(selectedSeason.id);
  // eslint-disable-next-line
  }, [])

  const getEvents = (SeasonId) => {
    API.getEventsBySeason(SeasonId)
      .then(results => {
        setEvents(results.data)
      })
      .catch(err => console.error(err))
  }

  const addEvent = (date) => {
    const eventData = newEvents[date];
    if(eventData.VillagerId === '') eventData.VillagerId = null

    API.postEvent(eventData)
      .then((event) => {
        let season = seasons.filter(season => season.id === parseInt(eventData.SeasonId));
        setAlert({ open: true, severity: "success", message: `"${event.data.name}" added successfully to ${season[0].name} ${eventData.day}`})
        
        getEvents(selectedSeason.id);

        setNewEvents({...newEvents, [date]: {...newEvents[date], name: "", type: 'other'}})
      })
      .catch(err => {
        setAlert({open: true, severity: 'error', message: `"${eventData.name}" NOT created.\nERROR: ${err.message}`});
      })
  }

  const deleteEvent = (id) => {
    let eventData;
    for(var i = 0; i < events.length; i++) {
      if(events[i].id === id) {
        eventData = events[i];
      }
    }

    API.deleteEvent(id)
      .then(deleted => {
        let season = seasons.filter(season => season.id === parseInt(eventData.SeasonId));
        setAlert({open: true, severity: 'success', message: `"${deleted.data.name}" event deleted successfully from ${season[0].name} ${deleted.data.day}`});

        setEvents( events.filter(event => event.id !== id) )
      })
      .catch(err => {
        console.error(err)
        setAlert({open: true, severity: 'error', message: `"${eventData.name}" NOT deleted.\nERROR: ${err.message}`});
      })
  }

  const handleSeasonChange = (season, id) => {
    setSelectedSeason({id: id, season: season});

    let eventSeason = newEvents;
    const keys = Object.keys(newEvents);
    // const values = Object.values(newEvents);
    for(var i = 0; i < keys.length; i++) {
      eventSeason[keys[i]].name = "";
      eventSeason[keys[i]].SeasonId = id;
      eventSeason[keys[i]].VillagerId = '';
    }
    setNewEvents(eventSeason);

    getEvents(id)
  }

  const handleInputChange = (e, date) => {
    setNewEvents({
      ...newEvents,
      [date]: {
        ...newEvents[date],
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <Container maxWidth={token ? 'xl' : 'lg'}>
      {seasons.map(season => <Button key={season.id} className={season.id === selectedSeason.id ? `${classes.seasonBtn} ${classes[`${season.name}Btn`]} active` : `${classes.seasonBtn} ${classes[`${season.name}Btn`]}`} onClick={() => handleSeasonChange(season.name, season.id)}>{season.name}</Button>)}
      
      <Grid container spacing={0}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(weekday => <Grid container item key={weekday} className={classes.calendarWeekday}><Typography variant="h6" style={{textAlign: 'center', width: '100%'}}>{weekday}</Typography></Grid>)}
        {dates.map(({date}) => 
        <Grid container item key={date} className={classes.eventCard}>
          <Card elevation={0} className="card">
            <Container className={classes.eventCardHeader}>
            <Typography style={{fontWeight: 'bold', fontSize: 'large'}} gutterBottom>
                <span className="date">{date}</span> {/* <span className="weekday">{name}</span> */}
            </Typography>
            </Container>
            <CardContent className={classes.eventCardContent}>
              <Grid container>
              {
              events.map(event => (event.day === date) && <Grid item key={event.id} className={classes.eventBlock}>{(event.VillagerId !== null && event.type === 'birthday') ? <VillagerIcon tooltip={event.name} name={event.Villager.name} overlay={cakeIcon} swap={true} size={38} overlaySize={32} /> : event.type === 'checkup' ? <VillagerIcon tooltip={event.name} name={event.Villager.name} overlay={checkupIcon} swap={true} size={38} overlaySize={32} /> : <ItemIcon tooltip={true} icon={event.name === "Night Market" ? nightMarketIcon : event.type === 'other' ? otherEventTypeIcon : festivalIcon} name={event.name} />} {token && <IconButton className={classes.deleteBtn} onClick={() => deleteEvent(event.id)}><DeleteIcon /></IconButton>}</Grid>)
              }
              </Grid>
            </CardContent>
            {token &&
            <>
              <CardActions className={classes.eventCardActions}>
                <TextField
                  label="Event Title"
                  name="name"
                  value={newEvents[date].name}
                  onChange={(e) => handleInputChange(e, date)}
                />
                <IconButton className={classes.addBtn} onClick={() => addEvent(date)} size="small"><AddIcon /></IconButton>
                
              </CardActions>
              <RadioGroup aria-label="event type" name="type" value={newEvents[date].type} onChange={(e) => handleInputChange(e, date)}>
              <Grid container className={classes.checkboxes}>
                <Grid item>
                <FormControlLabel
                  label="Festival"
                  value="festival"
                  control={
                    <Radio />
                  }
                />
                </Grid>
                <Grid item>
                <FormControlLabel
                  label="Birthday"
                  value="birthday"
                  control={
                    <Radio />
                  }
                />
                </Grid>
                <Grid item>
                <FormControlLabel
                  label="Checkup"
                  value="checkup"
                  control={
                    <Radio />
                  }
                />
                </Grid>
                <Grid item>
                <FormControlLabel
                  label="Other"
                  value="other"
                  control={
                    <Radio />
                  }
                />
                </Grid>
              </Grid>
              </RadioGroup>
              {(newEvents[date].type !== 'festival') &&
                <Select
                  labelId="villager-birthday-select-label"
                  id="villager-birthday-select"
                  value={newEvents[date].VillagerId}
                  onChange={(e) => handleInputChange(e, date)}
                  name="VillagerId"
                  className={classes.villagerSelect}
                >
                  {villagers.map(villager => <MenuItem key={villager.id} value={villager.id}><VillagerIcon name={villager.name} style={{margin: 0}} style={{marginRight: '0.5rem'}} /> {villager.name}</MenuItem>)}
                </Select>
              }
            </>
            }
          </Card>
        </Grid>
        )}
      </Grid>
    </Container>
  )
}
