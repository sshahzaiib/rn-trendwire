import PropTypes from "prop-types";
import * as React from "react";
import { ToastAndroid, View } from "react-native";
import { Button, Dialog, Portal, Subheading } from "react-native-paper";
import { Rating } from "react-native-ratings";
import CustomTextField from "../../components/CustomTextField";
import { useUserIdSelector } from "../../redux/selectors";
import { http } from "../../utils/config";

const SubmitReview = ({ productId, orderId, refetch, ...rest }) => {
  const [visible, setVisible] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [body, setBody] = React.useState("");
  const userId = useUserIdSelector();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const showToast = m =>
    ToastAndroid.show(m ?? "Review Submitted.", ToastAndroid.SHORT);

  const handleSubmit = async () => {
    try {
      await http.post("/review", {
        user: userId,
        product: productId,
        order: orderId,
        rating,
        body,
      });
      showToast();
      refetch && refetch();
      hideDialog();
    } catch (e) {
      showToast("Something went wrong.");
    }
  };
  return (
    <View>
      <Button onPress={showDialog} {...rest} mode="contained">
        Submit Review
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
                startingValue={rating}
                fractions={1}
                onFinishRating={setRating}
              />
            </View>
            <CustomTextField
              onChangeText={value => setBody(value)}
              value={body}
              multiline
              numberOfLines={3}
              placeholder="Please type your review"
              placeholderTextColor="#999"
              style={{ marginTop: 12 }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode="contained" onPress={hideDialog}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit}>
              Submit
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

SubmitReview.propTypes = {
  orderId: PropTypes.any,
  productId: PropTypes.any,
  refetch: PropTypes.func,
};

export default SubmitReview;
