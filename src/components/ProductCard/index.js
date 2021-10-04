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
  <Card
    elevation={3}
    mode="elevation"
    style={{ position: "relative", display: "flex", flex: 1 }}>
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
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
    <View style={{ position: "absolute", bottom: 60 }}>
      <Card.Content>
        <View style={{ display: "flex" }}>
          <Text style={{ flex: 1, color: "#fff", fontSize: 18 }}>Card</Text>
          <Paragraph
            style={{
              alignItems: "flex-end",
              alignSelf: "flex-end",
              color: "#fff",
            }}>
            Rs. 1800
          </Paragraph>
        </View>
      </Card.Content>
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
);

export default ProductCard;
