import axios from "axios";

const BASE_URL = "http://localhost:4000/api/";

try {
  var TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser?.accessToken;
} catch (error) {
  console.log(error);
}

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
