import { useState, useEffect, useContext } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Container, Grid, TextField, FormControl, FormControlLabel, FormHelperText, Select, MenuItem, InputLabel, Typography, Button, Checkbox } from '@material-ui/core'

import AdminNpcsList from '../AdminNpcsList'

import API from '../../utils/API'

const CustomCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.green[600],
    // '&$checked': {
    //   color: theme.palette.green[600]
    // }
  }
}))((props) => <Checkbox color="default" {...props} />)

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
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

export default function AdminNpcsForm() {
  const classes = useStyles();

  const { dbNpcs, addNpcFormSubmit, addNpcFormOptions, setAddNpcFormOptions, defaultAddNpcFormOptions, selectedNpc, setSelectedNpc } = useContext(DatabaseContext);

  const [npcList, setNpcList] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setNpcList(dbNpcs);
    
  }, [dbNpcs]);

  useEffect(() => {
    API.getResidences().then(list => {
      const locations = list.data;
      locations.sort((a, b) => a.name > b.name ? 1 : -1);

      setLocations(locations);
    }).catch(err => console.error(err));

    API.getSeasons().then(list => {
    	setSeasons(list.data);
    }).catch(err => console.error(err));
  
  // eslint-disable-next-line
  }, []);

  const handleNpcClick = npc => {
    if(selectedNpc === null || selectedNpc.id !== npc.id) {
    	setSelectedNpc(npc);
    } else {
    	setSelectedNpc(null);
    }
  }

  const handleInputChange = e => {
    setAddNpcFormOptions({
    	...addNpcFormOptions,
    	[e.target.name]: e.target.name === 'marriageable' ? e.target.checked : e.target.value
    })
  }

  const clearForm = () => {
    setAddNpcFormOptions({
      ...defaultAddNpcFormOptions
    });

    setSelectedNpc(null)
  }

  return (
    <Grid container spacing={0}>
      <Grid item lg={4}>
        <Typography variant="h3" style={{ marginLeft: '1rem', textAlign: 'center' }}>NPCs</Typography>
        <AdminNpcsList onNpcClick={handleNpcClick} selected={selectedNpc} list={npcList} />
      </Grid>
      <Grid item lg={8}>
        <Container className={classes.form}>
          <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
          	{selectedNpc === null ? 'Add NPC' : `Update NPC: ${selectedNpc.name}`}
          </Typography>
          {/* Name & Location */}
          <Grid container spacing={2}>
          	{/* NAME */}
          	<Grid item xs={6}>
		          <FormControl className={classes.formControl}>
		            <TextField id="name" label="Name" name="name" value={addNpcFormOptions.name} onChange={handleInputChange} required />
		          </FormControl>
          	</Grid>
          	{/* Location */}
          	<Grid item xs={6}>
          		<FormControl className={classes.formControl} style={{bottom: '0.5rem'}}>
		            <InputLabel id="location-label">Location</InputLabel>
		            <Select
		              labelId="location-label"
		              id="LocationId"
		              name="LocationId"
		              value={addNpcFormOptions.LocationId}
		              onChange={handleInputChange}
		              style={{fontSize: '1.4rem'}}
		            >
		              {locations.map(location => <MenuItem key={`birthdaydate-${location.id}`} value={location.id}>{location.name}</MenuItem>)}
		            </Select>
		          </FormControl>
          	</Grid>
          </Grid>
          <Grid container spacing={2}>
          	<Grid item xs={6}>
	          	{/* Available in standard game, or a mod? */}
	          	<FormControl className={classes.formControl}>
		            <InputLabel id="availableIn-label">Available in standard game ("Vanilla"), or a mod?</InputLabel>
		            <Select
		              labelId="availableIn-label"
		              id="availableIn"
		              name="availableIn"
		              value={addNpcFormOptions.availableIn}
		              onChange={handleInputChange}
		              style={{fontSize: '1.4rem'}}
		            >
		              {['Vanilla', 'SVE', 'Ridgeside Village', 'Downtown Zuzu', 'Garden Village', 'Walk to the Desert', 'Mermaid Island', 'Deep Woods', 'Other'].map(mod => <MenuItem key={`checkupSeason-${mod}`} value={mod}>{mod}</MenuItem>)}
		            </Select>
		          </FormControl>
          	</Grid>
          	<Grid item xs={6}>
          		<FormControlLabel
                label="Marriage Candidate?"
                control={
                  <CustomCheckbox
                    name="marriageable"
                    value="marriageable"
                    onChange={handleInputChange} 
                    checked={addNpcFormOptions.marriageable}
                    style={{ display: 'inline-block' }}
                  />
                }
              />
          	</Grid>
          </Grid>
          {/* Birthday */}
          <Grid container spacing={2}>
          	<Grid item xs={6}>
          		<FormControl className={classes.formControl}>
		            <InputLabel id="birthdayseason-label">Birthday Season</InputLabel>
		            <Select
		              labelId="birthdayseason-label"
		              id="birthdaySeasonId"
		              name="birthdaySeasonId"
		              value={addNpcFormOptions.birthdaySeasonId}
		              onChange={handleInputChange}
		              style={{fontSize: '1.4rem'}}
		            >
		              {seasons.map(season => <MenuItem key={`birthdaySeason-${season.id}`} value={season.id}>{season.name}</MenuItem>)}
		            </Select>
		          </FormControl>
          	</Grid>
          	<Grid item xs={6}>
          		<FormControl className={classes.formControl}>
		            <InputLabel id="birthdaydate-label">Birthday Date</InputLabel>
		            <Select
		              labelId="birthdaydate-label"
		              id="birthdayDate"
		              name="birthdayDate"
		              value={addNpcFormOptions.birthdayDate}
		              onChange={handleInputChange}
		              style={{fontSize: '1.4rem'}}
		            >
		              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(date => <MenuItem key={`birthdaydate-${date}`} value={date}>{date}</MenuItem>)}
		            </Select>
		          </FormControl>
          	</Grid>
          </Grid>
        {/* Checkup */}
          <Grid container spacing={2}>
          	<Grid item xs={6}>
          		<FormControl className={classes.formControl}>
		            <InputLabel id="checkupseason-label">Checkup Season</InputLabel>
		            <Select
		              labelId="checkupseason-label"
		              id="checkupSeasonId"
		              name="checkupSeasonId"
		              value={addNpcFormOptions.checkupSeasonId}
		              onChange={handleInputChange}
		              style={{fontSize: '1.4rem'}}
		            >
		              {seasons.map(season => <MenuItem key={`checkupSeason-${season.id}`} value={season.id}>{season.name}</MenuItem>)}
		            </Select>
		          </FormControl>
          	</Grid>
          	<Grid item xs={6}>
          		<FormControl className={classes.formControl}>
		            <InputLabel id="birthdaydate-label">Checkup Date</InputLabel>
		            <Select
		              labelId="checkupdate-label"
		              id="checkupDate"
		              name="checkupDate"
		              value={addNpcFormOptions.checkupDate}
		              onChange={handleInputChange}
		              style={{fontSize: '1.4rem'}}
		            >
		              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map(date => <MenuItem key={`checkupdate-${date}`} value={date}>{date}</MenuItem>)}
		            </Select>
		            
		          </FormControl>
          	</Grid>
          	<FormHelperText style={{marginLeft: '1rem', padding: 0}}>If the NPC does <strong>NOT</strong> get a checkup [at the clinic], select 0 for the date. Any season may be selected, but if the date is '0' the (non-)event will not appear on the events calendar.</FormHelperText>
          </Grid>

        	{/* CLEAR & SAVE BUTTONS */}
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <Button variant="contained" className={`${classes.btn} ${classes.saveBtn}`} onClick={() => addNpcFormSubmit(addNpcFormOptions)}>
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
