import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { makeStyles } from '@material-ui/core/styles'

import { Container, Grid, Card, CardContent, Button, IconButton, Typography, CardActions, Modal } from '@material-ui/core'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons';

import NpcIcon from '../NpcIcon'
import ItemIcon from '../ItemIcon'

import AddEventForm from '../AddEventForm'
import EventsAdminContextMenu from '../EventsAdminContextMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
  },
  calendarWeekday: {
    backgroundColor: theme.palette.nightblue[700],
    color: theme.palette.dayblue[200],
    padding: "0.5rem 1rem",
    width: "35%",
    verticalAlign: "middle",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",

    "& h6": {
      display: "inline-block",
      padding: 0,
      margin: 0,
    },

    "&.alt": {
      backgroundColor: theme.palette.nightblue[800],
    },

    '&.Saturday': {
      backgroundColor: theme.palette.green[700],
    },

    '&.Sunday': {
      backgroundColor: theme.palette.green[800],
    },

    "& + &": {
      borderLeft: `1px solid ${theme.palette.dayblue[200]}`,
    },

    [theme.breakpoints.up("md")]: {
      padding: "0.25rem 1rem",
      textAlign: "center",
      width: `${100 / 7}%`,
    },
  },
  eventCard: {
    position: "relative",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "stretch",
    padding: 0,
    border: `1px solid ${theme.palette.nightblue[700]}`,

    "& + &": {
      borderTop: 0,
    },

    "& .card": {
      flex: 1,
      display: "flex",
      flexFlow: "column nowrap",
      justifyContent: "stretch",
      alignItems: "stretch",
      borderRadius: 0,
    },

    "&:nth-child(7n)": {
      borderRight: `1px solid ${theme.palette.nightblue[700]}`,
    },

    [theme.breakpoints.up("md")]: {
      width: `${100 / 7}%`,
      border: 0,
      borderBottom: `1px solid ${theme.palette.nightblue[700]}`,
      borderLeft: `1px solid ${theme.palette.nightblue[700]}`,
    },
  },
  dateContainer: {
    padding: 0,
    margin: 0,
    display: "inline-block",
  },
  date: {
    padding: "0.5rem",
    margin: "0.1rem",
    color: "white",
    display: "inline-block",
    border: `2px solid ${theme.palette.dayblue[500]}`,
    borderRadius: "50%",
    width: "1.2rem",
    height: "1.15rem",
    textAlign: "center",
    lineHeight: "1rem",
    fontWeight: "bold",
    fontSize: "large",

    [theme.breakpoints.up("md")]: {
      color: theme.palette.dayblue[700],
      padding: "0.5rem",
      margin: "0.25rem 0.15rem 0.15rem 0.25rem",
    },
  },
  eventCardContent: {
    textAlign: "left",
    padding: "0.15rem 0.25rem",

    [theme.breakpoints.up("md")]: {
      minHeight: "6rem",
    },
  },
  eventCardActions: {
    textAlign: "right",
    justifyContent: "flex-end",
  },
  eventBlock: {
    position: "relative",
    display: "inline-block",
    margin: "0 5px 0 0",
    padding: 0,
    "&:hover": {
      cursor: "pointer",
    },
  },
  checkboxes: {
    padding: "0 0.5rem",
    "& .MuiFormControlLabel-label": {
      fontSize: "smaller",
    },
  },
  seasonBtn: {
    margin: theme.spacing(1),
    transition: "all 0.3s ease-out",
  },
  SpringBtn: {
    backgroundColor: theme.palette.green[200],
    border: "2px solid transparent",

    "&:hover": {
      backgroundColor: theme.palette.green[600],
      color: "white",
    },

    "&.active": {
      backgroundColor: theme.palette.green[500],
      borderColor: theme.palette.green[600],
      color: "white",
    },
  },
  SummerBtn: {
    backgroundColor: theme.palette.pink[200],
    border: "2px solid transparent",

    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.pink[600],
    },

    "&.active": {
      backgroundColor: theme.palette.pink[500],
      borderColor: theme.palette.pink[600],
      color: "white",
    },
  },
  FallBtn: {
    backgroundColor: theme.palette.sand[200],
    border: "2px solid transparent",

    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.sand[600],
    },

    "&.active": {
      backgroundColor: theme.palette.sand[500],
      borderColor: theme.palette.sand[600],
      color: "white",
    },
  },
  WinterBtn: {
    backgroundColor: theme.palette.dayblue[200],
    border: "2px solid transparent",

    "&:hover": {
      color: "white",
      backgroundColor: theme.palette.dayblue[600],
    },

    "&.active": {
      backgroundColor: theme.palette.dayblue[500],
      borderColor: theme.palette.dayblue[600],
      color: "white",
    },
  },
  deleteBtn: {
    verticalAlign: "top",
    margin: 0,
    padding: "0 0.1rem",
    color: theme.palette.red[500],
  },
  addBtn: {
    display: "inline-block",
    backgroundColor: theme.palette.green[500],
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.green[700],
    },
  },
  modal: {
    padding: "2rem",
  },
  modalBody: {
    position: "relative",
    backgroundColor: theme.palette.sand[100],
    borderRadius: "4px",
    padding: "0.5rem 1rem",
  },
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

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({x: null, y: null})
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleContextMenu = (e, eventData) => {
    e.preventDefault();

    if(token) {
    	if(eventData !== null && eventData !== undefined) {
	      setShowContextMenu(true);
	      setContextMenuPos({
	        x: e.pageX + 8,
	        y: e.pageY + 15
	      });

	      setSelectedEvent(eventData);
	    } else {
	      setShowContextMenu(false);
	      setContextMenuPos({
	        x: null,
	        y: null
	      })
	      setSelectedEvent(null)
	    }
    }
  }

  const handleContextMenuClose = (e, action) => {
    setContextMenuPos({
      x: null,
      y: null
    });
    setShowContextMenu(false);

    if(action === 'edit') {
      openNewEventUpdate(selectedEvent)
    }

    if(action === 'delete') {
      deleteEvent(selectedEvent.id)
    }
  }

  return (
    <>
      {allSeasons.map((season) => (
        <Button
          key={season.id}
          className={
            season.id === selectedSeason.id
              ? `${classes.seasonBtn} ${classes[`${season.name}Btn`]} active`
              : `${classes.seasonBtn} ${classes[`${season.name}Btn`]}`
          }
          onClick={() => handleSeasonChange(season.name, season.id)}
        >
          {season.name}
        </Button>
      ))}

      <Grid container spacing={0}>
        {window.innerWidth >= 768 ? (
          [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((weekday) => (
            <Grid
              container
              item
              key={weekday}
              className={`${classes.calendarWeekday} ${weekday}`}
            >
              <Typography
                variant="h6"
                style={{ textAlign: "center", width: "100%" }}
              >
                {weekday}
              </Typography>
            </Grid>
          ))
        ) : (
          <></>
        )}
        {dates.map(({ date }) => {
          const weekdayName = [1, 8, 15, 22].includes(date)
            ? "Monday"
            : [2, 9, 16, 23].includes(date)
            ? "Tuesday"
            : [3, 10, 17, 24].includes(date)
            ? "Wednesday"
            : [4, 11, 18, 25].includes(date)
            ? "Thursday"
            : [5, 12, 19, 26].includes(date)
            ? "Friday"
            : [6, 13, 20, 27].includes(date)
            ? "Saturday"
            : "Sunday";

          return (
            <Grid container item key={date} className={classes.eventCard}>
              {window.innerWidth < 768 ? (
                <Grid
                  container
                  item
                  className={
                    date % 2 !== 0
                      ? `${classes.calendarWeekday} ${weekdayName} alt`
                      : `${classes.calendarWeekday} ${weekdayName}`
                  }
                >
                  <Grid item className={classes.dateContainer}>
                    <Typography className={classes.date} gutterBottom>
                      {date}
                    </Typography>
                  </Grid>
                  <Typography variant="h6">{weekdayName}</Typography>
                </Grid>
              ) : (
                ""
              )}
              <Card elevation={0} className="card">
                <CardContent className={classes.eventCardContent}>
                  <Grid container>
                    {window.innerWidth >= 768 ? (
                      <Grid item className={classes.dateContainer}>
                        <Typography className={classes.date} gutterBottom>
                          {date}
                        </Typography>
                      </Grid>
                    ) : (
                      ""
                    )}
                    {allEvents.map(
                      (event) =>
                        event.day === date && (
                          <Grid
                            item
                            key={event.id}
                            className={classes.eventBlock}
                          >
                            <span
                              onContextMenu={(e) => handleContextMenu(e, event)}
                            >
                              {event.type === "birthday" &&
                              event.NpcId !== null ? (
                                <NpcIcon
                                  tooltip={event.name}
                                  name={event.Npc.name}
                                  overlay={cakeIcon}
                                  swap={true}
                                  size={38}
                                  overlaySize={32}
                                />
                              ) : event.type === "checkup" ? (
                                <NpcIcon
                                  tooltip={event.name}
                                  name={event.Npc.name}
                                  overlay={checkupIcon}
                                  swap={true}
                                  size={38}
                                  overlaySize={32}
                                />
                              ) : event.type === "other" &&
                                event.NpcId !== null ? (
                                <NpcIcon
                                  tooltip={event.name}
                                  name={event.Npc.name}
                                  overlay={otherEventTypeIcon}
                                  swap={true}
                                  size={38}
                                  overlaySize={32}
                                />
                              ) : (
                                <ItemIcon
                                  tooltip={true}
                                  icon={
                                    event.name === "Night Market"
                                      ? nightMarketIcon
                                      : event.type === "other"
                                      ? otherEventTypeIcon
                                      : festivalIcon
                                  }
                                  name={event.name}
                                />
                              )}
                            </span>
                          </Grid>
                        )
                    )}
                  </Grid>
                </CardContent>
                {token && (
                  <CardActions className={classes.eventCardActions}>
                    <IconButton
                      className={classes.addBtn}
                      onClick={() => openModal(date)}
                      size="small"
                    >
                      <AddIcon />
                    </IconButton>
                  </CardActions>
                )}
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Modal
        className={classes.modal}
        open={modalState}
        onClose={closeModal}
        aria-labelledby="Add Event Modal"
        aria-describedby="Add a new event"
      >
        <Container className={classes.modalBody}>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={closeModal}
            style={{ position: "absolute", right: "1rem", top: "0.75rem" }}
          >
            <CloseIcon />
          </IconButton>
          <AddEventForm />
        </Container>
      </Modal>
      <EventsAdminContextMenu
        showMenu={showContextMenu}
        menuPos={contextMenuPos}
        handleClose={handleContextMenuClose}
        label={"Event"}
      />
    </>
  );
}
