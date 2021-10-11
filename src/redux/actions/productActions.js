import { CLEAR_PRODUCTS, SET_FAVORITE, SET_PRODUCTS } from "../types";

export const setProducts = data => ({
  type: SET_PRODUCTS,
  payload: data,
});

export const clearProducts = data => ({
  type: CLEAR_PRODUCTS,
  payload: data,
});

export const setFavorite = id => ({
  type: SET_FAVORITE,
  payload: id,
});
