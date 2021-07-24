const axios = require("axios")
//local url communication
const URL_PREFIX = "http://192.168.0.11:3030"

const API = {
  // get
  getNpcs: () => {
    return axios.get(`${URL_PREFIX}/api/npcs`)
  },
  getNpcById: (id) => {
    return axios.get(`${URL_PREFIX}/api/npcs/${id}`)
  },
  getNpcByName: (name) => {
    return axios.get(`${URL_PREFIX}/api/npcs/${name}`)
  },
  getItems: () => {
    return axios.get(`${URL_PREFIX}/api/items`)
  },
  getItemTypes: () => {
    return axios.get(`${URL_PREFIX}/api/categories`)
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
  getResidences: () => {
    return axios.get(`${URL_PREFIX}/api/residences`)
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
  upsertNpc: (data) => {
    return axios.post(`${URL_PREFIX}/api/npc/upsert`, data);
  },
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
