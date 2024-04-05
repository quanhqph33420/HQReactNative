import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import color from "../../src/color";
import api from "./api";

export default function Welcome({ navigation }) {
  async function verifyLogin() {
    const info = await api.decryptionLogin();
    if (info) {
      const login = await api.login(info);
      login ? navigation.navigate("Main") : navigation.navigate("SignIn");
    } else {
      navigation.navigate("SignIn");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("../../src/welcomeImg.png")} />
      <Text style={styles.textHeader}>Welcome To My App</Text>
      <Text style={styles.textBody}>Họ tên: Hoàng Quốc Quân</Text>
      <Text style={styles.textBody}>Mã sinh viên : PH33420</Text>

      <TouchableOpacity onPress={verifyLogin}>
        <View style={styles.containerBtn}>
          <Text style={styles.btnStart}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 350,
    resizeMode: "contain",
  },
  textHeader: {
    fontWeight: "800",
    fontSize: 30,
    marginVertical: 10,
  },
  textBody: {
    marginHorizontal: 20,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "700",
  },
  btnStart: {
    fontSize: 16,
    color: "#fff",
  },
  containerBtn: {
    backgroundColor: color.DarkViolet,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 50,
  },
});
