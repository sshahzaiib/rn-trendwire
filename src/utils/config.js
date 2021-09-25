import axios from "axios";

export const config = {
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://trendwire.de.r.appspot.com/v1"
      : "localhost:3001/v1",
};

export const http = axios.create({
  baseURL: config.baseURL,
});
