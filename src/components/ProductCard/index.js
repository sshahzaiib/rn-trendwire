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
import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import { useIsLoggedInSelector } from "../../redux/selectors";
const { width } = Dimensions.get("window");

const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.products.favorites);
  const cartList = useSelector(state => state.cart.selected);
  const isLoggedIn = useIsLoggedInSelector();

  const handleFavorite = React.useCallback(
    id => {
      dispatch(setFavorite(id));
    },
    [dispatch],
  );

  const handleAddToCart = React.useCallback(
    id => {
      dispatch(addToCart(id));
    },
    [dispatch],
  );

  return (
    <Pressable
      onPress={() => console.log("Title")}
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
        {isLoggedIn && (
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
              android_ripple={{
                color: "pink",
                borderless: true,
              }}
              onPress={() => handleFavorite(data.id)}>
              <MCIcon
                size={20}
                color="red"
                name={favorites.includes(data.id) ? "heart" : "heart-outline"}
              />
            </Pressable>
          </View>
        )}
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
                onPress={() => handleAddToCart(data.id)}>
                <FWIcon
                  color="#555"
                  name="handbag"
                  size={20}
                  style={{
                    color: cartList.includes(data.id) ? "red" : "#999",
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
    discount: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default React.memo(ProductCard);
