import { Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useState } from "react";
import { Input, Icon, Center, NativeBaseProvider, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import validate from "../validate";
import api from "./api";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState([]);
  async function goToVerify() {
    if (validate.validateEmail(email)) {
      let result = await api.findEmail({ email: email });
      if (result != "") {
        navigation.navigate("verifyPassword", { email: email });
      } else {
        Toast("Don't find email!");
      }
    } else {
      Toast("Email invalid!");
    }
  }
  function Toast(data) {
    ToastAndroid.showWithGravityAndOffset(
      data,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  return (
    <NativeBaseProvider>
      <Text style={styles.Textheader}>Find account</Text>
      <Text style={styles.textBody}>Input your email</Text>
      <Center mt={7} style={styles.margin}>
        <Input
          w={{ base: "90%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={6} ml="2" />
          }
          placeholder="Email"
          onChangeText={(newText) => setEmail(newText)}
        />
        <Button w="90%" mt={5} borderRadius={20} onPress={goToVerify}>
          Send OTP
        </Button>
      </Center>
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  Textheader: {
    marginLeft: 20,
    fontSize: 25,
    fontWeight: "700",
  },
  textBody: {
    marginLeft: 20,
    marginTop: 5,
    opacity: 0.8,
  },
});
