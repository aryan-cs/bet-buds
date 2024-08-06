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
import ParlayEntry from "../components/ParlayEntry"

export default function ({route, navigation}) {
  const { isDarkmode } = useTheme();
  const { mode } = route.params;
  return (
    <Layout>
        <Text
          size="h1"
          fontWeight="bold"
          style={{
            marginLeft: 20,
            marginBottom: 5,
          }}>
            Event Info
        </Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center"
        }}>
        {/* these should be populated by score, like a leaderboard */}
        <ParlayEntry parlayUser = "You" parlayProgress = {10} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 2" parlayProgress = {2} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 3" parlayProgress = {3} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 4" parlayProgress = {1} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 5" parlayProgress = {1} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 6" parlayProgress = {9} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 7" parlayProgress = {7} mode = {mode}/>
      </ScrollView>
    </Layout>
  );
}
