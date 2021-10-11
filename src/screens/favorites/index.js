import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import Products from "./Products";

const Favorites = () => {
  return (
    <SafeAreaView>
      <AppBar noBackAction title="Favorites" />
      <Products />
    </SafeAreaView>
  );
};

export default Favorites;
