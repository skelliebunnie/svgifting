import { createContext, useState, useEffect } from 'react'
import API from '../utils/API'

export const DatabaseContext = createContext();

const DatabaseContextProvider = (props) => {

  const [npcs, setNpcs] = useState([]);
  const [items, setItems] = useState([]);
  const [itemTypes, setItemTypes] = useState([]);

  useEffect(() => {
    API.getVillagers().then(list => {
      // set the form options list of NPCs and add a new key/value pair for isChecked, defaulting to false
      let npcList = list.data.map(npc => ({ ...npc, isChecked: false }));
      npcList.push({ id: 'all', name: 'All', isChecked: false })
      setNpcs(npcList)

    }).catch(err => console.error(err));

    API.getItems().then(list => {
      // set the form options list of NPCs and add a new key/value pair for isChecked, defaulting to false
      const itemList = list.data.map(item => ({ ...item, isChecked: false }));
      setItems(itemList);

    }).catch(err => console.error(err));

    API.getItemTypes().then(types => {
      let itemTypesList = types.data.map(type => ({ ...type, isChecked: true }))
      itemTypesList.push({ id: 'allTypes', name: 'All', isChecked: true })
      setItemTypes(itemTypesList);

    }).catch(err => console.error(err));
  }, [])

  return (
    <DatabaseContext.Provider value={{npcs, items, itemTypes}}>
      {props.children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseContextProvider;