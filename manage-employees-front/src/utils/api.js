import axios from "axios";

const api = axios.create({
  //baseURL is required
  baseURL: "http://localhost:3000/",
});

export default api;


