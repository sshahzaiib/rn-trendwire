import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import OrdersList from "./OrdersList";

const Orders = () => {
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <AppBar noBackAction title="Orders" />
      <View style={{ height: "85%" }}>
        <OrdersList />
      </View>
    </SafeAreaView>
  );
};

export default Orders;
