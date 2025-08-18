import axios from "axios";

const API = axios.create({
  baseURL: "https://ecom-fullstack-rx3f.onrender.com/api",
  // baseURL: "http://localhost:8080/api",
});
delete API.defaults.headers.common["Authorization"];
export default API;
