const axios = require("axios")
//local url communication
const URL_PREFIX = "http://192.168.0.11:3030"

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
  upsertEvent: (data) => {
    return axios.post(`${URL_PREFIX}/api/event/upsert`, data);
  },
  // delete
  deleteEvent: (id) => {
    return axios.delete(`${URL_PREFIX}/api/event/${id}`);
  }
}

export default API
