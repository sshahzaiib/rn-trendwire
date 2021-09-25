import React, { useEffect } from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import AuthLoadingScreen from "./AuthLoadingScreen";
import Login from "../screens/user/login";
import Signup from "../screens/user/signup";
import Feed from "../screens/feed";
import Landing from "../screens/user/landing";
import { useSelector } from "react-redux";

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
  },
);
const NavigationContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    },
  ),
);

const Navigation = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  useEffect(() => {}, [isLoggedIn]);
  return <NavigationContainer />;
};

export default Navigation;
