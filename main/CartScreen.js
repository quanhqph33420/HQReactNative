import React from "react";
import {
  Avatar,
  HStack,
  Center,
  NativeBaseProvider,
  Button,
} from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import color from "../src/color";
import axios from "axios";
import Storage from "../api/Storage";
import ItemCart from "../welcome/ItemCart";
import API from "../api/ShoppingCart";
import { MaterialIcons } from "@expo/vector-icons";
import { set } from "mongoose";

export default function CartScreen({ navigation }) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [price, setPrice] = React.useState(0);
  const listItem = [];

  const url = color.cart;
  function Toast(data) {
    ToastAndroid.showWithGravityAndOffset(
      data,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  async function getData() {
    const id = await Storage.getData("@infoUser");
    await axios
      .post(`${url}getProductCart`, { id_: id })
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  React.useEffect(() => {
    getData();
  }, []);

  async function deleteProduct() {
    const listFilter = listItem.filter((val) => val.status);
    const idUser = await Storage.getData("@infoUser");
    if (listFilter.length != 0) {
      listFilter.push({ idUser: idUser });
      const result = await API.removeProduct(listFilter);
      if (result != 0) {
        Toast(`You delete ${result} product!`);
        await getData();
      } else Toast("You don't selected product!");
    } else Toast("You don't selected product!");
  }

  function NavigationBar() {
    return (
      <HStack
        justifyContent="space-around"
        px="3"
        padding="2"
        marginTop="10"
        alignItems="center"
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={30} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={deleteProduct}
          style={{ marginHorizontal: 10 }}
        >
          <MaterialIcons name="delete" size={30} color="#878787" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => {
            navigation.navigate("user");
          }}
        >
          <Avatar
            bg="amber.500"
            size={10}
            source={require("../src/main.jpg")}
          />
        </TouchableOpacity>
      </HStack>
    );
  }

  function ListItem() {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await getData();
    }, []);

    function addListItem(price, id, status) {
      const checkItem = listItem.filter((val) => val.id == id);
      if (checkItem == 0) {
        listItem.push({ id: id, price: price, status: status });
      } else {
        const index = listItem.findIndex((val) => val.id == id);
        listItem[index] = { id: id, price: price, status: status };
      }
      let total = 0;
      const list = listItem.filter((val) => val.status == true);
      list.map((val) => (total += val.price));
      setPrice(total);
    }
    return (
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data[0]}
            renderItem={({ item }) => (
              <ItemCart item={item} onQuantityChange={addListItem} />
            )}
          />
        )}
        {loading ? (
          console.log()
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 20,
            }}
          >
            <View style={{ marginLeft: 10, flexDirection: "row" }}>
              <Text style={{ opacity: 0.6, marginTop: 4 }}>Total price </Text>
              <Text style={{ fontSize: 18, color: "red" }}>₫{price}</Text>
            </View>
            <Button w="30%" marginRight={2}>
              Buy
            </Button>
          </View>
        )}
      </View>
    );
  }

  return (
    <NativeBaseProvider>
      <Center>
        <NavigationBar />
      </Center>
      <ListItem />
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
