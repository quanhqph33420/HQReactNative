import React from "react";
import { NativeBaseProvider } from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

import ItemFavorite from "../../components/ItemFavorite";
import { useSelector, useDispatch } from "react-redux";
import { getProductFavorite } from "../../../src/redux/reducer/favoriteReducer";

export default function FavoriteProduct({ navigation }) {
  const data = useSelector((s) => s.favorite.data);
  const loading = useSelector((s) => s.favorite.loading);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(getProductFavorite());
    });
    return unsubscribe;
  }, [navigation]);

  function ListContainer() {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      dispatch(getProductFavorite());
    }, []);

    return (
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.push("ProductScreen", { itemId: item.idProduct })
                }
              >
                <ItemFavorite item={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <ListContainer />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemImage: {
    height: 200,
    width: "auto",
    resizeMode: "center",
    marginTop: 4,
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    height: 250,
  },
  itemName: {
    fontSize: 15,
    color: "#333",
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 10,
    marginLeft: 6,
  },
  itemPrice: {
    fontWeight: "500",
    color: "red",
    marginLeft: 6,
    marginBottom: 10,
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#333",
    marginRight: 6,
  },
});
