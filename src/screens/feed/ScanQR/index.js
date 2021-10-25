import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { navigate } from "../../../utils/navigationService";

export default function ScanQR() {
  const onSuccess = e => {
    navigate("CreateOrder", {
      qrId: e.data,
    });
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.auto}
      fadeIn
      reactivate
      reactivateTimeout={3000}
      topContent={
        <Text style={styles.centerText}>
          Scan Product QR Code from customer&apos;s phone to place the order for
          your customer
        </Text>
      }
      bottomContent={
        <TouchableOpacity
          onPress={
            __DEV__
              ? () =>
                  navigate("CreateOrder", {
                    qrId: "17f240c2-e85e-43c4-885d-6f31c3536199",
                  })
              : () => navigate("Home")
          }
          style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
    marginTop: 50,
  },
});
