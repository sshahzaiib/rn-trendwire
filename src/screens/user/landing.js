import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";

const images = [
  require("../../assets/images/pexels-tamara-sharoglazova-1671915.jpg"),
  require("../../assets/images/login-background.jpg"),
  require("../../assets/images/pexels-bran-sodre-2446655.jpg"),
  require("../../assets/images/pexels-gatot-adri-2693621.jpg"),
  require("../../assets/images/pexels-gazelle-rahmani-2540152.jpg"),
  require("../../assets/images/pexels-vlad-chețan-3048457.jpg"),
];
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const Landing = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        blurRadius={1}
        source={images[randomInteger(0, 5)]}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Trend<Text style={{ fontWeight: "bold" }}>wire</Text>{" "}
          </Text>
          <View style={styles.description}>
            <Text style={styles.text}>
              Explore the new world of{" "}
              <Text style={{ fontWeight: "bold" }}>fashion</Text>
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            uppercase={false}
            mode="contained"
            style={styles.explore}
            labelStyle={styles.exploreLabel}
            onPress={() => navigation.navigate("Signin")}>
            Lets Explore <Icon size={20} name="arrowright" />
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  textContainer: {
    padding: wp(6),
    position: "relative",
    top: hp(30),
  },
  title: {
    fontSize: wp(15),
    color: "white",
    fontWeight: "300",
  },
  description: {
    marginTop: hp(10),
  },
  text: {
    color: "#fff",
    fontSize: wp(8),
    fontWeight: "300",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: wp(90),
    alignSelf: "center",
  },
  explore: {
    borderRadius: 40,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  exploreLabel: {
    fontSize: wp(5),
    color: "#000",
  },
});

export default Landing;
