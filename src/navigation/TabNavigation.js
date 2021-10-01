import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MTIcon from "react-native-vector-icon/MaterialCommunityIcons";
import Feed from "../screens/feed";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Account from "../screens/account";
import { createStackNavigator } from "react-navigation-stack";
import UpdateProfile from "../screens/account/updateProfile";

const navigationOptions = {
  headerShown: false,
};
const AccountStack = createStackNavigator(
  {
    Main: {
      screen: Account,
      navigationOptions,
    },
    UpdateProfile: {
      screen: UpdateProfile,
      navigationOptions,
    },
  },
  {
    initialRouteName: "Main",
  },
);

export default createMaterialBottomTabNavigator(
  {
    Home: Feed,
    Account: AccountStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        // TODO: Update icon upon focus
        if (routeName === "Home") {
          iconName = focused ? "ios-home-sharp" : "ios-home-outline";
        } else if (routeName === "Account") {
          iconName = focused
            ? "ios-person-circle-sharp"
            : "ios-person-circle-outline";
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    barStyle: {
      backgroundColor: "#fff",
    },
    backBehavior: "order",
    initialRouteName: "Account",
  },
);
