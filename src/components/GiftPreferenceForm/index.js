import { useState, useEffect, useContext, useRef } from 'react'
import { DatabaseContext } from "../../contexts/DatabaseContext";
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Grid, Container, FormGroup, FormControlLabel, Checkbox, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, IconButton, Modal } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'

import UpsertItemForm from '../UpsertItemForm'
import ItemIcon from '../ItemIcon'
import VillagerIcon from '../VillagerIcon'

import { useSnackbar } from 'notistack'

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
  root: {
    padding: 0,
    paddingTop: "2rem",
    [theme.breakpoints.down("md")]: {
      paddingTop: 0,
    },
  },
  list: {
    display: "grid",
    margin: 0,
    gridAutoFlow: "row",

    "&.text-col-2": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },

    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  row: {
    display: "flex",
    flexFlow: "row wrap",
  },
  col: {
    flex: "1 0 auto",
    padding: "0 1.5rem",
    marginTop: "1rem",
    // '&:first-child': {
    //   maxWidth: '25%'
    // }
  },
  formControl: {
    minWidth: 120,
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(1),
    },
  },
  searchItemsField: {
    position: "relative",
    width: "100%",

    [theme.breakpoints.up("md")]: {
      bottom: "-0.5rem",
      width: "60%",
      marginLeft: "2rem",
    },
  },
  preferenceSelect: {
    fontSize: "1.4rem",
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  saveBtn: {
    backgroundColor: theme.palette.green[300],
    width: "100%",
    marginTop: "2rem",
    marginBottom: "3rem",
    "&:hover": {
      backgroundColor: theme.palette.green[500],
    },
  },
  addItemBtn: {
    backgroundColor: theme.palette.dayblue[500],
    color: "white",
    fontSize: "large",
    margin: "0 1rem",
    transition: "all 0.3s ease-out",
    "&:hover": {
      backgroundColor: theme.palette.green[600],
      color: "white",
    },
  },
  clearCheckboxes: {
    color: theme.palette.red[600],
    fontWeight: "bold",
    fontSize: "1rem",
    verticalAlign: "middle",
    position: "relative",
    top: "-0.35rem",
  },
  invertSelection: {
    color: theme.palette.sand[500],
    fontWeight: "bold",
    fontSize: "1rem",
    verticalAlign: "middle",
    position: "relative",
    top: "-0.35rem",
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

export default function GiftPreferenceForm() {
  const classes = useStyles();

  const { dbNpcs, dbItems, allItems, setAllItems, dbItemTypes, addItemModalOpen, setAddItemModalOpen, searchTerm, setSearchTerm, getIcon } = useContext(DatabaseContext)
  
  const [itemTypes, setItemTypes] = useState(dbItemTypes || [])
  const [formOptions, setFormOptions] = useState({
    npcs: [],
    items: [],
    preference: ''
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const alertDuration = 6000;

  const containerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if(containerRef) {
      setFormOptions({
        ...formOptions,
        npcs: dbNpcs,
        items: dbItems
      })
      setItemTypes(dbItemTypes)

      filterItemsOnLoad(dbItems);
    }
  //eslint-disable-next-line
  }, [dbNpcs, dbItems, dbItemTypes])

  useEffect(() => {
    if(!addItemModalOpen) {
      const search = searchRef.current.children[1].children[0].value

      API.getItems()
      .then(list => {
        let data = list.data.map(item => ({...item, isChecked: false, icon: getIcon(item.name)}))
        setAllItems(data)

        if(search !== undefined && search !== "") {
          setSearchTerm(search);
          
          data = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
          
        } else {
          setSearchTerm("")

        }

        const itemList = filterItemsOnLoad(data);

        setFormOptions({
          ...formOptions,
          items: itemList
        })
        
      })
    }
  //eslint-disable-next-line
  }, [addItemModalOpen])

  const filterItemsOnLoad = (items) => {
    if((itemTypes.length > 0 && !itemTypes[itemTypes.length - 1].isChecked)) {
      let selectedTypes = []

      itemTypes.forEach(type => {
        if(type.isChecked) selectedTypes.push(type.id)
      })

      return items.filter(item => selectedTypes.includes(item.TypeId))
    }

    return items;
  }

  const handleOnChange = e => {

    let opts = {...formOptions}

    if(e.target.name !== "preference" && e.target.value !== "all") {

      let list = formOptions[e.target.name];
      list.forEach(item => {
        if(item.id === parseInt(e.target.value)) {
          item.isChecked = e.target.checked
        }
      })

      opts[e.target.name] = list

      if(e.target.name === 'npcs' && !e.target.checked) {
        opts.npcs[opts.npcs.length - 1].isChecked = false
      }
      
    } else {
      if(e.target.name === 'preference') opts.preference = e.target.value
      if(e.target.value === 'all') opts.npcs.all = e.target.checked;

      if(e.target.value === "all" && e.target.checked) {
        opts.npcs = formOptions.npcs.map(npc => ({id: npc.id, name: npc.name, isChecked: true}))

      } else if(e.target.value === "all" && !e.target.checked) {
        opts.npcs = formOptions.npcs.map(npc => ({id: npc.id, name: npc.name, isChecked: false}))
      }

    }

    setFormOptions({
      ...opts
    })
    
  }

  const handleItemSearch = e => {
    const searchFor = e.target.value.toLowerCase()

    setSearchTerm(searchFor)
    // if there is no search term, the unfiltered list of items should be set
    // otherwise, filter the items
    setFormOptions({
      ...formOptions,
      items: searchFor === "" ? allItems : allItems.filter(item => item.name.toLowerCase().includes(searchFor))
    })
  }

  const handleItemTypeFilter = e => {
    const TypeId = e.target.value !== 'allTypes' && e.target.value !== 'otherTypes' ? parseInt(e.target.value) : e.target.value

    let selectedTypes = itemTypes;
    let selectedTypeIds = [];
    let visible = allItems;

    let allSelected = true;

    if(TypeId !== 'allTypes' && TypeId !== 'otherTypes') {
      selectedTypes.forEach(type => {
        if(type.id === TypeId) {
          type.isChecked = e.target.checked
        }
  
        if(type.isChecked) selectedTypeIds.push(type.id)
        if(!type.isChecked && type.id !== 'allTypes') allSelected = false;
      })

    } else if(TypeId === 'allTypes') {
      if(e.target.checked) {
        allSelected = true;

        selectedTypes.forEach(type => {
          type.isChecked = true;

          selectedTypeIds.push(type.id)
        })
      } else {
        selectedTypeIds = []
        selectedTypes.forEach(type => {
          type.isChecked = false;
        });
      }
    } else if(TypeId === 'otherTypes') {

      selectedTypes.forEach((type) => {
        if (type.id === "otherTypes") {
          type.isChecked = e.target.checked;
        }

        if(type.isChecked && type.id !== "otherTypes") selectedTypeIds.push(type.id)
        if (!type.isChecked && type.id !== "allTypes") allSelected = false;

      });

      if(e.target.checked) selectedTypeIds.push(null);
      
    }

    // console.log("selected TypeIds:", selectedTypeIds)
    selectedTypes[selectedTypes.length - 1].isChecked = allSelected;

    visible = allItems.filter( item => selectedTypeIds.includes(item.TypeId) )

    setFormOptions({
      ...formOptions,
      items: visible
    })
    
  }

  const handleFormSubmit = e => {
    const items = allItems.filter(item => item.isChecked)
    const npcs = formOptions.npcs.filter(npc => npc.isChecked && npc.name !== "All")

    if(items.length !== 0 && npcs.length !== 0 && formOptions.preference !== "") {
      for(var i = 0; i < npcs.length; i++) {
        const npcId = npcs[i].id;
        const npcName = npcs[i].name;
  
        for(var j = 0; j < items.length; j++) {
          const itemId = items[j].id;
          const itemName = items[j].name;
  
          API.upsertGift({
            VillagerId: npcId,
            ItemId: itemId,
            preference: formOptions.preference
          })
          .then(gifts => {
            // console.log(gifts.data);
            const pref = formOptions.preference === 'neutral' ? formOptions.preference : `${formOptions.preference}d`
            const alert = { open: true, severity: 'success',  message: `${itemName} assigned as a '${pref}' gift to ${npcName}`}
            enqueueSnackbar(alert.message, { variant: 'success', autoHideDuration: alertDuration, action: closeAlert })

          })
          .catch(err => {
            console.error(err);
            const alert = { open: true, severity: 'error', message: `${itemName} NOT assigned to ${npcName}. Error: ${err.message}` }
            // <AlertSnack open={alert.open} severity={alert.severity} message={alert.message} handleClose={() => handleAlertClose(npcId)} />
            enqueueSnackbar(alert.message, { variant: 'error', autoHideDuration: alertDuration, action: closeAlert })
          })
        }
  
      }

    } else {
      if(npcs.length === 0) {
        enqueueSnackbar('Please select at least one (1) NPC', { variant: 'error', autoHideDuration: alertDuration, action: closeAlert })
      }

      if(items.length === 0) {
        enqueueSnackbar('Please select at least one (1) item', { variant: 'error', autoHideDuration: alertDuration, action: closeAlert })
      }

      if(formOptions.preference === "") {
        enqueueSnackbar('Please select a preference', { variant: 'error', autoHideDuration: alertDuration, action: closeAlert })
      }
    }
  }

  const closeAlert = key => {
    return (
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar(key)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    )
  }

  const handleOpenModal = () => {
    setAddItemModalOpen(true)
  }

  const handleCloseModal = () => {
    setAddItemModalOpen(false)

  }

  const clearCheckboxes = (target) => {
    if(target === "items") {
      setSearchTerm("")
      const itemList = allItems.map(item => ({...item, isChecked: false}))
      setAllItems(itemList)
      setFormOptions({
        ...formOptions,
        items: itemList
      })
    } else if(target === "npcs") {
      setFormOptions({
        ...formOptions,
        npcs: formOptions.npcs.map(n => ({...n, isChecked: false}))
      })
    }
  }

  const invertSelection = (target) => {
    setFormOptions({
      ...formOptions,
      [target]: formOptions[target].map(n => (n.name === "All" ? {...n, isChecked: false} : {...n, isChecked: !n.isChecked}))
    })
  }

  return (
    <>
      <Container ref={containerRef} maxWidth="xl" className={classes.root}>
        <Grid container>
          {/* NPCs */}
          <Grid item lg={5} style={{ borderRight: "1px solid dodgerblue" }}>
            <Container>
              <Typography
                variant="h2"
                gutterBottom
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  NPCs
                  <Button
                    onClick={() => clearCheckboxes("npcs")}
                    className={classes.clearCheckboxes}
                  >
                    [Clear]
                  </Button>
                  <Button
                    onClick={() => invertSelection("npcs")}
                    className={classes.invertSelection}
                  >
                    [Invert Selection]
                  </Button>
                </span>
              </Typography>
              <FormGroup className={`${classes.list} text-col-2`}>
                {formOptions.npcs.map((npc) => (
                  <FormControlLabel
                    key={`${npc.id}-label`}
                    label={
                      npc.id !== "all" ? (
                        <>
                          <VillagerIcon name={npc.name} size={20} /> {npc.name}
                        </>
                      ) : (
                        "All"
                      )
                    }
                    control={
                      <CustomCheckbox
                        name="npcs"
                        key={`${npc.id}-checkbox`}
                        onChange={handleOnChange}
                        value={npc.id}
                        checked={npc.isChecked || false}
                      />
                    }
                  />
                ))}
              </FormGroup>
              <FormControl
                className={classes.formControl}
                style={{ width: "100%", marginTop: "2rem" }}
              >
                <InputLabel id="preference-label">Preference</InputLabel>
                <Select
                  labelId="preference-label"
                  id="preference"
                  name="preference"
                  value={formOptions.preference}
                  onChange={handleOnChange}
                  className={classes.preferenceSelect}
                >
                  <MenuItem value="love">Love</MenuItem>
                  <MenuItem value="like">Like</MenuItem>
                  <MenuItem value="neutral">Neutral</MenuItem>
                  <MenuItem value="dislike">Dislike</MenuItem>
                  <MenuItem value="hate">Hate</MenuItem>
                </Select>
              </FormControl>
              {window.innerWidth >= 1024 && (
                <Button
                  variant="contained"
                  className={classes.saveBtn}
                  onClick={(e) => handleFormSubmit(e)}
                >
                  <Typography variant="h2">Save</Typography>
                </Button>
              )}
            </Container>
          </Grid>
          {/* ITEMS */}
          <Grid container item lg={7}>
            <Container>
              <Typography variant="h2" gutterBottom>
                Items
                <Button
                  onClick={() => clearCheckboxes("items")}
                  className={classes.clearCheckboxes}
                >
                  [Clear]
                </Button>
                <TextField
                  ref={searchRef}
                  id="searchItems"
                  className={classes.searchItemsField}
                  label="Search"
                  type="search"
                  value={searchTerm}
                  onChange={handleItemSearch}
                  onBlur={handleItemSearch}
                />
                <Button
                  className={classes.addItemBtn}
                  onClick={handleOpenModal}
                >
                  Add Item
                </Button>
              </Typography>
              <FormGroup className={classes.list}>
                {itemTypes.map((type) => (
                  <FormControlLabel
                    key={`${type.id}-label`}
                    label={type.name}
                    control={
                      <Checkbox
                        name="types"
                        key={`${type.id}-checkbox`}
                        value={type.id}
                        onChange={handleItemTypeFilter}
                        checked={type.isChecked || false}
                      />
                    }
                  />
                ))}
              </FormGroup>
              <hr />
              <FormGroup className={classes.list}>
                {formOptions.items.map(
                  (item) =>
                    item.name !== "" && (
                      <FormControlLabel
                        key={`${item.id}-label`}
                        label={
                          <>
                            <ItemIcon
                              name={item.name}
                              size={20}
                              icon={
                                item.icon !== undefined
                                  ? item.icon.default
                                  : item.icon
                              }
                            />{" "}
                            {item.name}
                          </>
                        }
                        control={
                          <CustomCheckbox
                            name="items"
                            key={`${item.id}-checkbox`}
                            onChange={handleOnChange}
                            value={item.id}
                            checked={item.isChecked || false}
                          />
                        }
                      />
                    )
                )}
              </FormGroup>
            </Container>
          </Grid>
        </Grid>
        {window.innerWidth < 1024 && (
          <Container maxWidth="xl">
            <Button
              variant="contained"
              className={classes.saveBtn}
              onClick={(e) => handleFormSubmit(e)}
            >
              <Typography variant="h2">Save</Typography>
            </Button>
          </Container>
        )}
      </Container>
      <Modal
        className={classes.modal}
        open={addItemModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="Add Item Modal"
        aria-describedby="Add a new item to the database for assigning as a gift to NPCs"
      >
        <Container className={classes.modalBody}>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={handleCloseModal}
            style={{ position: "absolute", right: "1rem", top: "0.75rem" }}
          >
            <CloseIcon />
          </IconButton>
          <UpsertItemForm includeItemList={false} />
        </Container>
      </Modal>
    </>
  );
}
