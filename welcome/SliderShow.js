import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Swiper from "react-native-swiper";

const styles = StyleSheet.create({
  img: {
    resizeMode: "center",
    height: 200,
    width: "auto",
  },
});

export default function SliderShow() {
  return (
    <Swiper
      autoplay={true}
      height={200}
      style={styles.wrapper}
      showsButtons={true}
      
    >
      <View>
        <Image style={styles.img} source={require("../src/img_main.png")} />
      </View>
      <View>
        <Image style={styles.img} source={require("../src/img1.png")} />
      </View>
      <View>
        <Image style={styles.img} source={require("../src/signUpImg.png")} />
      </View>
      <View>
        <Image style={styles.img} source={require("../src/wse.png")} />
      </View>
    </Swiper>
  );
}
