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
import { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import color from "../../src/color";

export default function SignUpForm({ navigation }) {
  const [text, setText] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const InputForm = () => {
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
        />
        <Input
          w={{ base: "100%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="email" />} size={6} ml="2" />
          }
          placeholder="Email"
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
        />
      </Stack>
    );
  };
  const ButtonForm = () => {
    return (
      <Box style={styles.margin}>
        <Button
          style={{ marginVertical: 10 }}
          onPress={() => console.log("hello world")}
        >
          Sign In
        </Button>
      </Box>
    );
  };
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
        <Text>If have account?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={{ color: color.Teal, marginHorizontal: 5 }}>
            Sign In
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
