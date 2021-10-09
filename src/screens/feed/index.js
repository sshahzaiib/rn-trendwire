import PropTypes from "prop-types";
import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";
import { FlatGrid } from "react-native-super-grid";
import AppBar from "../../components/appbar";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Chip } from "react-native-paper";
// import CardSkeleton from "./CardSkeleton";
// import CategoriesPlaceholder from "./CategoriesPlaceholder";

let arr = [1, 2, 3, 5, 6, 7, 2, 3, 5, 6, 7];
let data = [
  { name: "Watch", price: "100" },
  { name: "Big Watch", price: "888" },
  { name: "Expensive Watch", price: "999999" },
  { name: "Donald Trump", price: "-1" },
  { name: "Donald Trump", price: "-1" },
  { name: "Donald Trump", price: "-1" },
  { name: "Donald Trump", price: "-1" },
  { name: "Donald Trump", price: "-1" },
  { name: "Donald Trump", price: "-1" },
];

const Feed = () => {
  return (
    <SafeAreaView style={{ marginBottom: 100 }}>
      <AppBar noBackAction title="Explore" />
      <View style={{ marginVertical: 5, paddingHorizontal: 5 }}>
        {/* <CategoriesPlaceholder /> */}
        <FlatList
          horizontal
          data={data}
          renderItem={({ item }) => (
            <Chip style={{ marginHorizontal: 5 }}>{item.name}</Chip>
          )}
        />
      </View>
      {/* <CardSkeleton /> */}
      <FlatGrid
        style={styles.gridView}
        data={arr}
        staticDimension={widthPercentageToDP(97)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <ProductCard />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

Feed.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  gridView: {
    marginLeft: 5,
  },
});

export default Feed;
