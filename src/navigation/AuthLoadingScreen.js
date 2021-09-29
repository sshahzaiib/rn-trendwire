import PropTypes from "prop-types";
import React, { useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AnimatedLoader from "react-native-animated-loader";
import { http } from "../utils/config";
const AuthLoadingScreen = props => {
  const user = useSelector(state => state.auth);
  useEffect(() => {
    _bootstrapAsync();
  }, [_bootstrapAsync]);

  const _bootstrapAsync = useCallback(async () => {
    const userToken = user.credentials?.tokens?.access?.token || null;
    let interceptor;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    let boot = setTimeout(() => {
      props.navigation.navigate(userToken && user.isLoggedIn ? "App" : "Auth");
    }, 2000);

    http.interceptors.request.use(
      config => {
        console.log(config);
        return config;
      },
      null,
      { synchronous: true },
    );

    if (userToken && user.isLoggedIn) {
      interceptor = http.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${userToken}`;
          console.log(config);
          return config;
        },
        null,
        { synchronous: true },
      );
    } else if (interceptor) {
      http.interceptors.request.eject(interceptor);
    }
    return () => clearTimeout(boot);
  }, [
    props.navigation,
    user.credentials?.tokens?.access?.token,
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
