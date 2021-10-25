import React from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import { useCartItemsCount } from "../../redux/selectors";

const Cart = () => {
  const cartItemsCount = useCartItemsCount();
  return (
    <SafeAreaView style={{ position: "relative", height: "100%" }}>
      <AppBar noBackAction title="Cart" />
      <Button
        style={{
          position: "absolute",
          bottom: 0,
          width: "94%",
          left: "3%",
          height: 50,
          display: "flex",
          justifyContent: "center",
          borderRadius: 30,
          marginBottom: 10,
        }}
        mode="contained"
        disabled={!cartItemsCount}
        color="#000"
        labelStyle={{ color: "#fff" }}>
        Checkout
      </Button>
    </SafeAreaView>
  );
};

export default Cart;
