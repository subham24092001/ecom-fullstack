import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:8080", 
});

// Remove default token if any
delete authAPI.defaults.headers.common["Authorization"];

export default authAPI;