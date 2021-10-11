import { ADD_TO_CART } from "../types";

export const addToCart = data => ({
  type: ADD_TO_CART,
  payload: data,
});
