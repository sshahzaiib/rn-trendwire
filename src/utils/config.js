import axios from "axios";
import { configure } from "axios-hooks";
import { store } from "../redux";

export const config = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://10.0.2.2:3001/v1"
      : "https://trendwire.de.r.appspot.com/v1",
  // baseURL: "https://trendwire.de.r.appspot.com/v1",
};
const instance = axios.create({
  baseURL: config.baseURL,
});

configure({
  axios: instance,
  cache: false,
});

export const interceptor = instance.interceptors.request.use(
  reqConfig => {
    reqConfig.headers.Authorization = `Bearer ${
      store.getState().auth.credentials?.tokens?.access?.token
    }`;
    return reqConfig;
  },
  null,
  { synchronous: true },
);

export const http = instance;
