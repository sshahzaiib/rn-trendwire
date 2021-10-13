import PropTypes from "prop-types";
import useAxios from "axios-hooks";
import React from "react";
import { FlatList } from "react-native";
import NoResults from "../../../../components/NoResults";
import ProductCard from "../../../../components/ProductCard";
import CardSkeleton from "../../CardSkeleton";

const Products = ({ query }) => {
  const [{ data, loading, error }] = useAxios({
    url: "/search",
    params: {
      query,
      text: true,
    },
  });

  if (error) {
    return <NoResults />;
  }

  return loading ? (
    <CardSkeleton />
  ) : (
    <FlatList
      data={data ?? []}
      numColumns={2}
      horizontal={false}
      renderItem={({ item }) => <ProductCard data={item} />}
      ListEmptyComponent={<NoResults />}
      keyExtractor={item => item._id}
    />
  );
};

Products.propTypes = {
  query: PropTypes.string.isRequired,
};

export default Products;
