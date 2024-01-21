import React from "react";
import { Avatar, HStack, Center, NativeBaseProvider } from "native-base";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function CartScreen() {
  function NavigationBar() {
    return (
      <HStack
        justifyContent="space-around"
        px="3"
        padding="2"
        marginTop="10"
        alignItems="center"
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", flex: 1 }}>Cart</Text>

        <TouchableOpacity style={{ marginLeft: 5 }}>
          <Avatar
            bg="amber.500"
            size={10}
            source={require("../src/main.jpg")}
          />
        </TouchableOpacity>
      </HStack>
    );
  }
  return (
    <NativeBaseProvider>
      <Center>
        <NavigationBar />
      </Center>
  
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
