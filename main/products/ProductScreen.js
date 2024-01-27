import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Image,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import React from "react";
const { width, height } = Dimensions.get("window");
import color from "../../src/color";
import axios from "axios";
const url = color.url;
import {
  Actionsheet,
  useDisclose,
  Box,
  Center,
  NativeBaseProvider,
} from "native-base";

export default function ProductScreen({ route, navigation }) {
  const itemId = route.params;
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclose();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getItem();
  }, []);

  const getItem = async () => {
    try {
      const response = await axios.post(`${url}getItemProduct`, itemId);
      const json = response.data;
      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  React.useEffect(() => {
    getItem();
  }, []);

  function ActionSheetView() {
    return (
      <Center>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={200}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: data[0].imageUri }}
                  height={150}
                  width={150}
                  resizeMode="center"
                />
                <View style={{ marginTop: 90 }}>
                  <Text style={{ color: "red", fontSize: 18 }}>₫2900000</Text>
                  <Text
                    style={{ opacity: 0.6, fontSize: 13, marginVertical: 10 }}
                  >
                    Quantity: 2
                  </Text>
                </View>
              </View>
              <View
                style={{ backgroundColor: "black", opacity: 0.1, height: 1 }}
              />
              <View style={{ margin: 10 }}>
                <Text>Size</Text>
                
              </View>
            </Box>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    );
  }
  function NavigationBar() {
    return (
      <ImageBackground
        style={{ height: 400 }}
        source={{ uri: data[0].imageUri }}
        stretch
        resizeMode="cover"
      >
        <View style={[styles.containerBar, styles.container]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              color="#fff"
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.containerBar}>
            <TouchableOpacity>
              <MaterialIcons
                style={styles.icon}
                color="#fff"
                name="share"
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                style={styles.icon}
                color="#fff"
                name="shopping-cart"
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons
                style={styles.icon}
                color="#fff"
                name="chat"
                size={25}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
  function eArabic(x) {
    return parseInt(x).toLocaleString("en-ES");
  }
  function Body() {
    return (
      <View>
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.priceD]}>₫</Text>
            <Text style={styles.price}>{eArabic(data[0].info[0].price)}</Text>
          </View>
          <Text style={styles.border}> Buy to received gift</Text>
        </View>
        {/*  */}
        <View style={{ margin: 10, flexDirection: "row" }}>
          <Text style={styles.like}> Favorite+ </Text>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{ marginRight: 10, fontSize: 18 }}
          >
            {data[0].productName}
          </Text>
        </View>
        {/*  */}
        <View style={styles.star}>
          <MaterialIcons name="star" color="#ADFF2F" size={20} />
          <Text> {data[0].rating} /5 </Text>
          <Text style={{ opacity: 0.2 }}> | </Text>
          <Text>Sold {data[0].sold}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.voucher}>
          <Text>Voucher of shop</Text>
          <MaterialIcons name="arrow-right" size={24} />
        </View>
        <View style={styles.line} />
        <View style={styles.voucher}>
          <Text>SPayLater</Text>
          <MaterialIcons name="arrow-right" size={24} />
        </View>
        <View style={styles.line} />
        <View style={{ paddingVertical: 15, paddingHorizontal: 10 }}>
          <Text>Transport fee $0</Text>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ opacity: 0.5 }}>
              Free shipping for orders from $100.000
            </Text>
            <Text style={{ opacity: 0.5 }}>
              Receive goods as soon as possible
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.voucher}>
          <Text>Products details</Text>
          <MaterialIcons name="arrow-right" size={24} />
        </View>
        <View style={styles.line} />
      </View>
    );
  }
  function ButtonForm() {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
      >
        <TouchableOpacity
          style={{ backgroundColor: "green", width: width * 0.5, height: 40 }}
          onPress={onOpen}
        >
          <MaterialIcons
            style={{ textAlign: "center", marginTop: 6 }}
            name="shopping-cart"
            color="#fff"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: width * 0.5,
            backgroundColor: "violet",
            height: 40,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff", marginTop: 10 }}>
            Buy now
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <NativeBaseProvider>
          <NavigationBar />
          <Body />
          <ButtonForm />
          <ActionSheetView />
        </NativeBaseProvider>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  containerBar: {
    flexDirection: "row",
    marginHorizontal: 5,
    marginVertical: 15,
    alignItems: "center",
  },
  container: {
    justifyContent: "space-between",
  },
  icon: {
    backgroundColor: "#877E7E",
    borderRadius: 20,
    marginHorizontal: 5,
    padding: 5,
  },
  border: {
    width: 97,
    marginVertical: 5,
    padding: 1,
    borderColor: "red",
    borderWidth: 1,
    color: "red",
    fontSize: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: "red",
  },
  like: {
    width: 54,
    height: 17,
    marginRight: 5,
    fontSize: 11,
    color: "#fff",
    fontWeight: "700",
    backgroundColor: "red",
    marginTop: 4,
  },
  star: {
    flexDirection: "row",
    margin: 10,
  },
  voucher: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  line: {
    backgroundColor: "#877E7E",
    height: 20,
    opacity: 0.1,
  },
  priceD: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "700",
    color: "red",
  },
});
