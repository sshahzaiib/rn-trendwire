import PropTypes from "prop-types";
import React from "react";
import { ScrollView, ToastAndroid, View } from "react-native";
import { Button, Subheading } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import { navigate } from "../../utils/navigationService";
import { http } from "../../utils/config";

const OrderDetails = ({ navigation }) => {
  const order = navigation?.getParam("order");
  const refetch = navigation?.getParam("refetch");
  const showToast = message => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const handleApprove = async () => {
    try {
      await http.patch(`/order/manage/${order?.id}`, {
        status: "accepted",
      });
      showToast("Order Confirmed");
      refetch && (await refetch());
    } catch (e) {
      console.log(e);
    }
  };

  const handleDecline = async () => {
    try {
      await http.patch(`/order/manage/${order?.id}`, {
        status: "decline",
      });
      showToast("Order Confirmed");
      refetch && (await refetch());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <AppBar title="Order Details" />
      <ScrollView style={{ padding: 12, flex: 1 }}>
        <Tile title="Order ID" description={order?.id} />
        <Tile title="Order Status" description={order?.status} />
        <Tile title="Product Title" description={order?.product?.title} />
        <Tile
          title="Product Price"
          description={"Rs. " + order?.product?.price}
        />
        <Tile
          title="Product Discount"
          description={order?.product?.discount + "%"}
        />
        <Tile
          title="Discounted Price"
          description={
            "Rs. " +
            (
              order?.product?.price -
              order?.product?.price * (order?.product?.discount / 100)
            ).toFixed(0)
          }
        />
        <Tile
          title="Name"
          description={order?.user?.name || order?.name || "N/A"}
        />
        <Tile
          title="Email"
          description={order?.user?.email || order?.email || "N/A"}
        />
        <Tile
          title="Address"
          description={order?.user?.address || order?.address || "N/A"}
        />
        <Tile
          title="Contact No."
          description={order?.user?.contactNo || order?.contactNo || "N/A"}
        />
        <Tile title="Quantity" description={order?.quantity} />
        <Tile title="Quantity" description={order?.quantity} />
        <Tile
          title="Grand Total"
          description={
            (order?.product?.price -
              order?.product?.price * (order?.product?.discount / 100)) *
            order.quantity
          }
        />

        <Button
          onPress={() =>
            navigate("ProductDetails", {
              productId: order?.product?.id,
            })
          }
          mode="contained"
          style={{ marginBottom: 12 }}>
          View Product
        </Button>
        <Button
          onPress={handleApprove}
          mode="contained"
          disabled={order.status !== "pending"}
          style={{ marginBottom: 12 }}>
          Approve
        </Button>
        <Button
          onPress={handleDecline}
          mode="contained"
          disabled={order.status !== "pending"}
          style={{ marginBottom: 12 }}>
          Decline
        </Button>
        {order.status !== "pending" && (
          <Subheading style={{ marginHorizontal: 20, paddingBottom: 20 }}>
            Contact Trendwire Support if you want to modify this order.
          </Subheading>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

OrderDetails.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }),
};

export default OrderDetails;

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
