// Imports: Dependencies
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
// Imports: Redux
import rootReducer from "./reducers";
// Middleware: Redux Persist Config
const persistConfig = {
  // persist key name
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  // State reconciler
  // stateReconciler: autoMergeLevel2,
  // Whitelist (Save Specific Reducers)
  whitelist: ["auth"],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: ["UI"],
};

const middlewares = [thunk, logger];
// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Redux: Store
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);
// Middleware: Redux Persist Persister
let persistor = persistStore(store);
// Exports
export { store, persistor };