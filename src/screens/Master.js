import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { View, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  SectionImage,
  useTheme,
} from "react-native-rapi-ui";
import EventEntry from "../components/EventEntry"

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  return (
    <Layout>

        <Text
          size="h1"
          fontWeight="bold"
          style={{
            marginLeft: 20,
            marginBottom: 5,
          }}>
            Your Events
          </Text>
        
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

            <EventEntry eventTitle = "Camping Trip" eventType = "classic" />
            <EventEntry eventTitle = "Pickle Ball Tournament" eventType = "classic" />
            <EventEntry eventTitle = "9/11 Hangout" eventType = "classic" />
            <EventEntry eventTitle = "Zumba Class Dinner" eventType = "classic" />
            <EventEntry eventTitle = "Thanksgiving Party" eventType = "bingo" />
            <EventEntry eventTitle = "P. D. Dy Party" eventType = "classic" />
            <EventEntry eventTitle = "Dhoti Function" eventType = "bingo" />

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
