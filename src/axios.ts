import axios from "axios";

const api = axios.create({
    baseURL: 'https://skillful-nurturing.up.railway.app/api'
});

export default api;
