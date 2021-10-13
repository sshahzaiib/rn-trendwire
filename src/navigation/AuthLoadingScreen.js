import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnimatedLoader from "react-native-animated-loader";
import { getAuthenticatedUserData } from "../redux/actions/authActions";
const AuthLoadingScreen = props => {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const userToken = user.credentials?.tokens?.access?.token || null;
  useEffect(() => {
    _bootstrapAsync();
  }, [_bootstrapAsync]);

  const _bootstrapAsync = useCallback(async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    let boot = setTimeout(() => {
      let userId = user.credentials?.user?.id;
      props.navigation.navigate(userToken && user.isLoggedIn ? "App" : "Auth");
      userToken &&
        user.isLoggedIn &&
        dispatch(getAuthenticatedUserData(userId));
    }, 2000);
    return () => clearTimeout(boot);
  }, [
    dispatch,
    props.navigation,
    user.credentials?.user?.id,
    user.isLoggedIn,
    userToken,
  ]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,1)"
        source={require("../utils/loader-balls.json")}
        animationStyle={styles.lottie}
        speed={2}
      />
    </View>
  );
};

AuthLoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

export default AuthLoadingScreen;
