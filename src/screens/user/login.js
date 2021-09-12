import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button, Subheading, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const { width: screenWidth, height: screenHeight } = Dimensions.get(
  "window"
);
const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image
        blurRadius={3}
        source={require("../../assets/images/pexels-kaitlyn-jade-2063102.jpg")}
        imageStyle={{ resizeMode: "contain" }}
        style={styles.image}
      />
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1, justifyContent: "space-between" }}>
          <ScrollView>{children}</ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const Login = ({ navigation }) => {
  return (
    <Layout>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Trend<Text style={{fontWeight: "bold"}}>wire</Text> </Text>

        <View style={styles.description}>
          <Text style={styles.text}>Sign In</Text>
        </View>
        <TextInput
          label="Email"
          style={{ backgroundColor: "transparent" }}
          theme={{
            colors: { text: "#fff", placeholder: "#fff", primary: "#fff" },
          }}
          underlineColor="#fff"
          selectionColor="white"
        />
        <TextInput
          label="Password"
          secureTextEntry
          style={{ backgroundColor: "transparent" }}
          theme={{
            colors: { text: "#fff", placeholder: "#fff", primary: "#fff" },
          }}
          underlineColor="#fff"
          selectionColor="white"
        />
        <Button
          uppercase={false}
          mode="contained"
          style={styles.loginBtn}
          labelStyle={styles.loginBtnLabel}>
          Login
        </Button>
        <Subheading
          onPress={() => navigation.navigate("Signup")}
          style={styles.subheading}>
          Don't have an account? Create Account
        </Subheading>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-around",
  },
  image: {
    width: screenWidth,
    height: screenHeight,
    position: "absolute",
    left: 0,
    top: 0,
  },
  textContainer: {
    padding: wp(6),
    marginTop: hp(30),
  },
  title: {
    fontSize: hp(9),
    color: "white",
    fontWeight: "300"
  },
  description: {
    marginTop: hp(3),
  },
  text: {
    color: "#fff",
    fontSize: wp(8),
    fontWeight: "300"
  },
  loginBtn: {
    borderRadius: 40,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(8),
  },
  loginBtnLabel: {
    fontSize: wp(5),
    color: "#000",
  },
  subheading: {
    color: "#fff",
    alignSelf: "center",
    paddingTop: 10,
  },
});

export default Login;
