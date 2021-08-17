const axios = require("axios")

// const URL_PREFIX = "http://192.168.0.11:3030"
const URL_PREFIX = "https://svgifting-backend.vercel.app/"

const API = {
  // user login & auth
  login: (userData) => {
    return axios.post(`${URL_PREFIX}/login`, userData);
  },
  getAuthToken: (token) => {
    return axios.get(`${URL_PREFIX}/auth`, {
      headers: {
        authorization: `Bearer: ${token}`,
      },
    });
  },
  // get
  getNpcs: () => {
    return axios.get(`${URL_PREFIX}/api/npcs`);
  },
  getNpcById: (id) => {
    return axios.get(`${URL_PREFIX}/api/npcs/${id}`);
  },
  getNpcByName: (name) => {
    return axios.get(`${URL_PREFIX}/api/npcs/${name}`);
  },
  getGiftsByNpcId: (npcId) => {
    return axios.get(`${URL_PREFIX}/api/npc/${npcId}/gifts`);
  },
  getGiftsByNpcIdAndPreference: (npcId, preference) => {
    return axios.get(`${URL_PREFIX}/api/npc/${npcId}/gifts/${preference}`);
  },
  getItems: () => {
    return axios.get(`${URL_PREFIX}/api/items`);
  },
  getItemCategories: () => {
    return axios.get(`${URL_PREFIX}/api/categories`);
  },
  getItemAvailability: (itemId) => {
    return axios.get(`${URL_PREFIX}/api/itemavailability/${itemId}`);
  },
  getEquipment: () => {
    return axios.get(`${URL_PREFIX}/api/equipment`);
  },
  getAnimals: () => {
    return axios.get(`${URL_PREFIX}/api/animals`);
  },
  getLocations: () => {
    return axios.get(`${URL_PREFIX}/api/locations`);
  },
  getResidences: () => {
    return axios.get(`${URL_PREFIX}/api/residences`);
  },
  getAllGifts: () => {
    return axios.get(`${URL_PREFIX}/api/gifts`);
  },
  getGiftsByPreference: (preference) => {
    return axios.get(`${URL_PREFIX}/api/gifts/${preference}`);
  },
  getSeasons: () => {
    return axios.get(`${URL_PREFIX}/api/seasons`);
  },
  getEvents: () => {
    return axios.get(`${URL_PREFIX}/api/events`);
  },
  getEventsBySeason: (season) => {
    return axios.get(`${URL_PREFIX}/api/events/${season}`);
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
  },
};

export default API
