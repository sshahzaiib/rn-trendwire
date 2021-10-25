import PropTypes from "prop-types";
import * as React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Appbar as RNPAppbar, Avatar, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { goBack, navigate } from "../../utils/navigationService";

const AppBar = ({ title, showMenu, noBackAction, search }) => {
  const auth = useSelector(state => state.auth);
  const noInternet = useSelector(
    state => !state.UI.netInfo.isConnected ?? false,
  );
  const internetNotReachable = useSelector(
    state => !state.UI.netInfo.isInternetReachable ?? false,
  );

  const user = useSelector(state => state.auth.credentials?.user);
  return (
    <>
      <RNPAppbar.Header collapsable style={styles.appbar}>
        {!noBackAction && (
          <RNPAppbar.Action icon="chevron-left" size={33} onPress={goBack} />
        )}
        <RNPAppbar.Content title={title} />
        {showMenu && (
          <>
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
      {(noInternet || internetNotReachable) && (
        <View style={styles.noInternet}>
          <Text style={{ color: "white" }}>No Internet</Text>
        </View>
      )}
    </>
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
  noInternet: {
    width: "100%",
    backgroundColor: "red",
    alignItems: "center",
  },
});

AppBar.propTypes = {
  noBackAction: PropTypes.bool,
  showMenu: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

AppBar.defaultProps = {
  showMenu: true,
  search: true,
  noBackAction: false,
};

export default AppBar;
