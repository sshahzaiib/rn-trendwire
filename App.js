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

import noConsole from "@sshahzaiib/no-console";

import NetInfo from "@react-native-community/netinfo";
import { SET_NET_INFO } from "./src/redux/types";

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

  React.useEffect(() => {
    // Subscribe to network state change
    const unsubscribe = NetInfo.addEventListener(state => {
      store.dispatch({
        type: SET_NET_INFO,
        payload: state,
      });
    });

    // Unsubscribe
    return () => unsubscribe();
  });
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
