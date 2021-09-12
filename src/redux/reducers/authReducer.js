
import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER_DATA,
  LOADING_USER_DATA
} from "../types";

const initialState = {
  isLoggedIn: false,
  credentials: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: true,
        credentials: {
          token: action.payload.token
        }
      });
    case USER_LOGOUT:
      return initialState;
    case LOADING_USER_DATA:
      return Object.assign({}, state, {
        loading: true
      });
    case SET_USER_DATA:
      return Object.assign({}, state, {
        credentials: {
          ...state.credentials,
          ...action.payload
        },
        loading: false
      });
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}