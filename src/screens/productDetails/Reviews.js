import PropTypes from "prop-types";
import useAxios from "axios-hooks";
import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Headline, Subheading } from "react-native-paper";
import { Rating } from "react-native-ratings";
import dayjs from "dayjs";
import NoResults from "../../components/NoResults";

const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const ReviewCard = ({ data }) => {
  return (
    <View style={styles.card}>
      <View style={styles.flexContainer}>
        <View style={styles.row}>
          <Subheading style={styles.text}>{data?.user?.name}</Subheading>
          <Subheading style={styles.text}>
            {" "}
            {dayjs(data.createdAt).format("ll")}{" "}
          </Subheading>
        </View>
        <Rating ratingCount={5} startingValue={data.rating} imageSize={15} />
      </View>
      <Subheading>{data.body}</Subheading>
    </View>
  );
};

ReviewCard.propTypes = {
  data: PropTypes.any,
};

const Reviews = ({ productId }) => {
  const [{ data }] = useAxios({
    url: "/review/query",
    params: {
      product: productId,
      populate: "user",
    },
  });
  const reviews = data?.results ?? [];

  console.log(data);
  return (
    <View style={styles.reviews}>
      <Headline style={styles.headline}>Reviews</Headline>
      {reviews.length === 0 && <NoResults text="No Reviews" />}
      {reviews.map(r => (
        <ReviewCard key={r.id} data={r} />
      ))}
    </View>
  );
};

Reviews.propTypes = {
  productId: PropTypes.string,
};

const styles = StyleSheet.create({
  reviews: {
    marginTop: 20,
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    borderColor: "#eee",
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 3,
  },
  text: {
    fontSize: 12,
    marginRight: 5,
  },
  headline: {
    marginBottom: 15,
  },
  // moreButton: {
  //   marginTop: 15,
  // },
});

export default memo(Reviews);
