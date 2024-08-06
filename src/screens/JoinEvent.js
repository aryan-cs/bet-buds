import React, { useRef, useState } from "react";
import { View, ScrollView, Alert, StyleSheet,
  TextInput
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
  // TextInput
} from "react-native-rapi-ui";

import { addNewMember } from '../provider/BaseProvider';

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const joinCode = useRef("");
  const [fieldValue, setFieldValue] = useState();
  const [name, setName] = useState();

  const notFound = () => { return Alert.alert("Event Not Found", "Please enter a valid event code.", [{text: 'OK'}]); }

  const joinEvent = async () => {
    if (!joinCode.current.trim()) { notFound(); }
    else {
      await addNewMember(joinCode.current, getAuth().currentUser.uid);
      navigation.goBack();
    }
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
            style={{
              marginTop: "auto",
              paddingVertical: 15,
              marginHorizontal: 60,
              color: isDarkmode ? themeColor.gray : themeColor.gray,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: isDarkmode ? "#1f1f1f" : themeColor.white,
              color: isDarkmode ? "#dddddd" : themeColor.black,
              borderColor: isDarkmode ? "#333333" : "#d8d8d8",
            }}
            placeholderTextColor={isDarkmode ? "#575757" : themeColor.gray300}
            onFocusborderColor={isDarkmode ? "#7f7f7f" : "#c0c0c0"}
            placeholder="XXXXXX"
            textAlign="center"
            fontSize={25}
            letterSpacing={5}
            maxLength={6}
            autoCapitalize="characters"
            fontWeight="bold"
            autoCorrect={false}
            value={fieldValue}
            onChangeText={(value) => {
              setFieldValue(value.toUpperCase())
              joinCode.current = value.toUpperCase();
            }}
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