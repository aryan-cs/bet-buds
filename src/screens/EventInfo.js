import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import {
  Layout,
  Text,
  themeColor,
  useTheme
} from "react-native-rapi-ui";
import PlayerEntry from "../components/PlayerEntry";
import { loadEventEntries, loadSpecificEntry } from '../provider/BaseProvider';

export default function ({ route, navigation }) {
  const { isDarkmode } = useTheme();
  const mode = route.params.mode;
  const eventId = route.params.id;
  const [entryList, setEntryList] = useState([]);
  const [loading, setLoading] = useState(true); // State for initial loading and refreshing

  const DBConnect = async () => {
    try {
      const entryIds = await loadEventEntries(eventId);
      if (entryIds) {
        const stack = await Promise.all(entryIds.map(async (entryId) => {
          const item = await loadSpecificEntry(entryId);
          return {
            component: <PlayerEntry parlayUser={item.displayName} parlayProgress={0} mode={mode} key={entryId} />,
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
            No entries to display
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
        Event Info
      </Text>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
        contentContainerStyle={{ flexGrow: 1, alignContent: "center" }}
      >
        {entryList}
      </ScrollView>
    </Layout>
  );
}
