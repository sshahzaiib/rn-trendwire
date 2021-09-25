import { ErrorMessage, Formik } from "formik";
import React, { useCallback, useState } from "react";
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
import * as Yup from "yup";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
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

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = useCallback(() => {
    setShowPassword(s => !s);
  }, []);
  const _handleSubmit = (values, actions) => {
    console.log(values);
  };
  return (
    <Layout>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Trend<Text style={{ fontWeight: "bold" }}>wire</Text>
        </Text>
        <View style={styles.description}>
          <Text style={styles.text}>Sign In</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={_handleSubmit}
          validateOnMount={false}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={LoginSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                label="Email"
                style={{ backgroundColor: "transparent" }}
                theme={{
                  colors: {
                    text: "#fff",
                    placeholder: "#fff",
                    primary: "#fff",
                  },
                }}
                underlineColor="#fff"
                selectionColor="white"
                right={
                  <TextInput.Icon
                    onPress={toggleShowPassword}
                    color="#fff"
                    name="email"
                  />
                }
                error={errors.email && touched.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <Text style={styles.errorText}>
                <ErrorMessage name="email" />
              </Text>
              <TextInput
                label="Password"
                secureTextEntry={!showPassword}
                style={{ backgroundColor: "transparent" }}
                theme={{
                  colors: {
                    text: "#fff",
                    placeholder: "#fff",
                    primary: "#fff",
                  },
                }}
                underlineColor="#fff"
                selectionColor="white"
                right={
                  <TextInput.Icon
                    onPress={toggleShowPassword}
                    color="#fff"
                    name={showPassword ? "eye-off" : "eye"}
                  />
                }
                error={errors.password && touched.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Text style={styles.errorText}>
                <ErrorMessage name="email" />
              </Text>
              <Button
                uppercase={false}
                mode="contained"
                style={styles.loginBtn}
                labelStyle={styles.loginBtnLabel}
                onPress={handleSubmit}>
                Login
              </Button>
            </>
          )}
        </Formik>
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
    alignItems: "stretch",
    flex: 1,
    justifyContent: "space-around",
  },
  image: {
    height: screenHeight,
    left: 0,
    position: "absolute",
    top: 0,
    width: screenWidth,
  },
  textContainer: {
    padding: wp(6),
    marginTop: hp(28),
  },
  title: {
    fontSize: hp(9),
    color: "white",
    fontWeight: "300",
  },
  description: {
    marginTop: hp(3),
  },
  text: {
    color: "#fff",
    fontSize: wp(8),
    fontWeight: "300",
  },
  loginBtn: {
    borderRadius: 40,
    backgroundColor: "#fff",
    marginTop: hp(3),
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
  errorText: {
    color: "#fff",
    textAlign: "right",
    marginTop: 5,
  },
});

export default Login;
