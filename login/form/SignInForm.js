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
import color from "../../src/color";
import User from "../../model/userModel";
import API from "../../api/APILogin";
import Storage from "../../api/Storage";

export default function SignInForm({ navigation }) {
  const user = new User.user();
  user.username = "";
  user.password = "";

  function Toast(data) {
    ToastAndroid.showWithGravityAndOffset(
      data,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
  function InputForm() {
    const [show, setShow] = React.useState(false);
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
          type={show ? "text" : "password"}
          size={12}
          InputRightElement={
            <Pressable onPress={() => setShow(!show)}>
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
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
      </Stack>
    );
  }

  async function signIn() {
    if (user.username == "" || user.password == "") {
      Toast("Username or Password empty!");
    } else {
      const result = await API.signIn(user);
      if (result != "") {
        await Storage.storeData("@infoUser", result);
        //day len sever de lay chuoi ma hoa jwt
        navigation.navigate("Main");
      } else {
        Toast("Username or Password incorrect!");
      }
    }
  }

  function ButtonForm() {
    return (
      <Box style={styles.margin}>
        <Button style={{ marginVertical: 10 }} onPress={signIn}>
          Sign In
        </Button>
        <Text style={{ textAlign: "center" }}>or</Text>
        <Button style={{ marginVertical: 10 }} onPress={() => {}}>
          Sign In with Google
        </Button>
      </Box>
    );
  }

  return (
    <NativeBaseProvider>
      <Center style={styles.margin}>
        <InputForm />
      </Center>
      <TouchableOpacity>
        <Text style={[styles.margin, styles.text]}>Forgot Password?</Text>
      </TouchableOpacity>
      <ButtonForm />
      <View style={styles.containerText}>
        <Text>Don't have account?</Text>
        <TouchableOpacity onPress={() => navigation.push("SignUp")}>
          <Text style={{ color: color.Teal, marginHorizontal: 5 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
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
