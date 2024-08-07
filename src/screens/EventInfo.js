import React, { useState, useEffect, useCallback } from "react";
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
import { loadEventEntries, loadSpecificEntry } from '../provider/BaseProvider';

export default function ({route, navigation}) {
  const { isDarkmode } = useTheme();
  const mode = route.params.mode;
  const eventId = route.params.id;
  const [entryList, setEntryList] = useState([]);

  const DBConnect = async () => {
    try {
      const entryIds = await loadEventEntries(eventId);
      if (entryIds) {
        const stack = [];
        for (let entry = 0; entry < entryIds.length; entry++) {
          const item = await loadSpecificEntry(entryIds[entry]);
          stack.push({
            component: <ParlayEntry parlayUser = {item.displayName} parlayProgress = {0} mode = {mode}/>,
            progress: 0 //change to sort by progress 
          });
        }
        stack.sort((a, b) => a.progress - b.progress);
        const sortedComponents = stack.map(event => event.component);
        setEntryList(sortedComponents);
      } 
      else if (entryIds == null || entryIds.length < 1) {
        setEntryList(
          <Text
            size="h4"
            fontWeight="bold"
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              margin: "auto",
              color: isDarkmode ? themeColor.gray500 : themeColor.gray200
            }}> No events to display </Text>
        );
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    DBConnect();
    return () => {};
  }, []);

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
        {/* <ParlayEntry parlayUser = "You" parlayProgress = {10} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 2" parlayProgress = {2} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 3" parlayProgress = {3} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 4" parlayProgress = {1} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 5" parlayProgress = {1} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 6" parlayProgress = {9} mode = {mode}/>
        <ParlayEntry parlayUser = "Player 7" parlayProgress = {7} mode = {mode}/> */}
        {entryList}
      </ScrollView>
    </Layout>
  );
}
