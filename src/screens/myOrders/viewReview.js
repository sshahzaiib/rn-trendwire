import useAxios from "axios-hooks";
import PropTypes from "prop-types";
import * as React from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Subheading,
} from "react-native-paper";
import { Rating } from "react-native-ratings";

const ViewReview = ({ orderId }) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const [{ data }] = useAxios({
    url: "/review/query",
    params: {
      order: orderId,
    },
  });
  const hideDialog = () => setVisible(false);

  const result = data?.results[0] ?? {};
  return (
    <View>
      <Button onPress={showDialog} mode="contained">
        View Review
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Review</Dialog.Title>
          <Dialog.Content>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}>
              <Subheading>Rating: </Subheading>
              <Rating
                imageSize={20}
                startingValue={result.rating}
                fractions={1}
                readonly
              />
            </View>
            <Paragraph>{result.body}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideDialog}>
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

ViewReview.propTypes = {
  orderId: PropTypes.any,
};

export default ViewReview;
