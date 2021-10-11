import { uniqueId } from "lodash-es";
import React from "react";
import { Dimensions, FlatList, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CardSkeleton = () => {
  return (
    <FlatList
      numColumns={2}
      horizontal={false}
      data={[...Array(10)].map((_, i) => uniqueId())}
      renderItem={({ item }) => (
        <View style={{ width: Dimensions.get("window").width / 2, padding: 5 }}>
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

export default CardSkeleton;
