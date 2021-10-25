import useAxios from "axios-hooks";
import React from "react";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CategoriesPlaceholder from "./CategoriesPlaceholder";
import {
  setCategories,
  setSelected,
} from "../../redux/actions/categoryActions";
import { useCallback } from "react";

const Categories = () => {
  const [{ data, loading }] = useAxios({
    url: "/category/query",
    params: {
      sortBy: "name:asc",
      limit: 50,
    },
  });
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data.results);
  const selected = useSelector(state => state.categories.selected);

  const handleSelect = useCallback(
    id => {
      dispatch(setSelected(id));
    },
    [dispatch],
  );

  useEffect(() => {
    if (data && !loading) {
      dispatch(setCategories(data));
    }
  }, [data, dispatch, loading]);
  return (
    <View style={{ padding: 5 }}>
      {loading ? (
        <CategoriesPlaceholder />
      ) : (
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Chip
              onPress={() => handleSelect(item.id)}
              selected={selected.includes(item.id)}
              style={{ marginHorizontal: 2 }}>
              {item.name}
            </Chip>
          )}
        />
      )}
    </View>
  );
};

export default Categories;
