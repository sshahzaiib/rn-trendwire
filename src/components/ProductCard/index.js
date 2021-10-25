import PropTypes from "prop-types";
import * as React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { navigate } from "../../utils/navigationService";
const { width } = Dimensions.get("window");

const ProductCard = ({ data }) => {
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
                  Rs.{" "}
                  {parseInt(
                    data.price - data.price * (data.discount / 100),
                    10,
                  )}
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
