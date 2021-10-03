import PropTypes from "prop-types";
import * as React from "react";
import { List } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ListItem = ({ title, onPress, disabled, description }) => (
  <List.Item
    disabled={disabled}
    style={{
      backgroundColor: "#fff",
      marginVertical: heightPercentageToDP(1),
      elevation: 3,
      borderRadius: 8,
    }}
    onPress={onPress}
    title={title}
    description={description}
    right={props => <List.Icon {...props} icon="chevron-right" />}
  />
);

ListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ListItem;
