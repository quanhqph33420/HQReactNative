import { SafeAreaView, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import io from "socket.io-client";
import Storage from "../../../key/Storage";
import { GiftedChat } from "react-native-gifted-chat";
import { ipChat, ip } from "@env";
const socket = io(ip);

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUser = async function (id) {
    return await axios
      .get(`${ipChat}/getUser`, { params: { id: id } })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  };

  async function getUseArr(arr_id) {
    await axios
      .post(`${ipChat}/getUserArr`, arr_id)
      .then(async (result) => {
        await Storage.setData("@idMessage", result.data[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getFromServer();
  }, []);

  useEffect(() => {
    socket.on("returnMessage", (message) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, message)
      );
    });
  }, []);

  async function getFromServer() {
    let { receiver } = route.params; //receiver
    let sender = await Storage.getData("@infoUser"); //sender
    let result_sender = await getUser(sender);
    let result_receiver = await getUser(receiver);

    navigation.setOptions({
      title: result_receiver[0].fullname,
    });

    setSender(result_sender);
    const arr_id = [sender, receiver].sort();
    await setUser(arr_id);
    await getUseArr(arr_id);
    await getMessage();
    setLoading(false);
  }

  async function setUser(arr_id) {
    await axios
      .post(`${ipChat}/setUser`, arr_id)
      .then(async (result) => {
        if (result.data != "") {
          await axios.post(`${ipChat}/setSkeleton`, {
            id: result.data[0]._id,
            message: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getMessage() {
    let idMessage = await Storage.getData("@idMessage");
    await axios
      .get(`${ipChat}/getMessage`, {
        params: {
          id: idMessage,
        },
      })
      .then((result) => {
        if (result.data != 0) {
          const updatedMessages = result.data.map((element) => ({
            _id: element[0]._id,
            text: element[0].text,
            createdAt: element[0].createdAt,
            user: {
              _id: element[0].user._id,
              name: element[0].user.name,
              avatar: element[0].user.avatar,
            },
          }));
          setMessages(updatedMessages);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onSend = useCallback(async (messages = []) => {
    let idMessage = await Storage.getData("@idMessage");
    messages[0]._id = messages[0]._id + Math.floor(Math.random() * 1001);
    await axios
      .post(`${ipChat}/sendMessage`, {
        id: idMessage,
        messages: messages,
      })
      .then((result) => {
        socket.emit("sendMessage", result.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
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
          isTyping={false}
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
