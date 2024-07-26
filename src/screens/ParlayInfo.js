import React from "react";
import { View, ScrollView } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  
  return (
    // lowkey this is all wrong its not supposed to show this its supposed to show a list of bets...
    <Layout>
      <Text
        size="h1"
        fontWeight="bold"
        numberOfLines={4}
        adjustsFontSizeToFit={true}
        style={{
          marginHorizontal: 20,
          fontSize: 50,
          marginTop: 100,
        }}>
          Sid doesn't get freaky
      </Text>

      <Text
        size="h1"
        fontWeight="bold"
        style={{
          marginHorizontal: 20,
          fontSize: 100,
          marginLeft: "auto",
          color: themeColor.primary,
          marginTop: "auto"
        }}>
          +100
      </Text>

      <Text
        size="h1"
        fontWeight="bold"
        italic="true"
        style={{
          marginHorizontal: 20,
          fontSize: 35,
          marginLeft: "auto",
          color: isDarkmode ? "#7f7f7f" : "#c0c0c0",
          marginTop: "auto",
        }}>
          hard
      </Text>
        
      <Text
        size="h1"
        fontWeight="bold"
        italic="true"
        style={{
          marginHorizontal: 20,
          fontSize: 35,
          marginLeft: "auto",
          color: isDarkmode ? themeColor.primary : themeColor.danger400,
        }}>
          incomplete
      </Text>
      
      <Button
            text="Mark as Completed"
            onPress={() => {
              // login();
            }}
            type="TouchableHighlight"
            underlayColor={themeColor.primary600}
            style={{
              margin: 20,
              marginBottom: 150
            }}
          />

    </Layout>
  );
}
