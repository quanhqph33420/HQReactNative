import React from "react";
import { Avatar, HStack, Center, NativeBaseProvider } from "native-base";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  FlatList,
} from "react-native";
import SliderShow from "./components/SliderShow";
import ItemProduct from "./components/ItemProduct";
import ItemFavorite from "./components/ItemFavorite";
import { MaterialIcons } from "@expo/vector-icons";
import Storage from "../key/Storage";
import { ipRecent } from "@env";
import api from "./api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../src/redux/reducer/searchReducer";

export default function HomeScreen({ navigation }) {
  const data = useSelector((s) => s.product.data);
  const loading = useSelector((s) => s.product.loading);
  const [recent, setRecent] = React.useState([]);
  const dispatch = useDispatch();

  async function getRecent() {
    try {
      const id = await Storage.getData("@infoUser");
      let { data } = await axios.get(`${ipRecent}/getRecent?id=${id}`);
      setRecent(data);
    } catch (error) {
      console.log("getRecent: " + error);
    }
  }

  React.useEffect(() => {
    dispatch(getProducts());
  }, []);

  function NavigationBar() {
    return (
      <HStack
        justifyContent="space-between"
        px="3"
        padding="2"
        marginTop="10"
        alignItems="center"
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>Main</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              padding: 5,
            }}
            onPress={() => {
              navigation.push("ListProducts");
            }}
          >
            <MaterialIcons
              style={styles.icon}
              color="#878787"
              name="search"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("Cart");
            }}
            style={{
              borderRadius: 30,
              padding: 5,
              marginRight: 10,
            }}
          >
            <MaterialIcons
              style={styles.icon}
              color="#878787"
              name="shopping-cart"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.push("user");
            }}
          >
            <Avatar
              bg="amber.500"
              size={10}
              source={require("../src/main.jpg")}
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
      dispatch(getProducts());
    }, []);

    const shirt = data.filter((e) => e.productType == "shirt");
    const pants = data.filter((e) => e.productType == "pants");
    const shoes = data.filter((e) => e.productType == "shoes");

    return (
      <View style={{ marginBottom: 10 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{ marginBottom: 80 }}
          >
            <SliderShow />
            <Text style={styles.textHeader}>Shirts</Text>
            <FlatList
              data={shirt}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={async () => {
                    const idUser = await Storage.getData("@infoUser");
                    let result = await api.addRecent({
                      idUser: idUser,
                      id: item._id,
                      name: item.productName,
                      img: item.imageUri,
                      price: item.info[0].price,
                      sold: item.sold,
                      rate: item.rating,
                    });

                    navigation.push("ProductScreen", { itemId: item._id });
                  }}
                >
                  <ItemProduct item={item} />
                </TouchableOpacity>
              )}
            />

            <Text style={styles.textHeader}>Pants</Text>
            <FlatList
              data={pants}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={async () => {
                    const idUser = await Storage.getData("@infoUser");
                    let result = await api.addRecent({
                      idUser: idUser,
                      id: item._id,
                      name: item.productName,
                      img: item.imageUri,
                      price: item.info[0].price,
                      sold: item.sold,
                      rate: item.rating,
                    });

                    navigation.push("ProductScreen", { itemId: item._id });
                  }}
                >
                  <ItemProduct item={item} />
                </TouchableOpacity>
              )}
            />

            <Text style={styles.textHeader}>Shoes</Text>
            <FlatList
              data={shoes}
              horizontal={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={async () => {
                    const idUser = await Storage.getData("@infoUser");
                    let result = await api.addRecent({
                      idUser: idUser,
                      id: item._id,
                      name: item.productName,
                      img: item.imageUri,
                      price: item.info[0].price,
                      sold: item.sold,
                      rate: item.rating,
                    });

                    navigation.push("ProductScreen", { itemId: item._id });
                  }}
                >
                  <ItemProduct item={item} />
                </TouchableOpacity>
              )}
            />
            <View style={[styles.row, { marginBottom: 10 }]}>
              <Text style={styles.textHeader}>Recent</Text>
              <TouchableOpacity
                style={{ marginTop: 12 }}
                onPress={async () => {
                  let idUser = await Storage.getData("@infoUser");
                  let result = await api.removeRecent(idUser);
                  if (result) {
                    await getProducts();
                  }
                }}
              >
                <Text>Clear recent</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recent}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("ProductScreen", {
                      itemId: item.idProduct,
                    });
                  }}
                >
                  <ItemFavorite item={item} />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
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
  textHeader: {
    fontSize: 25,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 15,
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
  },
});
