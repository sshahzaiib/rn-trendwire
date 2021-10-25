import useAxios from "axios-hooks";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import ProductCard from "../../components/ProductCard";
import CardSkeleton from "./CardSkeleton";
import NoResults from "../../components/NoResults";
import { clearProducts, setProducts } from "../../redux/actions/productActions";
import { ActivityIndicator } from "react-native-paper";

const Products = () => {
  const selectedCategories = useSelector(state => state.categories.selected);
  const products = useSelector(state => state.products.data);
  const [params, setParams] = useState({
    select: "title,price,images,discount",
    isActive: true,
    isApproved: true,
    sortBy: "createdAt:desc",
  });
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const [{ data, loading, error }, refetch] = useAxios({
    url: "/product/query",
    params,
  });

  const [{ data: moreData, loading: moreLoading, error: moreError }] = useAxios(
    {
      url: "/product/query",
      params: {
        select: "title,images,price,discount",
        isActive: true,
        isApproved: true,
        sortBy: "createdAt:desc",
        page,
      },
    },
    {
      autoCancel: false,
    },
  );

  useEffect(() => {
    dispatch(clearProducts());
    setPage(1);
    setParams(_params =>
      Object.assign({}, _params, {
        category: selectedCategories,
      }),
    );
  }, [selectedCategories, dispatch]);

  useEffect(() => {
    if (!error && !loading) {
      dispatch(setProducts(data));
      setRefreshing(false);
    }
  }, [data, dispatch, error, loading]);

  useEffect(() => {
    if (!moreError && !moreLoading) {
      dispatch(setProducts(moreData));
    }
  }, [moreData, dispatch, moreError, moreLoading]);

  const onEndReach = useCallback(() => {
    if (moreLoading) {
      return;
    }
    if (page < products.totalPages) {
      setPage(_page => _page + 1);
    }
  }, [moreLoading, page, products.totalPages]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(clearProducts());
    setPage(1);
    refetch();
  }, [dispatch, refetch]);

  if (error) {
    return <View />;
  }
  return loading ? (
    <CardSkeleton />
  ) : (
    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}>
      <FlatList
        data={products.results}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 120 }}
        horizontal={false}
        renderItem={({ item }) => <ProductCard data={item} />}
        ListFooterComponent={() =>
          moreLoading ? (
            <View
              style={{
                position: "relative",
                width: widthPercentageToDP("100%"),
                height: heightPercentageToDP("10%"),
                paddingVertical: 20,
                marginBottom: 50,
              }}>
              <ActivityIndicator animating color="#000" size="large" />
            </View>
          ) : null
        }
        onEndReached={onEndReach}
        ListEmptyComponent={<NoResults />}
      />
    </RefreshControl>
  );
};

export default Products;
