import PropTypes from "prop-types";
import * as React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import FWIcon from "react-native-vector-icons/SimpleLineIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { setFavorite } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import {
  useCartItemsSelector,
  useFavoritesSelector,
  useIsLoggedInSelector,
  useUserIdSelector,
} from "../../redux/selectors";
import { updateProfileData } from "../../redux/actions/authActions";
import { uniq } from "lodash-es";
import { navigate } from "../../utils/navigationService";
const { width } = Dimensions.get("window");

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useFavoritesSelector();
  const cartList = useCartItemsSelector();
  const isLoggedIn = useIsLoggedInSelector();
  const userId = useUserIdSelector();

  const handleFavorite = React.useCallback(
    id => {
      let selected = [...favorites];
      if (selected.includes(id)) {
        selected.splice(selected.indexOf(id), 1);
      } else {
        selected = uniq([...selected, id]);
      }
      dispatch(setFavorite(selected));
      dispatch(updateProfileData(userId, { favorites: selected }));
    },
    [dispatch, favorites, userId],
  );

  const handleAddToCart = React.useCallback(
    id => {
      let selected = [...cartList];
      if (selected.includes(id)) {
        selected.splice(selected.indexOf(id), 1);
      } else {
        selected = uniq([...selected, id]);
      }
      dispatch(addToCart(selected));
      isLoggedIn && dispatch(updateProfileData(userId, { cart: selected }));
    },
    [cartList, dispatch, isLoggedIn, userId],
  );

  return (
    <Pressable
      onPress={() =>
        navigate("ProductDetails", {
          productId: data.id,
        })
      }
      style={{
        padding: 5,
        width: width / 2,
      }}>
      <Card elevation={3} mode="elevation" style={{ position: "relative" }}>
        <Card.Cover
          source={{
            uri: data?.images[0],
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "white",
            borderRadius: 50,
            padding: 4,
            zIndex: 100,
          }}>
          <Pressable
            disabled={!isLoggedIn}
            android_ripple={{
              color: "pink",
              borderless: true,
            }}
            onPress={() => handleFavorite(data.id ?? data._id)}>
            <MCIcon
              size={20}
              color="red"
              name={
                favorites.includes(data.id ?? data._id)
                  ? "heart"
                  : "heart-outline"
              }
            />
          </Pressable>
        </View>
        <View style={{ position: "absolute", bottom: 50, width: "100%" }}>
          <View style={{ width: "100%" }}>
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 5,
                alignItems: "center",
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  flex: 1,
                  color: "#fff",
                  fontSize: 16,
                }}>
                {data.title.length < 40
                  ? data.title
                  : data.title.slice(0, 39) + " ..."}
              </Text>
              <View>
                <Paragraph
                  style={{
                    color: "#fff",
                  }}>
                  Rs. {data.price}
                </Paragraph>
                <Paragraph
                  style={{
                    textDecorationLine: "line-through",
                    color: "red",
                    textAlign: "right",
                    fontSize: 13,
                  }}>
                  {data.price}
                </Paragraph>
              </View>
            </View>
          </View>
        </View>
        <Card.Actions>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: heightPercentageToDP(1.3),
              paddingVertical: heightPercentageToDP(1),
            }}>
            <Text style={{ flex: 1 }}>Save {data.discount}%</Text>
            <View style={{ marginRight: widthPercentageToDP(2) }}>
              <Pressable
                android_ripple={{ color: "#eee", borderless: true }}
                onPress={() => handleAddToCart(data.id ?? data._id)}>
                <FWIcon
                  color="#555"
                  name="handbag"
                  size={20}
                  style={{
                    color: cartList.includes(data.id ?? data._id)
                      ? "red"
                      : "#999",
                  }}
                />
              </Pressable>
            </View>
          </View>
        </Card.Actions>
      </Card>
    </Pressable>
  );
};

ProductCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    discount: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default React.memo(ProductCard);
