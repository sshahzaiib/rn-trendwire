import PropTypes from "prop-types";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { useUserSelector } from "../../redux/selectors";
import { navigate } from "../../utils/navigationService";

const Home = () => {
  const user = useUserSelector();
  return (
    <SafeAreaView style={{ height: "100%" }}>
      <AppBar noBackAction title="Welcome" />
      <ScrollView style={{ paddingVertical: 12 }}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Hello 👋</Text>
          <Text style={styles.name}>{user.name}!</Text>
        </View>
        <Grid>
          <Row>
            <Tile
              backgroundColor="#1AB1B0"
              title="Manage Orders"
              icon={props => <MIcon {...props} name="local-grocery-store" />}
              path="ManageOrders"
            />
          </Row>
          <Row>
            <Tile
              backgroundColor="#FF7544"
              title="Manage Products"
              icon={props => <MIcon {...props} name="list-alt" />}
              path="Products"
            />
          </Row>
          <Row>
            <Tile
              backgroundColor="#4278DE"
              title="Scan QR"
              icon={props => <MIcon {...props} name="qr-code-scanner" />}
              path="ScanQR"
            />
          </Row>
          <Row>
            <Tile
              backgroundColor="#2C293C"
              title="Account"
              icon={props => <MIcon {...props} name="account-circle" />}
              path="Account"
            />
          </Row>
        </Grid>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const Tile = ({ backgroundColor, title, icon: Icon, path }) => {
  return (
    <Col onPress={() => path && navigate(path)} style={styles.tileColumn}>
      <View style={{ ...styles.tileContainer, backgroundColor }}>
        {Icon && <Icon color="#fff" size={50} style={{ marginBottom: 10 }} />}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Col>
  );
};

Tile.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.any,
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingLeft: 12,
  },
  heading: {
    fontSize: 35,
    fontWeight: "500",
  },
  name: {
    fontSize: 38,
    fontWeight: "500",
    marginBottom: 22,
  },
  tileColumn: {
    padding: 5,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  tileContainer: {
    height: 150,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
