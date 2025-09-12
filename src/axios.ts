import axios from "axios";

const api = axios.create({
  baseURL: "https://laravel-api.onrender.com/api",
});

export default api;
