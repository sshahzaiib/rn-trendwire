import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { createBottomTabNavigator } from "react-navigation-tabs";
import Feed from "../screens/feed";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

export default createMaterialBottomTabNavigator(
  {
    Home: Feed,
    Settings: Feed,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "home-outline";
        } else if (routeName === "Settings") {
          iconName = "settings-outline";
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    barStyle: {
      backgroundColor: "#fff",
    },
    backBehavior: "history",
    initialRouteName: "Home",
  },
);
