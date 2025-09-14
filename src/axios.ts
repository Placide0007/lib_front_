import axios from 'axios';

const api = axios.create({
  baseURL: 'https://accomplished-reverence.up.railway.app/api'
});

export default api;
