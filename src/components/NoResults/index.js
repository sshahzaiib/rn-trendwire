import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { Subheading } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const NoResults = ({ text }) => {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        backgroundColor: "#eee",
        paddingVertical: heightPercentageToDP(1),
        width: widthPercentageToDP(95),
        alignSelf: "center",
      }}>
      <Subheading>{text ?? "No results found"}</Subheading>
    </View>
  );
};

NoResults.propTypes = {
  text: PropTypes.string,
};

export default NoResults;
