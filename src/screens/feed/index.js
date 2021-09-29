import PropTypes from "prop-types";
import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useSelector } from "react-redux";

const Feed = ({ navigation }) => {
  const dispatch = useDispatch();
  const refreshToken = useSelector(
    state => state.auth.credentials?.tokens?.refresh?.token,
  );

  const handleLogout = () => dispatch(logout({ refreshToken }, navigation));
  // const handleLogout = () => navigation.navigate("Auth");
  return (
    <SafeAreaView>
      <View>
        <Text>Text</Text>
        <Button onPress={handleLogout}>Logout</Button>
      </View>
    </SafeAreaView>
  );
};

Feed.propTypes = {
  navigation: PropTypes.any,
};

export default Feed;
