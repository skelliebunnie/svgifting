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

  const [addItemModalOpen, setAddItemModalOpen] = useState(false)

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
    ...defaultAddItemFormOptions,
    ...defaultItemAvailability
  });

  useEffect(() => {
    API.getVillagers().then(list => {
      // set the form options list of NPCs and add a new key/value pair for isChecked, defaulting to false
      let npcList = list.data.map(npc => ({ ...npc, isChecked: false }));
      npcList.push({ id: 'all', name: 'All', isChecked: false })
      setNpcs(npcList)

    }).catch(err => console.error(err));

    API.getItemTypes().then(types => {
      let itemTypesList = types.data.map(type => ({ ...type, isChecked: true }))
      itemTypesList.push({ id: 'allTypes', name: 'All', isChecked: true })
      setItemTypes(itemTypesList);

    }).catch(err => console.error(err));

    getItems();
  
  // eslint-disable-next-line
  }, [])

  const getItems = () => {
    API.getItems()
      .then(list => {
        const data = list.data.map(item => ({...item, isChecked: false, icon: getIcon(item.name)}) )
        setItems(data)
        setAllItems(data)
      })
      .catch(err => console.error(err));
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
        setItems([...dbItems, {...results.data, icon: getIcon(results.data.name, true)}])

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

  const getIcon = (str, returnAsString) => {
    let icon_file = null;
    let filename =  '24px-'
    filename += toTitleCase(str)
    
    filename = filename.replace("'", "").replace(",", "");
    filename = filename.includes(" ") ? filename.split(" ").join("_") : filename
    filename += '.png'

    try {
      icon_file = require(`../assets/item_icons/${filename}`);
      filename = `../../assets/item_icons/${filename}`
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

  return (
    <DatabaseContext.Provider value={{dbNpcs, dbItems, setItems, getItems, allItems, setAllItems, dbItemTypes, addItemModalOpen, setAddItemModalOpen, addItemFormSubmit, alert, setAlert, handleAlertClose, addItemFormOptions, setAddItemFormOptions, defaultAddItemFormOptions, defaultItemAvailability, selected, setSelected, searchTerm, setSearchTerm, universalLoves, getIcon}}>
      {props.children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseContextProvider;