import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import AuthLoadingScreen from "./AuthLoadingScreen";
import Login from "../screens/user/login";
import Signup from "../screens/user/signup";
import Feed from "../screens/feed";
import Landing from "../screens/user/landing";

const AppStack = createDrawerNavigator({
  Feed: {
    screen: Feed,
  },
});
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
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);
