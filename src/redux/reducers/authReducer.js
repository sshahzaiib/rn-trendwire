import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER_DATA,
  LOADING_USER_DATA,
  SET_AUTH_LOADING,
  SET_AUTH_ERRORS,
  CLEAR_ERRORS,
} from "../types";

const initialState = {
  isLoggedIn: false,
  credentials: {},
  loading: false,
  errors: {},
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_AUTH_LOADING:
      return Object.assign({}, state, {
        loading: payload,
      });
    case USER_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        credentials: {
          ...payload,
        },
        loading: false,
        errors: {},
      });
    case LOADING_USER_DATA:
      return Object.assign({}, state, {
        loading: true,
      });
    case SET_USER_DATA:
      return Object.assign({}, state, {
        isLoading: false,
        credentials: {
          ...state.credentials,
          user: {
            ...payload,
          },
        },
        loading: false,
        errors: false,
      });
    case SET_AUTH_ERRORS:
      return Object.assign({}, state, {
        errors: payload,
        loading: false,
      });
    case CLEAR_ERRORS:
      return Object.assign({}, state, {
        errors: {},
      });
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
