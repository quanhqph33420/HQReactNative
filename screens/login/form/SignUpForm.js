import React from "react";
import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  NativeBaseProvider,
  View,
  Box,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import color from "../../../src/color";
import api from "./api";
import validate from "../validate";

export default function SignUpForm({ navigation }) {
  var user = {
    username: "",
    email: "",
    fullname: "",
    phone: "",
    password: "",
  };
  var confirmPassword;

  function Toast(data) {
    ToastAndroid.showWithGravityAndOffset(
      data,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  // input
  function InputForm() {
    const [showPass, setShowPass] = React.useState(false);
    const [showConPass, setShowConPass] = React.useState(false);
    return (
      <Stack space={4} w="100%" alignItems="center">
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="person" />} size={7} ml="2" />
          }
          placeholder="Username"
          onChangeText={(newText) => (user.username = newText)}
        />

        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={6} ml="2" />
          }
          placeholder="Email"
          onChangeText={(newText) => (user.email = newText)}
        />
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="drive-file-rename-outline" />}
              size={6}
              ml="2"
            />
          }
          placeholder="Fullname"
          onChangeText={(newText) => (user.fullname = newText)}
        />
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="local-phone" />} size={6} ml="2" />
          }
          placeholder="Phone"
          onChangeText={(newText) => (user.phone = newText)}
        />
        {/*  */}
        <Input
          w={{ base: "100%", md: "100%" }}
          type={showPass ? "text" : "password"}
          size={12}
          InputRightElement={
            <Pressable onPress={() => setShowPass(!showPass)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPass ? "visibility" : "visibility-off"}
                  />
                }
                size={6}
                mr="2"
              />
            </Pressable>
          }
          InputLeftElement={
            <Icon as={<MaterialIcons name="lock" />} size={6} ml="2" />
          }
          placeholder="Password"
          onChangeText={(newText) => (user.password = newText)}
        />
        {/*  */}
        <Input
          w={{ base: "100%", md: "100%" }}
          type={showConPass ? "text" : "password"}
          size={12}
          InputRightElement={
            <Pressable onPress={() => setShowConPass(!showConPass)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showConPass ? "visibility" : "visibility-off"}
                  />
                }
                size={6}
                mr="2"
              />
            </Pressable>
          }
          InputLeftElement={
            <Icon as={<MaterialIcons name="lock" />} size={6} ml="2" />
          }
          placeholder="Confirm Password"
          onChangeText={(newText) => (confirmPassword = newText)}
        />
      </Stack>
    );
  }

  // button
  function ButtonForm() {
    async function signUp() {
      if (validate.checkEmpty(user)) {
        Toast(validate.checkEmpty(user).trim() + " is empty !");
      } else if (!validate.validateEmail(user.email)) {
        Toast("Email invalid!");
      } else if (!validate.validatePhone(user.phone)) {
        Toast("Phone number invalid!");
      } else if (user.password != confirmPassword) {
        Toast("Password and confirm Password different!");
      } else {
        const result = await api.signUp(user);
        if (result) {
          result == 1 ? Toast("Sign Up complete!") : Toast("Username exist!");
        }
      }
    }
    return (
      <Box style={styles.margin}>
        <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
          <Text style={[styles.margin, styles.text]}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button style={{ marginVertical: 10 }} onPress={signUp}>
          Sign Up
        </Button>
        <View style={styles.containerText}>
          <Text>If have account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text
              style={{
                color: color.Teal,
                marginHorizontal: 5,
                marginBottom: 30,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Box>
    );
  }
  //
  return (
    <NativeBaseProvider>
      <Center style={styles.margin}>
        <InputForm />
      </Center>
      <ButtonForm />
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 20,
  },
  text: {
    textAlign: "right",
    marginVertical: 8,
    color: color.Teal,
    fontSize: 12,
  },
  containerText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
