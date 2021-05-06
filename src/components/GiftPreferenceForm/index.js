import { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Box, Container, FormGroup, FormControlLabel, Checkbox, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core'
// import { CheckBoxOutlineBlankIcon, CheckBoxIcon } from '@material-ui/icons'

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
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    margin: 0,
    gridAutoFlow: 'row',
    // gridColumnGap: '0.25rem'
  },
  row: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  col: {
    flex: '1 0 auto',
    padding: '0 1.5rem',
    marginTop: '1rem'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  saveBtn: {
    backgroundColor: theme.palette.green[300],
    width: '100%',
    marginTop: '2rem',
    marginBottom: '3rem',
    '&:hover': {
      backgroundColor: theme.palette.green[500]
    }
  }
}));

export default function GiftPreferenceForm() {
  const classes = useStyles();

  const [formOptions, setFormOptions] = useState({
    npcs: [],
    items: [],
    preference: ''
  });

  useEffect(() => {
    API.getVillagers().then(list => {
      // set the form options list of NPCs and add a new key/value pair for isChecked, defaulting to false
      const npcList = list.data.map(npc => ({ id: npc.id, name: npc.name, isChecked: false }));

      API.getItems().then(list => {
        // set the form options list of NPCs and add a new key/value pair for isChecked, defaulting to false
        const itemList = list.data.map(item => ({ id: item.id, name: item.name, isChecked: false }));
        setFormOptions({...formOptions, npcs: npcList, items: itemList });
      }).catch(err => console.error(err));

    }).catch(err => console.error(err));
  // eslint-disable-next-line
  }, [])

  const handleOnChange = e => {

    if(e.target.name !== "preference") {

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
      
    } else {
      setFormOptions({
        ...formOptions,
        preference: e.target.value
      })
    }
  }

  const handleFormSubmit = e => {
    console.log("the database will be updated here")
    console.log("and then the form cleared")
  }

  return (
    <Box>
      <Container className={classes.row} maxWidth="xl">
        <Box className={classes.col} style={{borderRight: '1px solid dodgerblue'}}>
          <Typography variant="h2" gutterBottom>
            NPCs
            <FormControl className={classes.formControl} style={{marginLeft: '3rem'}}>
              <InputLabel id="preference-label">Preference</InputLabel>
                <Select
                  labelId="preference-label"
                  id="preference"
                  name="preference"
                  value={formOptions.preference}
                  onChange={(e) => handleOnChange(e)}
                  style={{fontSize: '1.4rem'}}
                >
                  <MenuItem value="love">Love</MenuItem>
                  <MenuItem value="like">Like</MenuItem>
                  <MenuItem value="neutral">Neutral</MenuItem>
                  <MenuItem value="dislike">Dislike</MenuItem>
                  <MenuItem value="hate">Hate</MenuItem>
                </Select>
            </FormControl>
          </Typography>
          <FormGroup className={classes.list}>
            {formOptions.npcs.map(npc => 
            <FormControlLabel 
              key={`${npc.id}-label`} 
              label={npc.name} 
              control={
                <CustomCheckbox 
                name="npcs"
                key={`${npc.id}-checkbox`}
                onChange={(e) => handleOnChange(e)} 
                value={npc.id} 
                checked={npc.isChecked} />
              } 
            />)}
          </FormGroup>
        </Box>
        <Box className={classes.col}>
          <Typography variant="h2" gutterBottom>
            Items
          </Typography>
          <FormGroup className={classes.list}>
            {formOptions.items.map(item => 
            <FormControlLabel 
              key={`${item.id}-label`} 
              label={item.name} 
              control={
                <CustomCheckbox 
                name="items"
                key={`${item.id}-checkbox`}
                onChange={(e) => handleOnChange(e)} 
                value={item.id} 
                checked={item.isChecked} />
              } 
            />)}
          </FormGroup>
        </Box>
      </Container>
      <Container maxWidth="xl">
        <Button variant="contained" className={classes.saveBtn} onClick={(e) => handleFormSubmit(e)}>
          <Typography variant="h2">Save</Typography>
        </Button>
      </Container>
    </Box>
  )
}
