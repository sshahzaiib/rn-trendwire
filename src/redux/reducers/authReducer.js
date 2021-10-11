import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_USER_DATA,
  LOADING_USER_DATA,
  SET_AUTH_LOADING,
  SET_AUTH_ERRORS,
  CLEAR_ERRORS,
  SET_FAVORITE,
  ADD_TO_CART,
} from "../types";

const initialState = {
  isLoggedIn: false,
  credentials: {
    user: {
      favorites: [],
      cart: [],
    },
  },
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
        loading: false,
      });
    case SET_FAVORITE: {
      return Object.assign({}, state, {
        credentials: {
          ...state.credentials,
          user: {
            ...state.credentials.user,
            favorites: [...payload],
          },
        },
      });
    }
    case ADD_TO_CART: {
      return Object.assign({}, state, {
        credentials: {
          ...state.credentials,
          user: {
            ...state.credentials.user,
            cart: [...payload],
          },
        },
      });
    }
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
