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
          }}> Your Events </Text>

          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("New");
            }}
            style={{
              marginLeft: "auto",
              marginVertical: 'auto',
            }}>
            <Ionicons
              // name={"add-circle"}
              // name={"add-circle-outline"}
              name={"add-outline"}
              size={40}
              color={
                isDarkmode ? themeColor.white : themeColor.black
              }/>
          </TouchableOpacity>

      </View>
        
      <ScrollView
        // style={{
        //   flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
          // marginHorizontal: 20,
        // }}
        contentContainerStyle={{
          flexGrow: 1,
          // alignItems: "center",
          alignContent: "center"
        }}
      >
        {/* <Section> */}
          {/* <SectionContent> */}

            <EventEntry eventTitle = "Camping Trip" eventType = "bingo" eventEnd = {1731706636217}/>
            <EventEntry eventTitle = "Pickle Ball Tournament" eventType = "classic" eventEnd = {1721736646217}/>
            <EventEntry eventTitle = "9/11 Hangout" eventType = "classic" eventEnd = {1721706646317}/>
            <EventEntry eventTitle = "Zumba Class Dinner" eventType = "classic" eventEnd = {1721703646217}/>
            <EventEntry eventTitle = "Thanksgiving Party" eventType = "bingo" eventEnd = {1721706636217}/>
            <EventEntry eventTitle = "P. D. Dy Party" eventType = "classic" eventEnd = {172136646217}/>
            <EventEntry eventTitle = "Dhoti Function" eventType = "bingo" eventEnd = {1721703646217}/>

            {/* <Text fontWeight="bold" style={{ textAlign: "center" }}>
              This is the create tab, where you can create a parlay for an event.
            </Text>
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            /> */}
            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
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
          {/* </SectionContent> */}
        {/* </Section> */}
      </ScrollView>
    </Layout>
  );
}
