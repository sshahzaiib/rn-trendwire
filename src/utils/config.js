/* eslint-disable react-native/split-platform-components */
import axios from "axios";
import { configure } from "axios-hooks";
import { ToastAndroid } from "react-native";
import { store } from "../redux";
import { SET_AUTH_ERRORS } from "../redux/types";

const showToast = message => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};

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

    if (store.getState().UI.netInfo.isConnected) {
      return reqConfig;
    } else {
      store.dispatch({
        type: SET_AUTH_ERRORS,
        payload: {},
      });
      showToast("No internet!");
      throw new axios.Cancel("Internet diconnected!");
    }
  },
  null,
  { synchronous: true },
);

export const http = instance;
