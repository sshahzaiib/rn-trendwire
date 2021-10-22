import PropTypes from "prop-types";
import { ErrorMessage, Formik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/actions/authActions";
import { CLEAR_ERRORS } from "../../redux/types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <Image
        blurRadius={5}
        source={require("../../assets/images/signup-background.jpg")}
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

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const SignupSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  name: Yup.string().required("Required"),
});

const Signup = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const toggleShowPassword = useCallback(() => {
    setShowPassword(s => !s);
  }, []);
  const _handleSubmit = (values, actions) => {
    dispatch(signup(values, navigation));
  };

  useEffect(() => {
    dispatch({
      type: CLEAR_ERRORS,
    });
    return () =>
      dispatch({
        type: CLEAR_ERRORS,
      });
  }, [dispatch]);
  return (
    <Layout>
      <View style={styles.textContainer}>
        <View style={styles.description}>
          <Text style={styles.text}>Register</Text>
        </View>
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
          }}
          onSubmit={_handleSubmit}
          validateOnMount={false}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={SignupSchema}>
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
                label="Name"
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
                error={errors.name && touched.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && (
                <Text style={styles.errorText}>
                  <ErrorMessage name="name" />
                </Text>
              )}
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
                error={errors.email && touched.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && (
                <Text style={styles.errorText}>
                  <ErrorMessage name="email" />
                </Text>
              )}
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
              {errors.password && (
                <Text style={styles.errorText}>
                  <ErrorMessage name="email" />
                </Text>
              )}
              {auth.errors && (
                <Text style={styles.errorText}>{auth.errors.message}</Text>
              )}
              <Button
                uppercase={false}
                mode="contained"
                style={styles.loginBtn}
                labelStyle={styles.loginBtnLabel}
                loading={auth.loading}
                disabled={auth.loading}
                onPress={handleSubmit}>
                Signup
              </Button>
            </>
          )}
        </Formik>
        <Subheading
          onPress={() => navigation.navigate("Signin")}
          style={styles.subheading}>
          Already have an account? Login instead
        </Subheading>
      </View>
    </Layout>
  );
};

Signup.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
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
  description: {
    marginTop: hp(3),
  },
  text: {
    color: "#fff",
    fontSize: wp(8),
    fontWeight: "300",
    marginBottom: hp(2),
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
    color: "red",
    textAlign: "right",
    marginTop: 2,
  },
});

export default Signup;
