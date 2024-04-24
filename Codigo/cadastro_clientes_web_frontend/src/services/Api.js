import axios from "axios";

const Api = axios.create({
  baseURL: "https://localhost:7268/api",
});

export default Api;