import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { View, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  SectionImage,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import EventEntry from "../components/EventEntry";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  return (
    <Layout>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 15
        }}>
        <Text
          size="h1"
          fontWeight="bold"
          style={{
            paddingBottom: 5,
          }}> Settings </Text>
      </View>
        
      <ScrollView
        bounces="false"
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 15
        }}>

        <Button
          text={isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          status={isDarkmode ? "black100" : "primary"}
          type="TouchableHighlight"
          underlayColor={isDarkmode ? themeColor.black200 : themeColor.primary600}
          onPress={() => {
            if (isDarkmode) {
              setTheme("light");
            } else {
              setTheme("dark");
            }
          }}
          style={{
            marginTop: 10,
          }}
        />
        <Button
          status="danger"
          text="Logout"
          type="TouchableHighlight"
          underlayColor={themeColor.danger600}
          onPress={() => {
            signOut(auth);
          }}
          style={{
            marginTop: 10,
          }}
        />
      </ScrollView>
    </Layout>
  );
}
