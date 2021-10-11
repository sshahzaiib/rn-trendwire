import useAxios from "axios-hooks";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
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
    select: "title,price,images,price,discount",
  });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const [{ data, loading, error }] = useAxios({
    url: "/product/query",
    params,
  });

  const [{ data: moreData, loading: moreLoading, error: moreError }] = useAxios(
    {
      url: "/product/query",
      params: {
        select: "title,price,images,price,discount",
        page,
      },
    },
    {
      autoCancel: false,
    },
  );

  useEffect(() => {
    dispatch(clearProducts());
    setParams(_params =>
      Object.assign({}, _params, {
        category: selectedCategories,
      }),
    );
  }, [selectedCategories, dispatch]);

  useEffect(() => {
    if (!error && !loading) {
      dispatch(setProducts(data));
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

  if (error) {
    return <View />;
  }
  return loading ? (
    <CardSkeleton />
  ) : (
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
              marginBottom: 10,
            }}>
            <ActivityIndicator animating color="#000" size="large" />
          </View>
        ) : null
      }
      onEndReached={onEndReach}
      ListEmptyComponent={<NoResults />}
    />
  );
};

export default Products;
