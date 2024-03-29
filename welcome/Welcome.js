import { Text, View, Image, TouchableOpacity } from "react-native";
import color from "../src/color";
import Storage from "../api/Storage";
import axios from "axios";

export default function Welcome({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={{ width: 250, height: 350, resizeMode: "contain" }}
        source={require("../src/welcomeImg.png")}
      />
      <Text style={{ fontWeight: "800", fontSize: 30, marginVertical: 10 }}>
        Welcome To My App
      </Text>
      <Text
        style={{
          marginHorizontal: 20,
          fontSize: 16,
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Welcome to our top notch fashion shopping app where confidence meets
        style !
      </Text>

      <TouchableOpacity
        onPress={async () => {
          const token = await Storage.getData("@keyUser");
          token
            ? await axios
                .post(`${color.login}decryptionLogin`, {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                  },
                })
                .then(async (result) => {
                  await axios
                    .post(`${color.login}signIn`, result.data)
                    .then((result) => {
                      result != ""
                        ? navigation.navigate("Main")
                        : navigation.navigate("SignIn");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                })
            : navigation.navigate("SignIn");
        }}
      >
        <View
          style={{
            backgroundColor: color.DarkViolet,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 10,
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 16, color: "#fff" }}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
