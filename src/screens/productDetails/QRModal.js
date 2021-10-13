import PropTypes from "prop-types";
import * as React from "react";
import { Pressable } from "react-native";
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import QRCode from "react-native-qrcode-svg";
import useAxios from "axios-hooks";
import { useUserIdSelector } from "../../redux/selectors";

const QRModal = ({ productId, quantity }) => {
  const [visible, setVisible] = React.useState(false);
  const userId = useUserIdSelector();
  const [{ data, loading, error }, fetch] = useAxios(
    {
      url: "/qrcode/create",
      method: "POST",
      data: {
        product: productId,
        user: userId,
        quantity,
      },
    },
    {
      manual: true,
    },
  );

  const showModal = () => {
    fetch();
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    width: 300,
    alignSelf: "center",
    height: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          {loading ? (
            <ActivityIndicator
              style={{ height: 200 }}
              color="#000"
              size="large"
            />
          ) : error ? (
            <Text>Something went wrong. Please Regenerate.</Text>
          ) : (
            <QRCode size={200} value={data?.identifier} />
          )}
          <Pressable onPress={() => fetch()}>
            <Button
              mode="outlined"
              style={{ marginTop: 15 }}
              labelStyle={{ color: "#000" }}>
              Regenerate
            </Button>
          </Pressable>
        </Modal>
      </Portal>
      <Pressable
        android_ripple={{
          color: "black",
          radius: 27,
        }}
        onPress={showModal}
        style={{ marginRight: 12 }}>
        <MCIcon size={25} name="qrcode" style={{ alignSelf: "center" }} />
        <Text>Show QR</Text>
      </Pressable>
    </>
  );
};

QRModal.propTypes = {
  productId: PropTypes.string,
  quantity: PropTypes.number,
};

export default React.memo(QRModal);
