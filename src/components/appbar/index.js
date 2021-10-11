import PropTypes from "prop-types";
import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Appbar as RNPAppbar, Avatar, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { goBack, navigate } from "../../utils/navigationService";

const AppBar = ({ title, showMenu, noBackAction }) => {
  const _handleSearch = () => console.log("Searching");
  const auth = useSelector(state => state.auth);

  const user = useSelector(state => state.auth.credentials?.user);
  return (
    <RNPAppbar.Header collapsable style={styles.appbar}>
      {!noBackAction && (
        <RNPAppbar.Action icon="chevron-left" size={33} onPress={goBack} />
      )}
      <RNPAppbar.Content title={title} />
      {showMenu && (
        <>
          <RNPAppbar.Action
            icon="magnify"
            color="#555"
            onPress={_handleSearch}
          />
          {auth.isLoggedIn ? (
            <Pressable onPress={() => navigate("Account")}>
              <Avatar.Image
                size={28}
                source={{ uri: user?.profileImg }}
                style={styles.avatar}
              />
            </Pressable>
          ) : (
            <Button
              onPress={() => navigate("Signin")}
              labelStyle={{ color: "#000" }}>
              Login
            </Button>
          )}
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
  noBackAction: PropTypes.bool,
  showMenu: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppBar.defaultProps = {
  showMenu: true,
  noBackAction: false,
};

export default AppBar;
