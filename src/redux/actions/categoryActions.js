import { SET_CATEGORIES, SET_SELECTED_CATEGORIES } from "../types";

export const setCategories = data => ({
  type: SET_CATEGORIES,
  payload: data,
});

export const setSelected = id => ({
  type: SET_SELECTED_CATEGORIES,
  payload: id,
});
