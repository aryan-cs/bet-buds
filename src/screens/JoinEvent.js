import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
  TextInput
} from "react-native-rapi-ui";

import { addNewMember } from '../provider/BaseProvider';

export default function ({ navigation }) {

  const auth = getAuth();
  const { isDarkmode, setTheme } = useTheme();
  const [joinCode, setJoinCode] = useState("");

  const notFound = () => { return Alert.alert("Event Not Found", "Please enter a valid event code.", [{text: 'OK'}]); }

  const joinEvent = async () => {
    if (!joinCode.trim()) { notFound(); }
    else { await addNewMember(joinCode, getAuth().currentUser.uid); navigation.goBack(); }
  };
  
  return (
    <Layout>
        <Text
          size="h1"
          fontWeight="bold"
          style={{
            marginLeft: 20,
          }}>
            Join event
        </Text>
        
      <ScrollView
        bounces="false"
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 20,

        }}>
          <TextInput
            containerStyle={{
              marginTop: "auto",
              paddingHorizontal: 10,
              marginHorizontal: 60,
              paddingVertical: 15,
            }}
            placeholder="XXXXXX"
            textAlign="center"
            fontSize={25}
            letterSpacing={5}
            maxLength={6}
            autoCapitalize={"characters"}
            fontWeight="bold"
            onChangeText={(value) => { setJoinCode(value.toUpperCase()) }}
          />
          <Button
            text="Join Event"
            onPress={joinEvent}
            type="TouchableHighlight"
            underlayColor={themeColor.primary600}
            style={{
              marginTop: 20,
              marginBottom: "auto",
              marginHorizontal: 100,
              paddingVertical: 15,             
            }}
          />
      </ScrollView>
  </Layout>
  );
}