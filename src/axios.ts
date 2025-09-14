import axios from "axios";

const api = axios.create({
    baseURL: 'https://placide-api.railway.app/api'
});

export default api;
