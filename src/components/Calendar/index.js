import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'

import { Container, Grid, Card, CardContent, Button, IconButton, Typography, CardActions, Modal } from '@material-ui/core'
import { Add as AddIcon, Delete as DeleteIcon, Close as CloseIcon } from '@material-ui/icons';

import VillagerIcon from '../VillagerIcon'
import ItemIcon from '../ItemIcon'

import AddEventForm from '../AddEventForm'

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
    position: 'relative',
    width: `${100 / 7}%`,
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderBottom: `1px solid ${theme.palette.nightblue[700]}`,
    borderLeft: `1px solid ${theme.palette.nightblue[700]}`,
    padding: 0,

    '& .card': {
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      borderRadius: 0,
    },

    '&:nth-child(7n)': {
      borderRight: `1px solid ${theme.palette.nightblue[700]}`
    }
  },
  dateContainer: {
    padding: 0,
    margin: 0,
  },
  date: {
    padding: '0.5rem',
    margin: '0.25rem 0.15rem 0.15rem 0.25rem',
    color: theme.palette.dayblue[700],
    display: 'inline-block',
    border: `2px solid ${theme.palette.dayblue[500]}`,
    borderRadius: '50%',
    width: '1.2rem',
    height: '1.15rem',
    textAlign: 'center',
    lineHeight: '1rem',
    fontWeight: 'bold', 
    fontSize: 'large'
  },
  eventCardContent: {
    textAlign: 'left',
    minHeight: '6rem',
    padding: '0.15rem 0.25rem'
  },
  eventCardActions: {
    textAlign: 'right',
    justifyContent: 'flex-end'
  },
  eventBlock: {
    position: 'relative',
    display: 'inline-block',
    margin: '0 5px 0 0', 
    padding: 0,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  checkboxes: {
    padding: '0 0.5rem',
    '& .MuiFormControlLabel-label': {
      fontSize: 'smaller'
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
      backgroundColor: theme.palette.pink[500],
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
      backgroundColor: theme.palette.sand[500],
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
      backgroundColor: theme.palette.dayblue[500],
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
    display: 'inline-block',
    backgroundColor: theme.palette.green[500],
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.green[700]
    }
  },
  modal: {
    padding: '2rem'
  },
  modalBody: {
    position: 'relative',
    backgroundColor: theme.palette.sand[100],
    borderRadius: '4px',
    padding: '0.5rem 1rem'
  }
}));

export default function Calendar({ modalState, openModal, closeModal }) {
  const classes = useStyles();

  const { getIcon, dates, seasons, events, selectedSeason, handleSeasonChange, deleteEvent, setNewEvent } = useContext(DatabaseContext)

  const festivalIcon = getIcon('Calendar Flag Static', 'other_icons').default;
  const nightMarketIcon = getIcon('Iridium Quality', 'other_icons').default;
  const checkupIcon = getIcon('Health', 'other_icons').default;
  const cakeIcon = getIcon('Birthday Cake', 'other_icons').default;
  const otherEventTypeIcon = getIcon('Stardew Checkup Icon', 'other_icons').default;

  const token = JSON.parse(localStorage.getItem('token')) || false;
  const [allSeasons, setAllSeasons] = useState([])
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    setAllSeasons(seasons);
    setAllEvents(events);

  }, [seasons, events])

  const openNewEventUpdate = (event) => {
    let updateEvent = event;
    updateEvent.startTime = `2021-01-01T${event.startTime}`
    updateEvent.endTime = `2021-01-01T${event.endTime}`
    setNewEvent(updateEvent)
    openModal(event.day)
  }

  return (
    <Container maxWidth={token ? 'xl' : 'lg'}>
      {allSeasons.map(season => <Button key={season.id} className={season.id === selectedSeason.id ? `${classes.seasonBtn} ${classes[`${season.name}Btn`]} active` : `${classes.seasonBtn} ${classes[`${season.name}Btn`]}`} onClick={() => handleSeasonChange(season.name, season.id)}>{season.name}</Button>)}
      
      <Grid container spacing={0}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(weekday => <Grid container item key={weekday} className={classes.calendarWeekday}><Typography variant="h6" style={{textAlign: 'center', width: '100%'}}>{weekday}</Typography></Grid>)}
        {dates.map(({date}) => 
        <Grid container item key={date} className={classes.eventCard}>
          <Card elevation={0} className="card">
            <CardContent className={classes.eventCardContent}>
              <Grid container>
              <Grid item className={classes.dateContainer}>
                <Typography className={classes.date} gutterBottom>
                  {date}
                </Typography>
              </Grid>
              {
              allEvents.map(event => (event.day === date) && 
                <Grid item key={event.id} className={classes.eventBlock}>
                  <span onClick={() => openNewEventUpdate(event)}>
                  {(event.type === 'birthday' && event.VillagerId !== null) ? 
                  <VillagerIcon tooltip={event.name} name={event.Villager.name} overlay={cakeIcon} swap={true} size={38} overlaySize={32} /> 
                  : 
                  event.type === 'checkup' ? 
                  <VillagerIcon tooltip={event.name} name={event.Villager.name} overlay={checkupIcon} swap={true} size={38} overlaySize={32} /> 
                  :
                  (event.type === 'other' && event.VillagerId !== null) ?
                  <VillagerIcon tooltip={event.name} name={event.Villager.name} overlay={otherEventTypeIcon} swap={true} size={38} overlaySize={32} />
                  :
                  <ItemIcon tooltip={true} icon={event.name === "Night Market" ? nightMarketIcon : event.type === 'other' ? otherEventTypeIcon : festivalIcon} name={event.name} />}
                  </span>
                  {token && 
                    <IconButton className={classes.deleteBtn} onClick={() => deleteEvent(event.id)} style={{display: 'inline-block', margin: 0, padding: 0}}><DeleteIcon /></IconButton>
                  }
                </Grid>
              )}
              </Grid>
            </CardContent>
            {token &&
              <CardActions className={classes.eventCardActions}>
                <IconButton className={classes.addBtn} onClick={() => openModal(date)} size="small"><AddIcon /></IconButton>
              </CardActions>
            }
          </Card>
        </Grid>
        )}
      </Grid>
      <Modal
        className={classes.modal}
        open={modalState}
        onClose={closeModal}
        aria-labelledby="Add Event Modal"
        aria-describedby="Add a new event"
      >
        <Container className={classes.modalBody}>
          <IconButton aria-label="close" color="inherit" onClick={closeModal} style={{position: 'absolute', right: '1rem', top: '0.75rem'}}>
            <CloseIcon />
          </IconButton>
          <AddEventForm />
        </Container>
      </Modal>
    </Container>
  )
}
