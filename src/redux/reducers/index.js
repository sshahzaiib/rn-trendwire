// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import driverAuthReducer from "./authReducer";
import cartReducer from "./cartReducer";
import categoriesReducer from "./categoriesReducer";
import productsReducer from "./productsReducer";
import uiReducer from "./uiReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: driverAuthReducer,
  UI: uiReducer,
  categories: categoriesReducer,
  products: productsReducer,
  cart: cartReducer,
});
// Exports
export default rootReducer;
