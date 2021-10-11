import { uniqBy } from "lodash";
import { CLEAR_PRODUCTS, SET_PRODUCTS } from "../types";

const initialState = {
  data: {
    results: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
    limit: 10,
    presentItems: 0,
  },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PRODUCTS: {
      let products = uniqBy([...state.data.results, ...payload.results], "id");
      return Object.assign({}, state, {
        data: {
          ...payload,
          results: products,
          presentItems: products.length,
        },
      });
    }
    case CLEAR_PRODUCTS:
      return Object.assign({}, state, {
        data: {
          ...initialState.data,
        },
      });
    default:
      return state;
  }
};
