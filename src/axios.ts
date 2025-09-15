import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-libmanagement-production.up.railway.app/api'
});

export default api;
