import { uniqBy } from "lodash";
import { CLEAR_PRODUCTS, SET_FAVORITE, SET_PRODUCTS } from "../types";

const initialState = {
  data: {
    results: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
    limit: 10,
    presentItems: 0,
  },
  favorites: [],
};

let favorites;
let products;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCTS:
      products = uniqBy([...state.data.results, ...payload.results], "id");
      return Object.assign({}, state, {
        data: {
          ...payload,
          results: products,
          presentItems: products.length,
        },
      });
    case CLEAR_PRODUCTS:
      return Object.assign({}, state, {
        data: {
          ...initialState.data,
        },
      });
    case SET_FAVORITE:
      favorites = [...state.favorites];
      if (favorites.includes(payload)) {
        favorites.splice(favorites.indexOf(payload), 1);
      } else {
        favorites = [...favorites, payload];
      }
      return Object.assign({}, state, {
        favorites: [...favorites],
      });
    default:
      return state;
  }
};
