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
import SliderShow from "../welcome/SliderShow";
import ItemProduct from "../welcome/ItemProduct";
import color from "../src/color";

export default function HomeScreen({ navigation }) {
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
      <HStack
        justifyContent="space-between"
        px="3"
        padding="2"
        marginTop="10"
        alignItems="center"
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>Main</Text>
        <TouchableOpacity>
          <Avatar
            bg="amber.500"
            size={10}
            source={require("../src/main.jpg")}
          />
        </TouchableOpacity>
      </HStack>
    );
  }

  function ListContainer() {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await getProducts();
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
                  onPress={() =>
                    navigation.push("ProductScreen", { itemId: item._id })
                  }
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
                  onPress={() =>
                    navigation.push("ProductScreen", { itemId: item._id })
                  }
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
                  onPress={() =>
                    navigation.push("ProductScreen", { itemId: item._id })
                  }
                >
                  <ItemProduct item={item} />
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
});
