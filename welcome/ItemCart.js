import React from "react";
import { HStack, Checkbox, NativeBaseProvider, View } from "native-base";
import { Image, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function ItemCart() {
  return (
    <NativeBaseProvider>
      <HStack margin={2}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Checkbox marginX={3} value="test" aria-label="checkbox" />
          <Image
            style={{ width: 100, height: 100 }}
            source={require("../src/main.jpg")}
          />
        </View>
        <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
          <Text ellipsizeMode="tail" numberOfLines={1}>
            500gr đậu phộng da cá :33
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#E9E5E5",
              padding: 3,
              flexDirection: "row",
              alignItems: "center",
              width: 125,
              opacity: 0.8,
              marginVertical: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>Phân loại 500gr :33 </Text>
            <MaterialIcons name="keyboard-arrow-down" />
          </TouchableOpacity>
          <Text style={{ color: "red", marginVertical: 3 }}>₫90.0000</Text>
        </View>
      </HStack>
    </NativeBaseProvider>
  );
}
