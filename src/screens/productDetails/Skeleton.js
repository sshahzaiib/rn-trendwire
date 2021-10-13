import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Skeleton = () => {
  return (
    <SkeletonPlaceholder speed={1000}>
      <SkeletonPlaceholder.Item padding={25}>
        <SkeletonPlaceholder.Item
          height={heightPercentageToDP(50)}
          borderRadius={25}
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="center"
          marginTop={20}>
          <SkeletonPlaceholder.Item
            marginTop={10}
            height={40}
            borderRadius={4}
            width={widthPercentageToDP(60)}
          />
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginTop={20}>
          <SkeletonPlaceholder.Item
            marginTop={5}
            height={30}
            width={widthPercentageToDP(45)}
            borderRadius={4}
          />
          <SkeletonPlaceholder.Item
            width={widthPercentageToDP(45)}
            marginTop={5}
            height={30}
            borderRadius={4}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={10}
          height={heightPercentageToDP(10)}
          borderRadius={4}
          alignItems="center"
        />
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginTop={30}>
          <SkeletonPlaceholder.Item
            marginTop={5}
            height={50}
            width={widthPercentageToDP(45)}
            borderRadius={30}
          />
          <SkeletonPlaceholder.Item
            width={widthPercentageToDP(45)}
            marginTop={5}
            height={50}
            borderRadius={30}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default Skeleton;
