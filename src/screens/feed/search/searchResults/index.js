import PropTypes from "prop-types";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../../../components/appbar";
import Products from "./Products";

const SearchResults = ({ navigation }) => {
  const query = navigation.getParam("query");
  return (
    <SafeAreaView style={{ width: "100%", paddingBottom: 60 }}>
      <AppBar title={query} />
      <Products query={query} />
    </SafeAreaView>
  );
};

SearchResults.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }),
};

export default SearchResults;
