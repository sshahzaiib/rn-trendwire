import useAxios from "axios-hooks";
import PropTypes from "prop-types";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigation } from "react-navigation";
import AppBar from "../../components/appbar";
import NoResults from "../../components/NoResults";
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  Button,
  Chip,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  Subheading,
} from "react-native-paper";
import { isEmpty } from "lodash-es";
import { useUserIdSelector } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import Skeleton from "./Skeleton";
import Reviews from "./Reviews";
import { http } from "../../utils/config";
import { goBack, navigate } from "../../utils/navigationService";
import { clearProducts, setProducts } from "../../redux/actions/productActions";

// const HEART_IMAGE = require("../../assets/images/heart.png");

const ProductDetails = ({ navigation }) => {
  const _id = navigation?.getParam("productId");

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/product/query",
      params: {
        populate: "category",
        // isActive: true,
        _id,
      },
    },
    {
      useCache: true,
    },
  );

  let product = data?.results[0] ?? {};

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#fff" }}>
      <AppBar search={false} title={product.title ?? "Product"} />
      {loading ? (
        <Skeleton />
      ) : (!loading && error) || (!loading && isEmpty(product)) ? (
        <NoResults text="No Product Found" />
      ) : (
        <View>
          <ScrollView style={{ height: "85%" }}>
            <SliderBox
              ImageComponent={FastImage}
              images={product?.images ?? []}
              sliderBoxHeight={heightPercentageToDP(50)}
              dotColor="#FFF"
              inactiveDotColor="#90A4AE"
              paginationBoxVerticalPadding={20}
              circleLoop
              resizeMethod={"resize"}
              resizeMode={"cover"}
              paginationBoxStyle={{
                position: "absolute",
                bottom: 0,
                padding: 0,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "center",
                paddingVertical: 10,
              }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 0,
                padding: 0,
                margin: 0,
                backgroundColor: "rgba(128, 128, 128, 0.92)",
              }}
              ImageComponentStyle={{
                borderRadius: 25,
                width: "90%",
                marginTop: 10,
              }}
              imageLoadingColor="#fff"
            />
            <View style={{ paddingHorizontal: 35, paddingVertical: 20 }}>
              <Headline style={{ textAlign: "center", fontWeight: "500" }}>
                {product.title}
              </Headline>
              <View style={styles.flexContainer}>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    Rs.{" "}
                    {parseInt(
                      product.price - product.price * (product.discount / 100),
                      10,
                    )}{" "}
                    <Text
                      style={{
                        textDecorationLine: "line-through",
                        color: "red",
                        fontSize: 16,
                      }}>
                      {product.price}
                    </Text>
                  </Text>
                </View>
                <Chip mode="outlined">{product.discount}% Off</Chip>
              </View>
              <View style={styles.flexContainer}>
                <Subheading>Approved:</Subheading>
                <Chip mode="outlined">
                  {product.isApproved ? "Approved" : "Pending"}
                </Chip>
              </View>
              <View style={styles.flexContainer}>
                <Subheading>Category:</Subheading>
                <Chip mode="outlined">{product.category?.name}</Chip>
              </View>
              <Subheading style={{ marginTop: 12 }}>
                {product.description}
              </Subheading>
              <Reviews productId={product.id} />
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  marginVertical: 12,
                  flexWrap: "wrap",
                }}>
                <Subheading style={{ marginRight: 10, marginTop: 10 }}>
                  Tags:
                </Subheading>
                {product.tags?.map((tag, index) => (
                  <Chip
                    key={tag + index}
                    style={{
                      marginHorizontal: 5,
                      marginTop: 10,
                    }}>
                    {tag}
                  </Chip>
                ))}
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              ...styles.flexContainer,
              marginTop: 5,
              paddingHorizontal: 10,
            }}>
            <Button
              onPress={() =>
                navigate("EditProduct", {
                  productId: product.id,
                  refetch,
                })
              }
              style={styles.button}>
              Edit
            </Button>
            <DeleteDialog productId={product.id} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const DeleteDialog = ({ productId }) => {
  const [visible, setVisible] = React.useState(false);
  const vendorId = useUserIdSelector();
  const dispatch = useDispatch();
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  // eslint-disable-next-line no-unused-vars
  const [{ data }, refetch] = useAxios(
    {
      url: "/product/query",
      params: {
        select: "title,price,images,discount",
        creator: vendorId,
        isActive: true,
        sortBy: "createdAt:desc",
      },
    },
    {
      manual: true,
    },
  );

  const handleDelete = async () => {
    try {
      await http.delete(`/product/${productId}`);
      dispatch(clearProducts());
      refetch().then(res => {
        dispatch(setProducts(res.data));
        goBack();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button style={styles.button} onPress={showDialog}>
        Delete
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this product?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button labelStyle={{ color: "#000" }} onPress={handleDelete}>
              Confirm
            </Button>
            <Button labelStyle={{ color: "#000" }} onPress={hideDialog}>
              Cancel
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

DeleteDialog.propTypes = {
  productId: PropTypes.any,
};

ProductDetails.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }),
};

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#000",
    width: "49%",
    height: 50,
    display: "flex",
    justifyContent: "center",
    borderRadius: 30,
    marginBottom: 10,
  },
});

export default withNavigation(ProductDetails);
