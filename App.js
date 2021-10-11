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
import navigationService from "./src/utils/navigationService";

import noConsole from "no-console";

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
  },
};

export default function App() {
  noConsole();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <Navigation
              ref={navigatorRef =>
                navigationService.setTopLevelNavigator(navigatorRef)
              }
            />
          </PaperProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
