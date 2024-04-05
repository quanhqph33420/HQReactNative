import { Text, StyleSheet, ToastAndroid } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input, Icon, Center, NativeBaseProvider, Button } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import api from "./api";
import Storage from "../../../key/Storage";

export default function VerifyScreen({ navigation, route }) {
  const email = route.params.email;
  const [time, setTime] = useState(300);
  const otp = useRef();
  const text = useRef();

  async function createOtp() {
    otp.current = await api.createOtp(email);
  }

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [time]);

  useEffect(() => {
    var timer;
    const subscribe = navigation.addListener("focus", async (e) => {
      await createOtp();
      console.log("In");
      timer = setInterval(() => {
        setTime((t) => {
          if (t > 0) {
            return t - 1;
          } else {
            createOtp();
            console.log("Reset time");
            setTime(300);
          }
        });
      }, 1000);
    });
    const unsubscribe = navigation.addListener("blur", () => {
      console.log("Out");
      clearInterval(timer);
      setTime(300);
    });
    return () => {
      subscribe();
      unsubscribe();
    };
  }, [navigation]);

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
      <Text style={styles.textBody}>
        Time remaing before reset: {formattedTime}
      </Text>
      <Text style={styles.textBody}>Check Email: {email}</Text>
      <Center mt={7} style={styles.margin}>
        <Input
          w={{ base: "90%", md: "100%" }}
          size={12}
          InputLeftElement={
            <Icon as={<MaterialIcons name="code" />} size={6} ml="2" />
          }
          placeholder="OTP"
          onChangeText={(newText) => (text.current = newText)}
        />
        <Button
          w="90%"
          mt={5}
          borderRadius={20}
          onPress={async () => {
            if (text.current == otp.current) {
              await Storage.setData("@emailResetPassword", email);
              console.log("Saved email");
              navigation.navigate("resetPassword");
            } else {
              Toast("Otp invalid!");
            }
          }}
        >
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
