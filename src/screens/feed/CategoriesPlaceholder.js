import React from "react";
import { FlatList, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import rn from "random-number";

const CategoriesPlaceholder = () => {
  return (
    <FlatList
      horizontal
      data={Array(5)}
      renderItem={() => (
        <View style={{ marginHorizontal: 2 }}>
          <SkeletonPlaceholder speed={1000}>
            <SkeletonPlaceholder.Item
              width={rn({ min: 80, max: 140, integer: true })}
              height={35}
              borderRadius={18}
            />
          </SkeletonPlaceholder>
        </View>
      )}
    />
  );
};

export default CategoriesPlaceholder;
