import useAxios from "axios-hooks";
import PropTypes from "prop-types";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { withNavigation } from "react-navigation";
import AppBar from "../../components/appbar";
import NoResults from "../../components/NoResults";
import { SliderBox } from "react-native-image-slider-box";
import FastImage from "react-native-fast-image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Avatar, Button, Chip, Headline, Subheading } from "react-native-paper";
import { isEmpty, uniq } from "lodash-es";
import {
  useCartItemsSelector,
  useFavoritesSelector,
  useIsLoggedInSelector,
  useUserIdSelector,
} from "../../redux/selectors";
import { setFavorite } from "../../redux/actions/productActions";
import { updateProfileData } from "../../redux/actions/authActions";
import { useDispatch } from "react-redux";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { addToCart } from "../../redux/actions/cartActions";
import Skeleton from "./Skeleton";
import Reviews from "./Reviews";
import QRModal from "./QRModal";
import { navigate } from "../../utils/navigationService";

const ProductDetails = ({ navigation }) => {
  const _id = navigation?.getParam("productId");
  const favorites = useFavoritesSelector();
  const isLoggedIn = useIsLoggedInSelector();
  const dispatch = useDispatch();
  const userId = useUserIdSelector();
  const cartList = useCartItemsSelector();

  const [{ data, loading, error }] = useAxios(
    {
      url: "/product/query",
      params: {
        populate: "creator,category",
        // isActive: true,
        _id,
      },
    },
    {
      useCache: true,
    },
  );

  let product = data?.results[0] ?? {};

  const handleFavorite = React.useCallback(() => {
    let selected = [...favorites];
    if (selected.includes(_id)) {
      selected.splice(selected.indexOf(_id), 1);
    } else {
      selected = uniq([...selected, _id]);
    }
    dispatch(setFavorite(selected));
    dispatch(updateProfileData(userId, { favorites: selected }));
  }, [_id, dispatch, favorites, userId]);

  const handleAddToCart = React.useCallback(() => {
    let selected = [...cartList];
    if (selected.includes(_id)) {
      selected.splice(selected.indexOf(_id), 1);
    } else {
      selected = uniq([...selected, _id]);
    }
    dispatch(addToCart(selected));
    isLoggedIn && dispatch(updateProfileData(userId, { cart: selected }));
  }, [_id, cartList, dispatch, isLoggedIn, userId]);

  console.log(product);
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
                <View
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}>
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
                  <Chip style={{ marginLeft: 5 }} mode="outlined">
                    {product.discount}% Off
                  </Chip>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}>
                  <QRModal productId={_id} quantity={1} />
                  <Pressable
                    disabled={!isLoggedIn}
                    android_ripple={{
                      color: "pink",
                      radius: 27,
                    }}
                    onPress={handleFavorite}>
                    <MCIcon
                      size={25}
                      color="red"
                      name={favorites.includes(_id) ? "heart" : "heart-outline"}
                      style={{ alignSelf: "center" }}
                    />
                    <Text>Favorite</Text>
                  </Pressable>
                </View>
              </View>
              <View style={styles.flexContainer}>
                <Subheading>Category:</Subheading>
                <Chip mode="outlined">{product.category?.name}</Chip>
              </View>
              <Subheading style={{ marginTop: 12 }}>
                {product.description}
              </Subheading>
              <View
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  marginVertical: 12,
                  flexWrap: "wrap",
                  borderColor: "#eee",
                  padding: 10,
                  borderRadius: 10,
                  borderWidth: 2,
                }}>
                <Avatar.Image
                  size={50}
                  source={{ uri: product?.creator?.profileImg }}
                />
                <View style={{ marginLeft: 5 }}>
                  <Subheading> {product?.creator.name} </Subheading>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}>
                    <Subheading> Verified Seller </Subheading>
                  </View>
                </View>
              </View>
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
                navigate("BuyNow", {
                  productId: product.id,
                })
              }
              style={styles.button}>
              Buy Now
            </Button>
            <Button style={styles.button} onPress={handleAddToCart}>
              {cartList.includes(_id) ? "Remove from cart" : "Add to cart"}
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
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
