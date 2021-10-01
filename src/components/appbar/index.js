import PropTypes from "prop-types";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Appbar as RNPAppbar, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import { goBack } from "../../utils/navigationService";

const AppBar = ({ title, showMenu }) => {
  const _handleSearch = () => console.log("Searching");

  const user = useSelector(state => state.auth.credentials?.user);
  return (
    <RNPAppbar.Header collapsable style={styles.appbar}>
      <RNPAppbar.Action icon="chevron-left" size={33} onPress={goBack} />
      <RNPAppbar.Content title={title} />
      {showMenu && (
        <>
          <RNPAppbar.Action icon="magnify" onPress={_handleSearch} />
          <Avatar.Image
            size={28}
            source={{ uri: user?.profileImg }}
            style={styles.avatar}
          />
        </>
      )}
    </RNPAppbar.Header>
  );
};

const styles = StyleSheet.create({
  appbar: {
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  avatar: {
    marginEnd: 20,
  },
});

AppBar.propTypes = {
  showMenu: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppBar.defaultProps = {
  showMenu: true,
};

export default AppBar;
