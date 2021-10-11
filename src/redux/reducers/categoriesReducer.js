import { SET_CATEGORIES, SET_SELECTED_CATEGORIES } from "../types";

const initialState = {
  data: {
    results: [],
  },
  selected: [],
};

let selected;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return Object.assign({}, state, {
        data: payload,
        results: [...state.data.results, ...payload.results],
      });
    case SET_SELECTED_CATEGORIES:
      selected = [...state.selected];
      if (selected.includes(payload)) {
        selected.splice(selected.indexOf(payload), 1);
      } else {
        selected = [...selected, payload];
      }
      return Object.assign({}, state, {
        selected: [...selected],
      });
    default:
      return state;
  }
};
