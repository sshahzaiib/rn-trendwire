import PropTypes from "prop-types";
import useAxios from "axios-hooks";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import CardSkeleton from "../feed/CardSkeleton";
import NoResults from "../../components/NoResults";
import { isEmpty } from "lodash-es";
import { withNavigationFocus } from "react-navigation";

const Products = ({ isFocused }) => {
  const cartItems = useSelector(state => state.cart.selected);

  const [{ data, loading, error }, _init] = useAxios(
    {
      url: "/product/query",
      params: {
        select: "title,price,images,price,discount",
        _id: cartItems,
        limit: cartItems.length,
      },
    },
    {
      useCache: true,
      manual: true,
    },
  );

  useEffect(() => {
    if (cartItems.length && isFocused) {
      _init();
    }
  }, [_init, cartItems.length, isFocused]);

  if (error) {
    return <NoResults />;
  }

  if (isEmpty(cartItems)) {
    return <NoResults text="Cart is empty" />;
  }

  return loading ? (
    <CardSkeleton />
  ) : (
    <FlatList
      data={data?.results ?? []}
      numColumns={2}
      contentContainerStyle={{ paddingBottom: 70 }}
      horizontal={false}
      renderItem={({ item }) => <ProductCard data={item} />}
      ListEmptyComponent={<NoResults text="Cart is empty" />}
    />
  );
};

Products.propTypes = {
  isFocused: PropTypes.bool,
};

export default withNavigationFocus(Products);
