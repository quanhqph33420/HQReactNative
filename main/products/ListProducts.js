import React from "react";
import { Avatar, HStack, Center, NativeBaseProvider } from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

import { Input, Icon } from "native-base";
import color from "../../src/color";
import { MaterialIcons } from "@expo/vector-icons";
import ItemProduct from "../../welcome/ItemProduct";

export default function ListProducts({ navigation }) {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const url = color.url;

  async function getProducts() {
    try {
      const response = await fetch(`${url}getProducts`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getProducts();
  }, []);

  function NavigationBar() {
    return (
      <HStack px="3" padding="2" marginTop="10" alignItems="center">
        <View style={{ flexDirection: "row", flex: 1, marginRight: 5 }}>
          <View style={{ marginTop: 5, marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                backgroundColor: "#878787",
                borderRadius: 30,
                opacity: 0.9,
              }}
            >
              <MaterialIcons
                name="arrow-back"
                color="white"
                size={35}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <Input
            w={{
              base: "80%",
              md: "25%",
            }}
            variant="rounded"
            size={6}
            InputLeftElement={
              <Icon as={<MaterialIcons name="search" />} size={6} ml="3" />
            }
            placeholder="Search"
          />
          <TouchableOpacity style={{ marginLeft: 5 }}>
            <Avatar
              bg="amber.500"
              size={10}
              source={require("../../src/main.jpg")}
            />
          </TouchableOpacity>
        </View>
      </HStack>
    );
  }

  function ListContainer() {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await getProducts();
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
                  navigation.push("ProductScreen", { itemId: item._id })
                }
              >
                <ItemProduct item={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <Center>
        <NavigationBar />
      </Center>
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
