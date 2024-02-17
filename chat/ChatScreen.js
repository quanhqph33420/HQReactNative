import {
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import color from "../src/color";
import Storage from "../api/Storage";
import { GiftedChat } from "react-native-gifted-chat";
const url = color.chat;
const json_server = color.json_server;

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [loading, setLoading] = useState([]);
  const [data, setData] = useState([]);
  const [loadMess, setLoadMess] = useState(true);
  const [userInArr, setUserInArr] = useState([]);

  const getUser = async function (id) {
    return await axios
      .get(`${url}getUser`, { params: { id: id } })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  };

  async function getUseArr(arr_id) {
    await axios
      .post(`${url}getUseArr`, arr_id)
      .then((result) => {
        setUserInArr(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let { receiver } = route.params; //receiver
      let sender = await Storage.getData("@infoUser"); //sender
      let result_sender = await getUser(sender);
      let result_receiver = await getUser(receiver);

      navigation.setOptions({
        title: result_receiver[0].fullname,
      });

      setReceiver(result_receiver);
      setSender(result_sender);
      const arr_id = [sender, receiver].sort();
      await getUseArr(arr_id);
      await axios
        .post(`${url}setUser`, arr_id)
        .then(async (result) => {
          if (result.data != "") {
            await axios.post(`${url}setSkeleton`, {
              id: result.data[0]._id,
              messages: [],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          showUserAvatar
          user={{
            _id: sender[0]._id,
            avatar: sender[0].avatar,
            name: sender[0].fullname,
          }}
        />
      )}
    </SafeAreaView>
  );
}
