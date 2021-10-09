import * as React from "react";
import { Text, View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import FWIcon from "react-native-vector-icons/SimpleLineIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const ProductCard = () => (
  <View style={{ flex: 0.5 }}>
    <Card elevation={3} mode="elevation" style={{ position: "relative" }}>
      <Card.Cover
        source={{
          uri: "https://images.pexels.com/photos/5907666/pexels-photo-5907666.jpeg?cs=srgb&dl=pexels-alina-blumberg-5907666.jpg&fm=jpg",
        }}
      />
      <MCIcon
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: 50,
          padding: 4,
        }}
        size={20}
        color="red"
        name="heart"
      />
      <View style={{ position: "absolute", bottom: 50 }}>
        <View style={{ width: widthPercentageToDP(45) }}>
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              justifyContent: "space-between",
              flexDirection: "row",
              padding: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{ flex: 1, color: "#fff", fontSize: 18 }}>
              Card afdf
            </Text>
            <Paragraph
              style={{
                color: "#fff",
              }}>
              Rs. 1800
            </Paragraph>
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
          <Text style={{ flex: 1 }}>Save 10%</Text>
          <FWIcon
            style={{ marginRight: widthPercentageToDP(2) }}
            color="#555"
            name="handbag"
            size={20}
          />
        </View>
      </Card.Actions>
    </Card>
  </View>
);

export default ProductCard;
