import React, { useEffect } from "react";
import {
  HStack,
  Avatar,
  NativeBaseProvider,
  Center,
  View,
  AlertDialog,
  Button,
} from "native-base";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Storage from "../../api/Storage";
export default function UserScreen({ navigation }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  useEffect(() => {
    navigation.setOptions({
      title: "Profile",
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("allChat")}>
          <MaterialIcons color="#877E7E" name="message" size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const ShowDialog = () => {
    const cancelRef = React.useRef(null);
    return (
      <Center>
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Log out</AlertDialog.Header>
            <AlertDialog.Body>
              Are you sure you want to log out?
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={async function () {
                    setIsOpen(false);
                    await Storage.setData("@keyUser", "");
                    console.log("Removed key");
                    navigation.navigate("SignIn");
                  }}
                >
                  Log out
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </Center>
    );
  };
  function Body() {
    return (
      <ScrollView style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("profile")}>
          <View style={styles.bodyContainer}>
            <Avatar
              bg="amber.500"
              size={12}
              source={require("../../src/main.jpg")}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Hoàngg Quânn
              </Text>
              <Text>View my profile</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.line} />
        {/* history */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.item}>
              <MaterialIcons name="history" size={30} />
              <Text style={styles.textItem}>History</Text>
            </View>
            <MaterialIcons name="arrow-right" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* Address */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.item}>
              <MaterialIcons name="location-city" size={30} />
              <Text style={styles.textItem}>Address</Text>
            </View>
            <MaterialIcons name="arrow-right" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* Card */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.item}>
              <MaterialIcons name="credit-card" size={30} />
              <Text style={styles.textItem}>Payment Method</Text>
            </View>
            <MaterialIcons name="arrow-right" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* Favorite */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("favorite")}
          >
            <View style={styles.item}>
              <AntDesign name="hearto" size={30} />
              <Text style={styles.textItem}>Favorite</Text>
            </View>
            <MaterialIcons name="arrow-right" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        {/* Help */}
        <View style={styles.menu}>
          <TouchableOpacity style={styles.item}>
            <View style={styles.item}>
              <MaterialIcons name="help" size={30} />
              <Text style={styles.textItem}>Help</Text>
            </View>
            <MaterialIcons name="arrow-right" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        {/* Log out */}
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => setIsOpen(!isOpen)}
          >
            <View style={styles.item}>
              <MaterialIcons name="logout" size={30} />
              <Text style={styles.textItem}>Log out</Text>
            </View>
            <MaterialIcons name="arrow-right" size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </ScrollView>
    );
  }
  return (
    <NativeBaseProvider>
      <Body />
      <ShowDialog />
    </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  bodyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },
  menu: {
    marginLeft: 8,
    paddingVertical: 3,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
  line: {
    backgroundColor: "#333",
    height: 1,
    marginHorizontal: 8,
    marginVertical: 10,
    opacity: 0.5,
  },
});
