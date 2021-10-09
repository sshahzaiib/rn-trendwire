import React from "react";
import { StyleSheet, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { FlatGrid } from "react-native-super-grid";

const CardSkeleton = () => {
  return (
    <FlatGrid
      style={styles.gridView}
      data={[1, 2, 3, 5, 6]}
      staticDimension={widthPercentageToDP(97)}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <SkeletonPlaceholder speed={1000}>
            <SkeletonPlaceholder.Item height={150} borderRadius={4} />
            <SkeletonPlaceholder.Item
              marginTop={5}
              height={30}
              borderRadius={4}
            />
          </SkeletonPlaceholder>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  gridView: {
    marginLeft: 5,
  },
});

export default CardSkeleton;
