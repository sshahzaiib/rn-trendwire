import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AnimatedLoader from "react-native-animated-loader";
import { http } from "../utils/config";
import { getAuthenticatedUserData } from "../redux/actions/authActions";
const AuthLoadingScreen = props => {
  const user = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    _bootstrapAsync();
  }, [_bootstrapAsync]);

  const _bootstrapAsync = useCallback(async () => {
    const userToken = user.credentials?.tokens?.access?.token || null;
    let interceptor;

    if (userToken && user.isLoggedIn) {
      interceptor = http.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${userToken}`;
          return config;
        },
        null,
        { synchronous: true },
      );
    } else if (interceptor) {
      http.interceptors.request.eject(interceptor);
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    let boot = setTimeout(() => {
      let userId = user.credentials?.user?.id;
      userToken &&
        user.isLoggedIn &&
        dispatch(getAuthenticatedUserData(userId));
      props.navigation.navigate(userToken && user.isLoggedIn ? "App" : "Auth");
    }, 2000);
    return () => clearTimeout(boot);
  }, [
    dispatch,
    props.navigation,
    user.credentials?.tokens?.access?.token,
    user.credentials?.user?.id,
    user.isLoggedIn,
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
