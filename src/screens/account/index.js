import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, Caption, Headline } from "react-native-paper";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ListItem from "../../components/ListItem";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { navigate } from "../../utils/navigationService";
const Account = ({ navigation }) => {
  const dispatch = useDispatch();
  const refreshToken = useSelector(
    state => state.auth.credentials?.tokens?.refresh?.token,
  );
  const user = useSelector(state => state.auth.credentials?.user);

  const handleLogout = () => dispatch(logout({ refreshToken }, navigation));
  const handleNavigate = path => console.log(path);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.info}>
            <Avatar.Image
              style={styles.avatar}
              size={50}
              source={{ uri: user?.profileImg }}
            />
            <View>
              <Headline>{user?.name}</Headline>
              <Caption>{user?.email}</Caption>
            </View>
          </View>
          <View style={{ marginTop: heightPercentageToDP(4) }} />
          <ListItem
            title="Update Profile"
            onPress={() => navigate("UpdateProfile")}
          />
          <ListItem
            title="My Orders"
            onPress={() => handleNavigate("MyOrders")}
          />
          <ListItem
            title="My Reviews"
            onPress={() => handleNavigate("MyReviews")}
          />
          <ListItem
            title="Change Password"
            onPress={() => handleNavigate("ChangePassword")}
          />
          <Button
            mode="contained"
            style={styles.logoutBtn}
            labelStyle={styles.logoutBtnLabel}
            onPress={handleLogout}>
            <Icon size={16} name="logout" /> Logout
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

Account.propTypes = {
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    padding: heightPercentageToDP(3),
  },
  info: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    marginRight: 12,
    paddingTop: 6,
  },
  logoutBtn: {
    borderRadius: 40,
    backgroundColor: "#121212",
    height: 50,
    justifyContent: "center",
    marginTop: widthPercentageToDP(12),
    marginBottom: heightPercentageToDP(8),
  },
  logoutBtnLabel: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Account;
