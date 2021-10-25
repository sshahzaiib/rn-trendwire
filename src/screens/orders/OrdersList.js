import useAxios from "axios-hooks";
import React, { useState } from "react";
import NoResults from "../../components/NoResults";
import { DataTable } from "react-native-paper";
import { useUserIdSelector } from "../../redux/selectors";
import dayjs from "dayjs";
import { navigate } from "../../utils/navigationService";
import { RefreshControl } from "react-native";

const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

const optionsPerPage = [10, 20, 50];

const OrdersList = () => {
  const vendorId = useUserIdSelector();
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/order/query",
      params: {
        populate: "product,user",
        sortBy: "createdAt:desc",
        limit: itemsPerPage,
        page,
        vendor: vendorId,
      },
    },
    {
      useCache: false,
    },
  );

  if (!loading && error) {
    return <NoResults />;
  }

  const results = data?.results ?? [];

  return (
    <RefreshControl refreshing={loading} onRefresh={refetch}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>By</DataTable.Title>
          <DataTable.Title>Product Name</DataTable.Title>
          <DataTable.Title>Placed At</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title numeric>Quantity</DataTable.Title>
        </DataTable.Header>

        {results.map(order => (
          <DataTable.Row
            key={order.id}
            onPress={() =>
              navigate("OrderDetails", {
                order,
                refetch,
              })
            }>
            <DataTable.Cell>{order?.user?.name ?? order?.name}</DataTable.Cell>
            <DataTable.Cell>{order.product?.title ?? "N/A"}</DataTable.Cell>
            <DataTable.Cell>
              {dayjs(order.createdAt).format("lll")}
            </DataTable.Cell>
            <DataTable.Cell> {order.status} </DataTable.Cell>
            <DataTable.Cell numeric> {order.quantity} </DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={data?.totalPages ?? 0}
          onPageChange={_page => setPage(_page)}
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={"Rows per page"}
        />
      </DataTable>
    </RefreshControl>
  );
};

export default OrdersList;
