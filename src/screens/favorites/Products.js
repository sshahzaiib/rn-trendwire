import PropTypes from "prop-types";
import useAxios from "axios-hooks";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import ProductCard from "../../components/ProductCard";
import CardSkeleton from "../feed/CardSkeleton";
import NoResults from "../../components/NoResults";
import { isEmpty } from "lodash-es";
import { withNavigationFocus } from "react-navigation";
import { useFavoritesSelector } from "../../redux/selectors";

const Products = ({ isFocused }) => {
  const favorites = useFavoritesSelector();

  const [{ data, loading, error }, _init] = useAxios(
    {
      url: "/product/query",
      params: {
        select: "title,price,images,price,discount",
        _id: favorites,
        limit: favorites.length,
      },
    },
    {
      useCache: true,
      manual: true,
    },
  );

  useEffect(() => {
    if (favorites.length && isFocused) {
      _init();
    }
  }, [_init, favorites.length, isFocused]);

  if (error) {
    return <NoResults />;
  }

  if (isEmpty(favorites)) {
    return <NoResults />;
  }

  return loading ? (
    <CardSkeleton />
  ) : (
    <FlatList
      data={data?.results ?? []}
      numColumns={2}
      contentContainerStyle={{ paddingBottom: 120 }}
      horizontal={false}
      renderItem={({ item }) => <ProductCard data={item} />}
      ListEmptyComponent={<NoResults />}
    />
  );
};

Products.propTypes = {
  isFocused: PropTypes.bool,
};

export default withNavigationFocus(Products);
