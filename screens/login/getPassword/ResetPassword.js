import { StyleSheet, Text, ToastAndroid } from "react-native";
import React from "react";
import { Input, Icon, Center, NativeBaseProvider, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import Storage from "../../../key/Storage";
import validate from "../validate";
import api from "./api";
export default function ResetPassword({ navigation }) {
  const user = {
    password: "",
    confirmpassword: "",
  };

  function Toast(data) {
    ToastAndroid.showWithGravityAndOffset(
      data,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }

  async function resetPassword() {
    const email = await Storage.getData("@emailResetPassword");
    if (email) {
      if (validate.checkEmpty(user)) {
        Toast(validate.checkEmpty(user) + " is empty");
      } else if (user.password != user.confirmpassword) {
        Toast("Password and Confirm password diffirent!");
      } else {
        let result = await api.updatePassword({
          email: email,
          password: user.password,
        });
        if (result == 1) {
          Toast("Reset password complete");
          navigation.navigate("SignIn");
        }
      }
    }
  }

  return (
    <NativeBaseProvider>
      <Text style={styles.Textheader}>Reset password</Text>
      <Text style={styles.textBody}>Change password</Text>
      <Center>
        <Input
          mt={10}
          mb={3}
          w={{ base: "90%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="key" />} size={6} ml="2" />
          }
          placeholder="New password"
          onChangeText={(newText) => (user.password = newText)}
        />
        <Input
          w={{ base: "90%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="key" />} size={6} ml="2" />
          }
          placeholder="Confirm new password"
          onChangeText={(newText) => (user.confirmpassword = newText)}
        />
        <Button w="90%" my={5} onPress={resetPassword}>
          Confirm
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
