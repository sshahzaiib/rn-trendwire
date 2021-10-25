import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import { navigate } from "../../utils/navigationService";
import ProductList from "./Products";

const Products = () => {
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <AppBar noBackAction title="Products" />
      <View style={{ height: "85%" }}>
        <ProductList />
      </View>
      <Button
        style={{ marginBottom: 90, marginTop: 30 }}
        onPress={() => navigate("CreateProduct")}
        labelStyle={{ color: "black" }}>
        Create Product
      </Button>
    </SafeAreaView>
  );
};

export default Products;
