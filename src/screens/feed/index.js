import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import Categories from "./Categories";
import Products from "./Products";

const Feed = () => {
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <AppBar noBackAction title="Explore" />
      <Categories />
      <Products />
    </SafeAreaView>
  );
};

export default Feed;
