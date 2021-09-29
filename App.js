import * as React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import axios from "axios";

// Store and persist store
import { store, persistor } from "./src/redux";
// Redux Provider for React
import { Provider } from "react-redux";

// Redux Persist Gate for React
import { PersistGate } from "redux-persist/lib/integration/react";

import Navigation from "./src/navigation";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <Navigation />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
