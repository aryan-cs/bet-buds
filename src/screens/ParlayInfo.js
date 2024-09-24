import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, RefreshControl, TouchableHighlight } from "react-native";
import {
  Layout,
  Text,
  themeColor,
  useTheme
} from "react-native-rapi-ui";
import PlayerEntry from "../components/PlayerEntry";
import { loadEventEntries, loadSpecificEntry, loadBetEntries } from '../provider/BaseProvider';
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import BetEntry from "../components/BetEntry";

export default function ({ route, navigation }) {
  const { isDarkmode } = useTheme();
  // const mode = route.params.mode;
  const eventId = route.params.id;

  const mode = "classic";
  // const eventId = 1;

  const [entryList, setEntryList] = useState([]);
  const [loading, setLoading] = useState(true); // State for initial loading and refreshing

  const DBConnect = async () => {
    try {
      const entryData = await loadBetEntries(getAuth().currentUser.uid, eventId);
      
      if (entryData && entryData.length > 0) {
        const stack = await Promise.all(entryData.map(async (entry) => {
          const { betName, difficulty } = entry; // Extract the relevant fields
          // const item = await loadSpecificEntry(entry); // Optionally load specific details if needed
  
          return {
            component: (
              <BetEntry 
                name={betName} 
                difficulty={difficulty}
                key={Math.floor(Math.random() * 100)} 
              />
            ),
            progress: difficulty // Use difficulty as the sorting criteria for progress
          };
        }));
  
        // Sort by difficulty/progress and set the entry list
        stack.sort((a, b) => a.progress - b.progress);
        setEntryList(stack.map(entry => entry.component));
  
      } else {
        // Handle case when no entries are available
        setEntryList([
          <Text
            size="h4"
            fontWeight="bold"
            style={{
              textAlign: "center",
              textAlignVertical: "center",
              margin: "auto",
              color: isDarkmode ? themeColor.gray500 : themeColor.gray200
            }}
            key="no-bets-text"
          >
            No bets to display
          </Text>
        ]);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false); // Ensure loading is set to false after fetching is done
    }
  };  

  const loadData = async () => {
    setLoading(true);
    await DBConnect();
  };

  useEffect(() => {
    loadData(); // Initial load
    return () => {};
  }, [eventId]); // Reload when eventId changes

  return (
    <Layout>
      <Text
        size="h1"
        fontWeight="bold"
        style={{
          marginLeft: 20,
          marginBottom: 5,
        }}
      >
        Parlay Info
      </Text>

      <TouchableHighlight
        onPress={() => {
          navigation.navigate("NewBet", {
            eventId: route.params.id,
          });
        }}
        underlayColor={themeColor.primary600}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          zIndex: 1,
          backgroundColor: themeColor.primary,
          borderRadius: 100,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={"add-outline"} color={themeColor.white} size={30} />
      </TouchableHighlight>

      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
        contentContainerStyle={{ flexGrow: 1, alignContent: "center" }}
      >
        {entryList}
      </ScrollView>
    </Layout>
  );
}
