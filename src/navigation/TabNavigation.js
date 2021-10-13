/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MTIcon from "react-native-vector-icon/MaterialCommunityIcons";
import Feed from "../screens/feed";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Account from "../screens/account";
import { createStackNavigator } from "react-navigation-stack";
import UpdateProfile from "../screens/account/updateProfile";
import ChangePassword from "../screens/account/changePassword";
import { store } from "../redux";
import Favorites from "../screens/favorites";
import Cart from "../screens/cart";
import FWIcon from "react-native-vector-icons/SimpleLineIcons";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { useCartItemsCount } from "../redux/selectors";
import ProductDetails from "../screens/productDetails";
import Search from "../screens/feed/search";
import SearchResults from "../screens/feed/search/searchResults";

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
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions,
    },
  },
  {
    initialRouteName: "Main",
  },
);

const HomeStack = createStackNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions,
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions,
    },
    Search: {
      screen: Search,
      navigationOptions,
    },
    SearchResults: {
      screen: SearchResults,
      navigationOptions,
    },
  },
  {
    initialRouteName: "Feed",
  },
);

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Favorites: {
      screen: Favorites,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          if (store.getState().auth.isLoggedIn) {
            navigation.navigate("Favorites");
          }
        },
      },
    },
    Cart: {
      screen: Cart,
    },
    Account: {
      screen: AccountStack,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) => {
          if (store.getState().auth.isLoggedIn) {
            navigation.navigate("Account");
          } else {
            navigation.navigate("Signin");
          }
        },
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const count = useCartItemsCount();
        const auth = useSelector(state => state.auth);
        const { routeName } = navigation.state;

        let iconName = "ios-person-circle-sharp";
        if (routeName === "Home") {
          iconName = focused ? "ios-home-sharp" : "ios-home-outline";
        } else if (routeName === "Account") {
          iconName = focused
            ? "ios-person-circle-sharp"
            : "ios-person-circle-outline";
          return (
            <IconWithBadge
              badgeCount={
                auth.isLoggedIn && !auth.credentials?.user?.isEmailVerified
                  ? 1
                  : 0
              }>
              <Ionicons name={iconName} size={25} color={tintColor} />
            </IconWithBadge>
          );
        } else if (routeName === "Favorites") {
          iconName = focused ? "heart" : "heart-outline";
        } else if (routeName === "Cart") {
          return (
            <IconWithBadge badgeCount={count}>
              <FWIcon color={tintColor} name="handbag" size={20} />
            </IconWithBadge>
          );
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    barStyle: {
      backgroundColor: "#fff",
    },
    backBehavior: "order",
    initialRouteName: "Home",
    shifting: true,
  },
);

const IconWithBadge = ({ badgeCount, children }) => {
  return (
    <View style={{ width: 24, height: 24 }}>
      {children}
      {badgeCount > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -5,
            backgroundColor: "red",
            borderRadius: 6,
            width: 14,
            height: 14,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={{ color: "white", fontSize: 11, fontWeight: "bold" }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
};

IconWithBadge.propTypes = {
  badgeCount: PropTypes.number,
  children: PropTypes.node,
};
