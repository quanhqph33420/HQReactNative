import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import SignInForm from "./form/SignInForm";
import Color from "../src/color";

export default function SignInScreen({ navigation }) {
  return (
    <ScrollView>
      {/* header */}
      <View style={styles.header}>
        <Image source={require("../src/img_main.png")} style={styles.image} />
        <Text style={styles.textBig}>Welcome back</Text>
        <Text style={styles.textSmall}>Sign in to continue</Text>
      </View>
      {/* body */}
      <View style={styles.body}>
        <SignInForm navigation={navigation} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  image: {
    width: 170,
    height: 170,
    objectFit: "contain",
  },
  textBig: {
    fontSize: 35,
    fontWeight: "bold",
    color: Color.DarkViolet,
  },
  textSmall: {
    color: Color.Teal,
  },
  body: {
    marginTop: 50,
  },
});
