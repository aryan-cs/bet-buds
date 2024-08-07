import React, { useState, useEffect, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { View, ScrollView, TouchableOpacity, TouchableHighlight, RefreshControl } from 'react-native';
import { Layout, Text, themeColor, useTheme } from "react-native-rapi-ui";
import EventEntry from "../components/EventEntry";
import { Ionicons } from "@expo/vector-icons";
import { loadUsersEvents, loadSpecificEvent } from '../provider/BaseProvider';
import { useFocusEffect } from '@react-navigation/native';

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const auth = getAuth();

  const [eventsList, setEventsList] = useState([]); // Start with empty list
  const [loading, setLoading] = useState(true); // State for initial loading and refreshing

  const DBConnect = async () => {
    try {
      const eventsData = await loadUsersEvents(auth.currentUser.uid);
      if (eventsData && eventsData.length > 0) {
        const stack = await Promise.all(eventsData.map(async (eventId) => {
          const item = await loadSpecificEvent(eventId);
          return {
            component: <EventEntry eventId={eventId} eventTitle={item.name} eventType={item.type} eventEnd={item.expiration} key={eventId} />,
            expiration: item.expiration
          };
        }));
        stack.sort((a, b) => a.expiration - b.expiration);
        setEventsList(stack.map(event => event.component));
      } else {
        setEventsList([
          <Text
            size="h4"
            fontWeight="bold"
            style={{
              textAlign: "center",
              margin: "auto",
              color: isDarkmode ? themeColor.gray500 : themeColor.gray200,
            }}
            key="no-events-text"
          >
            No events to display
          </Text>
        ]);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
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
    // Optionally cleanup if needed
    return () => {};
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData(); // Reload data when screen comes into focus
      // Optionally return cleanup if needed
    }, [])
  );

  return (
    <Layout>
      <TouchableHighlight
        onPress={() => navigation.navigate("JoinEvent")}
        underlayColor={themeColor.primary600}
        style={{
          position: "absolute",
          right: 20,
          bottom: 80,
          zIndex: 1,
          backgroundColor: themeColor.primary,
          borderRadius: 100,
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={"search-outline"} color={themeColor.white} size={25} />
      </TouchableHighlight>

      <TouchableHighlight
        onPress={() => navigation.navigate("NewEvent")}
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

      <View style={{ display: "flex", flexDirection: "row", paddingHorizontal: 15 }}>
        <Text size="h1" fontWeight="bold" style={{ paddingBottom: 5 }}>
          Your Events
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={{
            marginVertical: 'auto',
            marginLeft: "auto",
          }}
        >
          <Ionicons
            name={"ellipsis-vertical"}
            size={25}
            color={isDarkmode ? themeColor.white : themeColor.black}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} />}
        contentContainerStyle={{ flexGrow: 1, alignContent: "center" }}
      >
        {eventsList}
      </ScrollView>
    </Layout>
  );
}
