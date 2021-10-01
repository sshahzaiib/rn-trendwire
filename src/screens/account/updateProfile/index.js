/* eslint-disable react-native/split-platform-components */
import PropTypes from "prop-types";
import { ErrorMessage, Formik } from "formik";
import React, { useEffect } from "react";
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
import { Avatar, Button, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileData,
  updateProfileImage,
} from "../../../redux/actions/authActions";
import { CLEAR_ERRORS } from "../../../redux/types";
import AppBar from "../../../components/appbar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { launchImageLibrary } from "react-native-image-picker";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <AppBar title="Update Profile" showMenu={false} />
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

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  contactNo: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

const UpdateProfile = () => {
  const auth = useSelector(state => state.auth);
  const user = auth.credentials?.user ?? {};
  const dispatch = useDispatch();

  const showToast = () => {
    ToastAndroid.show("Profile Updated.", ToastAndroid.SHORT);
  };

  const _handleSubmit = values => {
    dispatch(updateProfileData(user.id, values, showToast));
  };

  useEffect(() => {
    return () =>
      dispatch({
        type: CLEAR_ERRORS,
      });
  }, [dispatch]);

  const launchGallery = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.5,
      },
      async response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode === "camera_unavailable") {
          return ToastAndroid.show("Camera not found!");
        }
        if (response.assets) {
          let file = response.assets[0];
          let formData = new FormData();
          formData.append("file", {
            name: file.fileName,
            type: file.type,
            uri: file.uri,
          });
          dispatch(updateProfileImage(user.id, formData));
        }
      },
    );
  };

  return (
    <Layout>
      <View style={styles.formContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            style={styles.profileImage}
            size={150}
            source={{ uri: user.profileImg }}
          />
          <Icon onPress={launchGallery} style={styles.editIcon} name="camera" />
        </View>
        <Formik
          initialValues={{
            name: user.name ?? "",
            contactNo: user.contactNo ?? "",
            address: user.address ?? "",
          }}
          onSubmit={_handleSubmit}
          validateOnMount={false}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={ProfileSchema}>
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
                    text: "#000",
                    placeholder: "#000",
                    primary: "#000",
                  },
                }}
                underlineColor="#000"
                selectionColor="#000"
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
                label="Contact No"
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
                error={errors.contactNo && touched.contactNo}
                onChangeText={handleChange("contactNo")}
                onBlur={handleBlur("contactNo")}
                value={values.contactNo}
              />
              {errors.contactNo && (
                <Text style={styles.errorText}>
                  <ErrorMessage name="contactNo" />
                </Text>
              )}
              <TextInput
                label="Address"
                multiline
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
                error={errors.address && touched.address}
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
              />
              {errors.address && (
                <Text style={styles.errorText}>
                  <ErrorMessage name="address" />
                </Text>
              )}
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

UpdateProfile.propTypes = {
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
  profileImage: {
    alignSelf: "center",
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
  editIcon: {
    position: "absolute",
    top: 110,
    right: 110,
    fontSize: 30,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
});

export default UpdateProfile;
