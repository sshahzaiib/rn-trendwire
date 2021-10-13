import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, List, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../../utils/navigationService";

const Search = () => {
  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query, 200);
  const [{ data }, fetch] = useAxios(
    {
      url: "/search",
      params: {
        query: debouncedSearchTerm,
      },
    },
    {
      manual: true,
    },
  );
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        fetch();
      }
    },
    [debouncedSearchTerm, fetch], // Only call effect if debounced search term changes
  );

  return (
    <SafeAreaView style={{ width: "100%" }}>
      <View style={{ flexDirection: "row" }}>
        <Searchbar
          style={{ width: "80%" }}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
        />
        <Button
          onPress={() => goBack()}
          mode="contained"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
          }}
          labelStyle={{ color: "#000" }}>
          Cancel
        </Button>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <List.Item
            title={item.title}
            onPress={() =>
              navigate("SearchResults", {
                query: item.title,
              })
            }
            right={props => <List.Icon {...props} icon="chevron-right" />}
            style={{
              backgroundColor: "#fff",
            }}
          />
        )}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  );
};

export default Search;

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
