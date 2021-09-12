
// Imports: Dependencies
import { combineReducers } from "redux";
// Imports: Reducers
import driverAuthReducer from "./authReducer";
import uiReducer from "./uiReducer";

// Redux: Root Reducer
const rootReducer = combineReducers({
  auth: driverAuthReducer,
  UI: uiReducer
});
// Exports
export default rootReducer;