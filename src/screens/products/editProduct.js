import PropTypes from "prop-types";
import { Formik } from "formik";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
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
import AppBar from "../../components/appbar";
import CustomTextField from "../../components/CustomTextField";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { http } from "../../utils/config";
import useAxios from "axios-hooks";
import { goBack } from "../../utils/navigationService";

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <AppBar title="Edit Product" showMenu={false} />
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
  title: Yup.string().required("Required").label("Title").max(40),
  description: Yup.string().required("Required").label("Description"),
  category: Yup.string().required("Required").label("Category"),
  price: Yup.number().integer().required("Required").label("Price").min(1),
  discount: Yup.number()
    .integer()
    .required("Required")
    .label("Discount")
    .min(10),
  tags: Yup.string().required("Required").label("Tags"),
});

const EditProduct = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [suggestionsList, setSuggestionsList] = useState(null);
  const productId = navigation?.getParam("productId");
  const refetch = navigation?.getParam("refetch");
  const [{ loading: _loading }, updateProduct] = useAxios(
    {
      url: "/product/" + productId,
      method: "PATCH",
    },
    {
      manual: true,
    },
  );
  const [{ data: _data }] = useAxios({
    url: "/product/query",
    method: "GET",
    params: {
      _id: productId,
    },
  });

  const _handleSubmit = async v => {
    let tags = [...v.tags.split(",")].filter(_v => _v.trim());
    const values = {
      ...v,
      tags,
    };

    try {
      await updateProduct({
        data: {
          ...values,
        },
      });
      showToast();
      refetch && (await refetch());
      goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const showToast = message => {
    ToastAndroid.show(message ?? "Product updated", ToastAndroid.SHORT);
  };

  const getSuggestions = useCallback(async q => {
    if (typeof q !== "string" || q.length < 1) {
      setSuggestionsList(null);
      return;
    }
    setLoading(true);
    const response = await http.get("/search/categories", {
      params: {
        query: q,
      },
    });
    const items = response.data;
    const suggestions = items.map(item => ({
      id: item._id,
      title: item.name,
    }));
    setSuggestionsList(suggestions);
    setLoading(false);
  }, []);

  const data = _data?.results[0] ?? {};
  return (
    <Layout>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            category: data?.category ?? "",
            title: data?.title ?? "",
            description: data?.description ?? "",
            price: data?.price ?? "",
            discount: data?.discount ?? "",
            tags: data?.tags?.join(", ") ?? "",
          }}
          enableReinitialize
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
            setFieldValue,
          }) => (
            <>
              <CustomTextField
                label="Title"
                error={!!errors.title && touched.title}
                onChangeText={handleChange("title")}
                onBlur={handleBlur("title")}
                value={values.title}
                right={<TextInput.Affix text={`${values.title.length}/40`} />}
              />
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={false}
                closeOnSubmit={false}
                onSelectItem={item => {
                  console.log(item);
                  setFieldValue("category", item?.id ?? "");
                }}
                debounce={100}
                dataSet={suggestionsList}
                onChangeText={getSuggestions}
                initialValue={data?.category}
                loading={loading}
                textInputProps={{
                  placeholder: "Category",
                  autoCorrect: true,
                  placeholderTextColor: !!errors.category ? "#AC194B" : "#000",
                  autoCapitalize: "none",
                  style: {
                    backgroundColor: "transparent",
                    borderBottomColor: !!errors.category ? "#AC194B" : "#000",
                    color: "#000",
                  },
                }}
                inputContainerStyle={{
                  backgroundColor: "transparent",
                  borderBottomColor: !!errors.category ? "#AC194B" : "#000",
                  borderBottomWidth: 1,
                  marginTop: 12,
                }}
              />
              <CustomTextField
                label="Actual Price"
                error={!!errors.price && touched.price}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                keyboardType="number-pad"
                left={<TextInput.Affix text="Rs." />}
              />
              <CustomTextField
                label="Discount"
                error={!!errors.discount && touched.discount}
                onChangeText={handleChange("discount")}
                onBlur={handleBlur("discount")}
                value={values.discount}
                keyboardType="number-pad"
                right={<TextInput.Affix text="%" />}
              />
              <CustomTextField
                label="Tags (Comma separated list of words)"
                error={!!errors.tags && touched.tags}
                onChangeText={handleChange("tags")}
                onBlur={handleBlur("tags")}
                value={values.tags}
              />
              <CustomTextField
                label="Description"
                error={!!errors.description && touched.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
                multiline
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
    </Layout>
  );
};

EditProduct.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
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
});

export default EditProduct;
