const axios = require("axios")
//local url communication
const URL_PREFIX = "http://localhost:3030"
//When ready, the deployed site will use the following:
// const URL_PREFIX = ""

const API = {
  getVillagers: () => {
    return axios.get(`${URL_PREFIX}/api/villagers`)
  },
  getGifts: (preference) => {
    return axios.get(`${URL_PREFIX}/api/gifts/${preference}`)
  },
}

export default API
