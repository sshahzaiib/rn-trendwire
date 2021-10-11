import { ADD_TO_CART } from "../types";

const initialState = {
  selected: [],
};

let selected;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
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
