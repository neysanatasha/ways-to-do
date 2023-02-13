import axios from "axios";

export const API = axios.create({
  baseURL:
    "https://api.kontenbase.com/query/api/v1/38219cdf-0e83-4a16-a9a6-dadc3ce308d3",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorizaton"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorizaton"];
  }
};
