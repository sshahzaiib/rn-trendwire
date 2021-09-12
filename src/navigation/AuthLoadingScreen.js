import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AnimatedLoader from "react-native-animated-loader";

const AuthLoadingScreen = (props) => {
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const userToken = user.credentials.token;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    let boot = setTimeout(() => {
      props.navigation.navigate(userToken && user.isLoggedIn ? "App" : "Auth");
    }, 1000);

    return () => clearTimeout(boot);
  };

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
const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});

export default AuthLoadingScreen;
