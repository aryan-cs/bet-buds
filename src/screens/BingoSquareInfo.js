import React from "react";
import { View, ScrollView } from "react-native";
import {
  Button,
  Layout,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';


export default function ({ navigation, betName }) {
  const { isDarkmode } = useTheme();

  return (
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
            style={{
              margin: 20,
              marginBottom: 150
            }}
          />

    </Layout>
  );
}