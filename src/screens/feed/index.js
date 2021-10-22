import PropTypes from "prop-types";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { useUserSelector } from "../../redux/selectors";
import { navigate } from "../../utils/navigationService";

const { width } = Dimensions.get("window");

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
            />
            <Tile
              backgroundColor="#FF7544"
              title="Manage Products"
              icon={props => <MIcon {...props} name="list-alt" />}
            />
          </Row>
          <Row>
            <Tile
              backgroundColor="#FB5A7C"
              title="Reviews"
              icon={props => <MIcon {...props} name="rate-review" />}
            />
            <Tile
              backgroundColor="#8677FE"
              title="Stories"
              icon={props => <MIcon {...props} name="amp-stories" />}
            />
          </Row>
          <Row>
            <Tile
              backgroundColor="#4278DE"
              title="Scan QR"
              icon={props => <MIcon {...props} name="qr-code-scanner" />}
              path="ScanQR"
            />
            <Tile
              backgroundColor="#2C293C"
              title="Account"
              icon={props => <MIcon {...props} name="account-circle" />}
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
    <Col onPress={() => navigate(path)} style={styles.tileColumn}>
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
    padding: 10,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  tileContainer: {
    width: width / 2.2,
    height: 170,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
