import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import SignUpForm from "./form/SignUpForm";
import Color from "../src/color";

export default function SignUpScreen({ navigation }) {
  return (
    <ScrollView>
      {/* header */}
      <View style={styles.header}>
        <Image style={styles.image} source={require("../src/signUpImg.png")} />
        <Text style={styles.textBig}>Create account</Text>
        <Text style={styles.textSmall}>Create account to login</Text>
      </View>
      {/* body */}
      <View style={styles.body}>
        <SignUpForm navigation={navigation} />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 4,
    marginTop: 30,
    alignItems: "center",
  },
  image: {
    width: 200,
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
    flex: 6,
    marginTop: 50,
  },
});
