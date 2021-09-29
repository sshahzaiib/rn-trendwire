import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from "./AuthLoadingScreen";
import Login from "../screens/user/login";
import Signup from "../screens/user/signup";
import Landing from "../screens/user/landing";
import TabNavigation from "./TabNavigation";

const AuthStack = createStackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signin: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "Landing",
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigation,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    },
  ),
);
