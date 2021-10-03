/* eslint-disable react-native/split-platform-components */
import PropTypes from "prop-types";
import { ErrorMessage, Formik } from "formik";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../redux/actions/authActions";
import AppBar from "../../../components/appbar";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <AppBar title="Update Password" showMenu={false} />
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

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Required").label("Password").min(8),
  confirmPassword: Yup.string("Required")
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const auth = useSelector(state => state.auth);
  const user = auth.credentials?.user ?? {};
  const dispatch = useDispatch();
  const toggleShowPassword = useCallback(() => {
    setShowPassword(s => !s);
  }, []);
  const toggleConfirmShowPassword = useCallback(() => {
    setShowConfirmPassword(s => !s);
  }, []);
  const showToast = (text = "Profile Updated.") => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  };

  const _handleSubmit = values => {
    let data = { password: values.password, userId: user.id };
    dispatch(changePassword(data, showToast));
  };

  return (
    <Layout>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={_handleSubmit}
          validateOnMount={false}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={validationSchema}>
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
                label="Password"
                secureTextEntry={!showPassword}
                style={{ backgroundColor: "transparent" }}
                theme={{
                  colors: {
                    text: "#000",
                    placeholder: "#000",
                    primary: "#000",
                  },
                }}
                underlineColor="#000"
                selectionColor="#000"
                right={
                  <TextInput.Icon
                    onPress={toggleShowPassword}
                    color="#000"
                    name={showPassword ? "eye-off" : "eye"}
                  />
                }
                error={errors.password && touched.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              <Text style={styles.errorText}>
                <ErrorMessage name="password" />
              </Text>
              <TextInput
                label="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                style={{ backgroundColor: "transparent" }}
                theme={{
                  colors: {
                    text: "#000",
                    placeholder: "#000",
                    primary: "#000",
                  },
                }}
                underlineColor="#000"
                selectionColor="#000"
                right={
                  <TextInput.Icon
                    onPress={toggleConfirmShowPassword}
                    color="#000"
                    name={showConfirmPassword ? "eye-off" : "eye"}
                  />
                }
                error={errors.confirmPassword && touched.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              <Text style={styles.errorText}>
                <ErrorMessage name="confirmPassword" />
              </Text>
              <Button
                uppercase={false}
                mode="contained"
                style={styles.submitBtn}
                labelStyle={styles.BtnLabel}
                loading={auth.loading}
                disabled={auth.loading}
                onPress={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </Formik>
      </View>
    </Layout>
  );
};

ChangePassword.propTypes = {
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
  formContainer: {
    padding: wp(6),
  },
  submitBtn: {
    borderRadius: 40,
    backgroundColor: "#000",
    marginTop: hp(3),
  },
  BtnLabel: {
    fontSize: wp(5),
    color: "#fff",
  },
  errorText: {
    color: "red",
    textAlign: "right",
    marginTop: 2,
  },
});

export default ChangePassword;
