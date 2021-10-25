/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
// import MTIcon from "react-native-vector-icon/MaterialCommunityIcons";
import Home from "../screens/feed";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Account from "../screens/account";
import { createStackNavigator } from "react-navigation-stack";
import UpdateProfile from "../screens/account/updateProfile";
import ChangePassword from "../screens/account/changePassword";
import { store } from "../redux";
import FWIcon from "react-native-vector-icons/SimpleLineIcons";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";
import { useCartItemsCount } from "../redux/selectors";
import ProductDetails from "../screens/productDetails";
import ScanScreen from "../screens/feed/ScanQR";
import Products from "../screens/products";
import CreateProduct from "../screens/createProduct";
import EditProduct from "../screens/products/editProduct";
import Orders from "../screens/orders";
import OrderDetails from "../screens/orders/orderDetails";
// import StoriesScreen from "../screens/stories";
import CreateOrder from "../screens/createOrder";

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
    Home: {
      screen: Home,
      navigationOptions,
    },
    ScanQR: {
      screen: ScanScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: "Home",
  },
);

const ProductStack = createStackNavigator(
  {
    Main: {
      screen: Products,
      navigationOptions,
    },
    ProductDetails: {
      screen: ProductDetails,
      navigationOptions,
    },
    CreateProduct: {
      screen: CreateProduct,
      navigationOptions,
    },
    EditProduct: {
      screen: EditProduct,
      navigationOptions,
    },
  },
  {
    initialRouteName: "Main",
  },
);
const OrderStack = createStackNavigator(
  {
    Main: {
      screen: Orders,
      navigationOptions,
    },
    OrderDetails: {
      screen: OrderDetails,
      navigationOptions,
    },
    CreateOrder: {
      screen: CreateOrder,
      navigationOptions,
    },
  },
  {
    initialRouteName: "Main",
  },
);

export default createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Products: {
      screen: ProductStack,
    },
    ManageOrders: {
      screen: OrderStack,
    },
    // Stories: {
    //   screen: StoriesScreen,
    // },
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
        } else if (routeName === "Products") {
          iconName = focused
            ? "ios-list-circle-sharp"
            : "ios-list-circle-outline";
        } else if (routeName === "ManageOrders") {
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
