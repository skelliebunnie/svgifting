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
  getSeasons: () => {
    return axios.get(`${URL_PREFIX}/api/seasons`)
  },
  getEvents: () => {
    return axios.get(`${URL_PREFIX}/api/events`)
  },
  getEventsBySeason: (season) => {
    return axios.get(`${URL_PREFIX}/api/events/${season}`)
  },
  // post / put / upsert
  upsertItem: (data) => {
    return axios.post(`${URL_PREFIX}/api/item/upsert`, data);
  },
  upsertGift: (data) => {
    return axios.post(`${URL_PREFIX}/api/gift/upsert`, data);
  },
  postEvent: (data) => {
    return axios.post(`${URL_PREFIX}/api/event`, data);
  },
  // delete
  deleteEvent: (id) => {
    return axios.delete(`${URL_PREFIX}/api/event/${id}`);
  }
}

export default API
