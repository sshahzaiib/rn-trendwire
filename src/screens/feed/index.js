import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/ProductCard";
import { FlatGrid } from "react-native-super-grid";
import AppBar from "../../components/appbar";
import { widthPercentageToDP } from "react-native-responsive-screen";

let arr = [1, 2, 3, 5, 6, 7, 2, 3, 5, 6, 7];

const Feed = () => {
  return (
    <SafeAreaView style={{ marginBottom: 55 }}>
      <AppBar noBackAction title="Explore" />
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
