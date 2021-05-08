const axios = require("axios")
//local url communication
const URL_PREFIX = "http://localhost:3030"
//When ready, the deployed site will use the following:
// const URL_PREFIX = ""

const API = {
  // get
  getVillagers: () => {
    return axios.get(`${URL_PREFIX}/api/villagers`)
  },
  getItems: () => {
    return axios.get(`${URL_PREFIX}/api/items`)
  },
  getItemTypes: () => {
    return axios.get(`${URL_PREFIX}/api/itemtypes`)
  },
  getEquipment: () => {
    return axios.get(`${URL_PREFIX}/api/equipment`)
  },
  getAnimals: () => {
    return axios.get(`${URL_PREFIX}/api/animals`)
  },
  getLocations: () => {
    return axios.get(`${URL_PREFIX}/api/locations`)
  },
  getAllGifts: () => {
    return axios.get(`${URL_PREFIX}/api/gifts`)
  },
  getGiftsByPreference: (preference) => {
    return axios.get(`${URL_PREFIX}/api/gifts/${preference}`)
  },
  // post / put / upsert
  upsertItem: (data) => {
    return axios.post(`${URL_PREFIX}/api/item/upsert`, data);
  }
}

export default API
