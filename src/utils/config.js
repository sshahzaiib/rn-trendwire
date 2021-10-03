import axios from "axios";

export const config = {
  baseURL: "http://10.0.2.2:3001/v1",
  // baseURL: "https://trendwire.de.r.appspot.com/v1",
};

export const http = axios.create({
  baseURL: config.baseURL,
});
