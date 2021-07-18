import { createContext, useState, useEffect } from 'react'
import API from '../utils/API'

import seasonIcon_spring from '../assets/season_icons/24px-Spring.png'
import seasonIcon_summer from '../assets/season_icons/24px-Summer.png'
import seasonIcon_fall from '../assets/season_icons/24px-Fall.png'
import seasonIcon_winter from '../assets/season_icons/24px-Winter.png'
import seasonIcon_all from '../assets/season_icons/24px-All_Seasons_Icon.png'

export const DatabaseContext = createContext();

const DatabaseContextProvider = (props) => {

  const [dbNpcs, setNpcs] = useState([]);
  const [dbItems, setItems] = useState([]);
  const [allItems, setAllItems] = useState([])
  const [dbItemTypes, setItemTypes] = useState([]);

  const universalLoves = ['Golden Pumpkin', 'Magic Rock Candy', 'Pearl', 'Prismatic Shard', "Rabbit's Foot"]

  const [alert, setAlert] = useState({
    open: false,
    severity: 'info',
    message: 'A Snackbar Alert'
  });

  /**
   * ADDING ITEMS (page & modal)
   */
  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [addEventModalOpen, setAddEventModalOpen] = useState(false)

  const [selected, setSelected] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

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

  const defaultAddItemFormOptions = {
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

  const [addItemFormOptions, setAddItemFormOptions] = useState({
    ...defaultAddItemFormOptions
  });

  /**
   * ADDING EVENTS (form, which is displayed in a modal)
   */
  const [selectedSeason, setSelectedSeason] = useState({id: 1, name: 'Spring'})
  const [selectedDate, setSelectedDate] = useState(1)

  const [seasons, setSeasons] = useState([])
  const [events, setEvents] = useState([])

  const [dates, setDates] = useState([])
  const defaultNewEvent = {
    name: "",
    day: selectedDate,
    VillagerId: '',
    SeasonId: selectedSeason.id,
    type: 'other',
    startTime: '2021-01-01T09:00:00',
    endTime: '2021-01-01T14:00:00'
  }
  const [newEvent, setNewEvent] = useState(defaultNewEvent)

  useEffect(() => {
    if(!addEventModalOpen) {
      setNewEvent(defaultNewEvent)
    }
  //eslint-disable-next-line
  }, [addEventModalOpen])

  useEffect(() => {
    API.getVillagers().then(list => {
      // set the form options list of NPCs and add a new key/value pair for isChecked, defaulting to false
      let npcList = list.data.map(npc => ({ ...npc, isChecked: false }));
      npcList.push({ id: 'all', name: 'All', isChecked: false })
      setNpcs(npcList)

    }).catch(err => console.error(err));

    API.getItemTypes().then(types => {
      let itemTypesList = types.data.map(type => ({ ...type, isChecked: true }))
      itemTypesList.push({ id: 'otherTypes', name: 'Other', isChecked: true })
      itemTypesList.push({ id: 'allTypes', name: 'All', isChecked: true })
      setItemTypes(itemTypesList);

    }).catch(err => console.error(err));

    getItems();

    /**
     * CREATING NEW EVENTS
     */
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let datesArray = []
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
    }

    setDates(datesArray)

    API.getSeasons()
      .then(seasons => {
        setSeasons([...seasons.data])
      })
      .catch(err => {
        console.error(err);
      })
    
    getEvents(selectedSeason.id);
  // eslint-disable-next-line
  }, [selectedSeason.id])

  useEffect(() => {
    setNewEvent(n => ({...n, day: selectedDate}))
  }, [selectedDate])

  const getItems = () => {
    API.getItems()
      .then(list => {
        const data = list.data.map(item => ({...item, isChecked: false, icon: getIcon(item.name)}) )
        setItems(data)
        setAllItems(data)
      })
      .catch(err => console.error(err));
  }

  const getEvents = (SeasonId) => {
    API.getEventsBySeason(SeasonId)
      .then(results => {
        setEvents(results.data)
      })
      .catch(err => console.error(err))
  }

  const addItemFormSubmit = () => {

    let data = {...addItemFormOptions}
    const formKeys = Object.keys(data);

    for(var i = 0; i < formKeys.length; i++) {
      if(data[formKeys[i]] === 0 || data[formKeys[i]] === "") {
        data[formKeys[i]] = null
      }

      if(formKeys[i] === "size" && formKeys[i].length === 2) {
        data.size = addItemFormOptions.size.join("-");
      } else {
        data.size = null;
      }

      if(formKeys[i] === "time" && formKeys[i].length === 2) {
        data.size = addItemFormOptions.size.join("-");
      } else {
        data.size = null;
      }
    }

    // if the item is *not* an animal product OR the AnimalId.length === 0
    // just 'null' the AnimalId and insert/update
    if(addItemFormOptions.TypeId !== 4 || addItemFormOptions.AnimalId.length === 0) {
      data.AnimalId = null;
      // if it's not a *fish* either, go ahead and 'null' the weather as well
      // since forage items will have item availability but won't be weather dependent
      if(data.TypeId !== 14) data.weather = null;

      itemToDatabase(data)

    } else {
      // now here we're handling animal products that are actually assigned to an animal
      // if the length is 1, we can just move on
      if(addItemFormOptions.AnimalId.length === 1) {
        data.AnimalId = data.AnimalId[0];

        itemToDatabase(data)

      } else if(addItemFormOptions.AnimalId.length > 1) {
        // otherwise, we need to add an item for each animal selected (just how it works)
        for(var j = 0; j < addItemFormOptions.AnimalId.length; j++) {
          data.AnimalId = addItemFormOptions.AnimalId[j];

          itemToDatabase(data)
        }

      }
    }
  }

  const itemToDatabase = (data) => {
    API.upsertItem(data)
      .then(results => {
        setAlert({ open: true, message: addItemFormOptions.id !== undefined ? `${addItemFormOptions.name} updated successfully` : `${addItemFormOptions.name} saved successfully`, severity: 'success' });

        setAddItemFormOptions({...defaultAddItemFormOptions, ...defaultItemAvailability})
        setSelected(null)
        setAddItemModalOpen(false);
        setItems([...dbItems, {...results.data, icon: getIcon(results.data.name, 'item_icons', 'png', true)}])

      })
      .catch(err => {
        setAlert({ open: true, message: addItemFormOptions.id !== undefined ? `Error: ${addItemFormOptions.name} was not updated. Message: ${err.message}` : `Error: ${addItemFormOptions.name} was not saved. Message: ${err.message}`, severity: 'error' })
        console.error(err.message);
      });
  }

  const handleAlertClose = (event, reason) => {
    if(reason === 'clickaway') return;
    
    setAlert({...alert, open: false});
  }

  const toTitleCase = (str) => {
    if(str !== undefined) {
      str = str.split(' ');

      for(var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }

      return str.join(' ');
    }

    return 'Error Item'
  }

  const getIcon = (str, dir=null, ext='png', returnAsString) => {
    let icon_file = null;
    let filename =  dir === 'item_icons' || dir === null || dir === true ? '24px-' : '';
    filename += toTitleCase(str)
    
    filename = filename.replace("'", "").replace(",", "");
    filename = filename.includes(" ") ? filename.split(" ").join("_") : filename
    filename += ext === null ? '.png' : `.${ext}`

    if(dir === null || dir === true) { dir = 'item_icons' }
    if(returnAsString === null) { returnAsString = false }

    try {
      icon_file = require(`../assets/${dir}/${filename}`);
      filename = `../../assets/${dir}/${filename}`
    } catch (err) {
      icon_file = require('../assets/item_icons/Error_Item.png');
      filename = '../../assets/item_icons/Error_Item.png'
    }

    if(returnAsString) {
      return filename;
    } else {
      return icon_file;
    }
  }

  /**
   * CREATE / DELETE EVENTS
   */
   const addEvent = () => {
    const eventData = newEvent;
    if(eventData.VillagerId === '') eventData.VillagerId = null
    eventData.SeasonId = eventData.SeasonId !== selectedSeason.id ? eventData.SeasonId = selectedSeason.id : eventData.SeasonId
    eventData.startTime = typeof eventData.startTime === 'string' ? eventData.startTime.substring(11) : formatTime(eventData.startTime)
    eventData.endTime = typeof eventData.endTime === 'string' ? eventData.endTime.substring(11) : formatTime(eventData.endTime)

    // console.log("insert this", eventData)
    API.upsertEvent(eventData)
      .then((event) => {
        let season = seasons.filter(season => season.id === parseInt(eventData.SeasonId));
        setAlert({ open: true, severity: "success", message: `"${eventData.name}" added successfully to ${season[0].name} ${eventData.day}`})
        
        getEvents(selectedSeason.id);

        setNewEvent(defaultNewEvent)
        
        setAddEventModalOpen(false)
      })
      .catch(err => {
        setAlert({open: true, severity: 'error', message: `"${eventData.name}" NOT created.\nERROR: ${err.message}`});
      });
  }

  const formatTime = (dt) => {
    let [hour, minute, second] = dt.toLocaleTimeString("en-US", {hour12: false}).split(/:| /)
    return `${hour}:${minute}:${second}`
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

    getEvents(id)
  }

  const sortVillagerData = (data, sortBy = "Villager Name") => {
    if (sortBy === "Number of Loved Gifts") {
      // console.log("sorting by number of loved gifts", data);
      data.sort((a, b) => {
        // here, we're sorting largest to smallest (descending)
        return a.Items.length > b.Items.length ? -1 : 1;
      });
    } else if (sortBy === "Birthday <Season, Day>") {
      data.sort((a, b) => {
        if (a.birthdaySeasonId === b.birthdaySeasonId) {
          return a.birthdayDate > b.birthdayDate ? 1 : -1;
        } else {
          return a.birthdaySeasonId > b.birthdaySeasonId ? 1 : -1;
        }
      });
    } else {
      data.sort((a, b) => {
        // here, we're sorting "smallest" to "largest" (ascending)
        return a.name > b.name ? 1 : -1;
      });
    }

    if (sortBy === "Availability") {
      data.sort((a, b) => {
        // true first
        return a.available === b.available
          ? 0
          : a.available && a.name !== "Krobus"
            ? -1
            : 1;
        // false first
        // return (a.available === b.available)? 0: a.available ? 1 : -1;
      });
    }

    return data;
  };

  const sortItemData = (data, sortBy = "Gift Name") => {
    // console.log("sort items by:", sortBy)
    if (sortBy === "Number of NPCs") {
      // console.log("sorting by number of loved gifts", data);
      data.sort((a, b) => {
        // here, we're sorting largest to smallest (descending)
        return a.Villagers.length > b.Villagers.length ? -1 : 1;
      });
    } else if (sortBy === "Seasonal") {
      if(data[0].Seasons !== undefined) {
        data.sort((a, b) => {
          return a.Seasons[0].id > b.Seasons[0].id ? -1 : 1;
        });
      }
    } else {
      data.sort((a, b) => {
        // here, we're sorting "smallest" to "largest" (ascending)
        return a.name > b.name ? 1 : -1;
      });
    }

    if (sortBy === "Availability") {
      data.sort((a, b) => {
        // true first
        return a.available === b.available
          ? 0
          : a.available && a.name !== "Krobus"
            ? -1
            : 1;
        // false first
        // return (a.available === b.available)? 0: a.available ? 1 : -1;
      });
    }

    return data;
  };

  const getURL = (str) => {
    let filename = toTitleCase(str);

    filename = filename.replace("'", "%27").replace(",", "");
    filename = filename.includes(" ")
      ? filename.split(" ").join("_")
      : filename;

    return `https://stardewvalleywiki.com/${filename}`;
  };

  return (
    <DatabaseContext.Provider value={{ dbNpcs, dbItems, setItems, getItems, allItems, setAllItems, dbItemTypes, addItemModalOpen, setAddItemModalOpen, addItemFormSubmit, alert, setAlert, handleAlertClose, addItemFormOptions, setAddItemFormOptions, defaultAddItemFormOptions, defaultItemAvailability, selected, setSelected, searchTerm, setSearchTerm, universalLoves, getIcon, dates, seasons, events, selectedDate, setSelectedDate, selectedSeason, setSelectedSeason, handleSeasonChange, defaultNewEvent, newEvent, setNewEvent, addEvent, deleteEvent, addEventModalOpen, setAddEventModalOpen, sortVillagerData, sortItemData, getURL}}>
      {props.children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseContextProvider;