import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, Subheading } from "react-native-paper";
import { Rating } from "react-native-ratings";

const ReviewCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.flexContainer}>
        <View style={styles.row}>
          <Subheading style={styles.text}>Name</Subheading>
          <Subheading style={styles.text}>Date</Subheading>
        </View>
        <Rating ratingCount={5} startingValue={5} imageSize={15} />
      </View>
      <Subheading>
        Consectetur ex minim laborum eiusmod commodo nisi et dolor nulla duis
        consectetur. Irure officia ea proident commodo consequat. Proident
        pariatur laborum aliqua sint excepteur duis.
      </Subheading>
    </View>
  );
};

const Reviews = () => {
  return (
    <View style={styles.reviews}>
      <Headline style={styles.headline}>Reviews</Headline>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <Button
        style={styles.moreButton}
        mode="text"
        labelStyle={{ color: "#000" }}>
        More
      </Button>
    </View>
  );
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
  moreButton: {
    marginTop: 15,
  },
});

export default memo(Reviews);
