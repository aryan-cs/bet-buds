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
import BingoBoard from "../components/BingoBoard";


export default function ({ navigation, betName }) {
  const { isDarkmode } = useTheme();

  return (
    <Layout>
      <Text
        size="h1"
        fontWeight="bold"
        style={{
          marginLeft: 20,
          marginBottom: -35,
          marginTop: 40
        }}>
          Your Board
      </Text>

      <BingoBoard />
    </Layout>
  );
}