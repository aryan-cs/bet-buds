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
      const entryIds = await loadBetEntries(eventId);
      if (entryIds) {
        const stack = await Promise.all(entryIds.map(async (entryId) => {
          const item = await loadSpecificEntry(entryId);
          return {
            component: <BetEntry parlayUser={item.displayName} userID={memberID} parlayProgress={0} mode={mode} key={memberID} />,
            progress: 0 // Change to sort by progress
          };
        }));
        stack.sort((a, b) => a.progress - b.progress);
        setEntryList(stack.map(entry => entry.component));
      } else {
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
            key="no-events-text"
          >
            No bets to display
          </Text>
        ]);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
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
