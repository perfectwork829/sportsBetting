import axios from "axios";

export default axios.create({
  baseURL: "http://10.0.2.2:8000/api",
  // baseURL: "https://stepsville.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
