import {
  SET_LOADING,
  SET_ERRORS,
  UNSET_LOADING,
  CLEAR_ERRORS,
  SET_NET_INFO,
} from "../types";
import { config } from "../../utils/config.js";

const initialState = {
  loading: false,
  errors: null,
  defaults: {
    baseURL: config.baseURL,
  },
  netInfo: {
    isConnected: true,
    isInternetReachable: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: true,
      });
    case UNSET_LOADING:
      return Object.assign({}, state, {
        loading: false,
      });
    case SET_ERRORS:
      return Object.assign({}, state, {
        loading: false,
        errors: action.payload,
      });
    case CLEAR_ERRORS:
      return Object.assign({}, initialState, {
        errors: null,
      });
    case SET_NET_INFO:
      return Object.assign({}, initialState, {
        netInfo: action.payload,
      });
    default:
      return state;
  }
};
