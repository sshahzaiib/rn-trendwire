import axios from "axios";

export const config = {
  baseURL: "https://trendwire.de.r.appspot.com/v1",
};

export const http = axios.create({
  baseURL: config.baseURL,
});
