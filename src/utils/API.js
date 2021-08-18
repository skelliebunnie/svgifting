const axios = require("axios")

// const URL_PREFIX = "http://192.168.0.11:3030"
const URL_PREFIX = "https://evening-thicket-11567.herokuapp.com";

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
  upsertNpc: (data, token) => {
    return axios.post(`${URL_PREFIX}/api/npc/upsert`, data, {
      headers: {
        authorization: `Bearer: ${token}`,
      },
    });
  },
  upsertItem: (data, token) => {
    return axios.post(`${URL_PREFIX}/api/item/upsert`, data, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  upsertGift: (data, token) => {
    return axios.post(`${URL_PREFIX}/api/gift/upsert`, data, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  postEvent: (data, token) => {
    return axios.post(`${URL_PREFIX}/api/event`, data, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  upsertEvent: (data, token) => {
    return axios.post(`${URL_PREFIX}/api/event/upsert`, data, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  // delete
  deleteEvent: (id, token) => {
    return axios.delete(`${URL_PREFIX}/api/event/${id}`, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
};

export default API
