/* eslint-disable react/prop-types */
import useAxios from "axios-hooks";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/appbar";
import { useUserIdSelector } from "../../redux/selectors";
import { Card, Chip } from "react-native-paper";
import SubmitReview from "./writeReview";
import ViewReview from "./viewReview";

const MyOrders = () => {
  const userId = useUserIdSelector();
  const [{ data }, refetch] = useAxios(
    {
      url: "/order/my-orders",
      params: {
        sortBy: "name:asc",
        limit: 100,
        user: userId,
        populate: "product",
      },
    },
    {
      useCache: false,
    },
  );

  return (
    <SafeAreaView style={{ padding: 5, flex: 1 }}>
      <AppBar title="My Orders" />
      <ScrollView>
        {data?.results?.map(o => (
          <OrderCard key={o.id} data={o} refetch={refetch} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const OrderCard = ({ data, refetch }) => {
  return (
    <Card
      elevation={5}
      style={{
        padding: 12,
        borderColor: "#999999",
        borderWidth: 1,
        marginVertical: 4,
      }}>
      <Card.Cover source={{ uri: data?.product?.images[0] }} />
      <Card.Title
        title={data?.product?.title}
        subtitle="Card Subtitle"
        right={() => <Chip>{data?.status?.toUpperCase()}</Chip>}
      />
      <Card.Actions>
        {!data.reviewed && (
          <SubmitReview
            disabled={data.status !== "delivered"}
            orderId={data.id}
            productId={data.product.id}
            refetch={refetch}
          />
        )}
        {data.reviewed && <ViewReview orderId={data.id} />}
      </Card.Actions>
    </Card>
  );
};

export default MyOrders;
