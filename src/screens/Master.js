import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { View, Image, StyleSheet, ScrollView, Linking, TouchableOpacity, TouchableHighlight } from 'react-native';
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

      <TouchableHighlight
        onPress={() => {
          navigation.navigate("NewEvent");
        }}
        underlayColor={themeColor.primary600}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          zIndex: 1,
          // backgroundColor: isDarkmode ? themeColor.black : themeColor.white,
          backgroundColor: themeColor.primary,
          borderRadius: 100,
          width: 75,
          height: 75,
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Ionicons
          // name={"add-circle"}
          // name={"add-circle-outline"}
          name={"add-outline"}
          // color={ isDarkmode ? themeColor.dark : themeColor.white }
          color={themeColor.white}
          // color={themeColor.primary}
          size={60}/>
      </TouchableHighlight>

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
          }}> Your Events </Text>

          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate("NewEvent");
            }}
            style={{
              marginLeft: "auto",
              marginVertical: 'auto',
            }}>
            <Ionicons
              // name={"add-circle"}
              name={"add-circle-outline"}
              // name={"add-outline"}
              size={30}
              color={ isDarkmode ? themeColor.white : themeColor.black }/>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Settings");
            }}
            style={{
              marginVertical: 'auto',
              marginLeft: 5,
              marginLeft: "auto",
            }}>
            <Ionicons
              // name={"add-circle"}
              // name={"add-circle-outline"}
              name={"ellipsis-vertical"}
              size={25}
              color={ isDarkmode ? themeColor.white : themeColor.black }/>
          </TouchableOpacity>

      </View>
        
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center"
        }}>

        <EventEntry eventTitle = "Camping Trip" eventType = "Bingo" eventEnd = {1731706636217}/>
        <EventEntry eventTitle = "Pickle Ball Tournament" eventType = "Classic" eventEnd = {1721736646217}/>
        <EventEntry eventTitle = "9/11 Hangout" eventType = "Classic" eventEnd = {1721706646317}/>
        <EventEntry eventTitle = "Zumba Class Dinner" eventType = "Classic" eventEnd = {1721703646217}/>
        <EventEntry eventTitle = "Thanksgiving Party" eventType = "Bingo" eventEnd = {1721706636217}/>
        <EventEntry eventTitle = "P. D. Dy Party" eventType = "Classic" eventEnd = {172136646217}/>
        <EventEntry eventTitle = "Dhoti Function" eventType = "Bingo" eventEnd = {1721703646217}/>

      </ScrollView>
    </Layout>
  );
}
