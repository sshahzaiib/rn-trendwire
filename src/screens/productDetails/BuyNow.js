import useAxios from "axios-hooks";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import MaskInput from "react-native-mask-input";
import { Button, Headline, Subheading } from "react-native-paper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import * as Yup from "yup";
import AppBar from "../../components/appbar";
import CustomTextField from "../../components/CustomTextField";
import { useUserDataSelector, useUserIdSelector } from "../../redux/selectors";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { goBack } from "../../utils/navigationService";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <AppBar title="Create Order" showMenu={false} />
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
  name: Yup.string(),
  email: Yup.string(),
  contactNo: Yup.string(),
  quantity: Yup.number().integer().min(1),
});

const BuyNow = ({ navigation }) => {
  const productId = navigation.getParam("productId");
  const userId = useUserIdSelector();
  const user = useUserDataSelector();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [{ data: products, loading: loadingProduct }] = useAxios({
    url: "/product/query",
    params: {
      _id: productId,
    },
  });

  const product = products?.results[0] ?? {};
  const discountedPrice = (
    product?.price -
    product?.price * (product?.discount / 100)
  ).toFixed(0);

  const [{ loading: _loading }, createOrder] = useAxios(
    {
      url: "/order/place",
      method: "POST",
    },
    {
      manual: true,
    },
  );

  const _handleSubmit = async v => {
    try {
      await createOrder({
        data: Object.assign(v, {
          vendor: product.creator,
          user: userId,
          product: product.id,
          price: discountedPrice * v.quantity,
        }),
      });
      setOrderPlaced(true);
      showToast();
    } catch (err) {
      console.log(err);
    }
  };

  const showToast = message => {
    ToastAndroid.show(message ?? "Order Confirmed", ToastAndroid.SHORT);
  };

  return (
    <Layout>
      {orderPlaced ? (
        <View style={styles.orderPlacedContainer}>
          <MCIcon name="check-circle" size={120} color="green" />
          <Headline>Thank your for your order</Headline>
          <Subheading>
            We&apos;ll reach out to your before processing your order
          </Subheading>
          <Button
            mode="contained"
            style={{ marginTop: 12 }}
            onPress={() => goBack()}>
            Continue Shopping
          </Button>
        </View>
      ) : (
        <View style={styles.formContainer}>
          {product && !loadingProduct && (
            <>
              <Tile title="Product Title" description={product.title} />
              <Tile
                title="Product Price"
                description={"Rs. " + product.price}
              />
              <Tile
                title="Product Price"
                description={product.discount + "%"}
              />
              <Tile
                title="Discounted Price"
                description={"Rs. " + discountedPrice}
              />
            </>
          )}
          <Formik
            initialValues={{
              name: user.name ?? "",
              contactNo: user.contactNo ?? "",
              email: user.email ?? "",
              address: user.address ?? "",
              quantity: 1,
            }}
            onSubmit={_handleSubmit}
            validateOnMount={false}
            validateOnBlur={false}
            validateOnChange={false}
            enableReinitialize
            validationSchema={validationSchema}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <>
                <CustomTextField
                  label="Name"
                  error={!!errors.name && touched.name}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <CustomTextField
                  label="Contact No"
                  error={!!errors.contactNo && touched.contactNo}
                  onChangeText={handleChange("contactNo")}
                  onBlur={handleBlur("contactNo")}
                  value={values.contactNo}
                  render={props => (
                    <MaskInput
                      {...props}
                      onChangeText={(_, unmasked) =>
                        setFieldValue("contactNo", unmasked)
                      }
                      mask={[
                        "(",
                        /\d/, // that's because I want it to be a digit (0-9)
                        /\d/,
                        ")",
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                    />
                  )}
                />
                <CustomTextField
                  label="Email"
                  keyboardType="email-address"
                  error={!!errors.email && touched.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                />
                <CustomTextField
                  label="Quantity"
                  keyboardType="number-pad"
                  error={!!errors.quantity && touched.quantity}
                  onChangeText={handleChange("quantity")}
                  onBlur={handleBlur("quantity")}
                  value={values.quantity.toString()}
                />
                <Tile
                  title="Grand Total"
                  description={"Rs. " + values.quantity * discountedPrice}
                />

                <Button
                  uppercase={false}
                  mode="contained"
                  style={styles.submitBtn}
                  labelStyle={styles.BtnLabel}
                  loading={_loading}
                  onPress={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </Formik>
        </View>
      )}
    </Layout>
  );
};

BuyNow.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  orderPlacedContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    height: hp(85),
  },
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
});

export default BuyNow;

const Tile = ({ title, description }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 12,
    }}>
    <Subheading style={{ width: "35%" }}>{title}</Subheading>
    <Subheading style={{ width: "65%", textTransform: "capitalize" }}>
      {description}
    </Subheading>
  </View>
);

Tile.propTypes = {
  description: PropTypes.any,
  title: PropTypes.any,
};