import React, { useState, useEffect, useCallback } from "react";
import { getAuth } from "firebase/auth";
import { View, ScrollView, TouchableOpacity, TouchableHighlight, RefreshControl } from 'react-native';
import {
  Layout,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import EventEntry from "../components/EventEntry";
import { Ionicons } from "@expo/vector-icons";
import { loadUsersEvents, loadSpecificEvent } from '../provider/BaseProvider';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const auth = getAuth();

  const [refreshing, setRefreshing] = useState(false);
  const [eventsList, setEventsList] = useState([]);

  const loadData = async () => {
    setRefreshing(true);
    try {
      const eventsData = await loadUsersEvents(getAuth().currentUser.uid);
      if (eventsData) {
        const stack = [];
        for (let entry = 0; entry < eventsData.currentEvents.length; entry++) {
          const item = await loadSpecificEvent(eventsData.currentEvents[entry]);
          stack.push({
            component: <EventEntry eventTitle={item.name} eventType={item.type} eventEnd={item.expiration} key={item.expiration} />,
            expiration: item.expiration
          });
        }
        stack.sort((a, b) => a.expiration - b.expiration);
        const sortedComponents = stack.map(event => event.component);
        setEventsList(sortedComponents);
      } else if (eventsData == null) {
        setEventsList(
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
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
    return () => {};
  }, []);

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(() => {
        loadData();
      }, 1000);

      return () => clearTimeout(timer);
    }, [])
  );

  return (
    <Layout>

      <TouchableHighlight
        onPress={() => {
          navigation.navigate("NewEvent");
        }}
        underlayColor={themeColor.primary600}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          zIndex: 1,
          backgroundColor: themeColor.primary,
          borderRadius: 100,
          width: 75,
          height: 75,
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Ionicons
          name={"add-outline"}
          color={themeColor.white}
          size={60} />
      </TouchableHighlight>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: 15
        }}>

        <Text
          size="h1"
          fontWeight="bold"
          style={{
            paddingBottom: 5,
          }}> Your Events </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
          style={{
            marginVertical: 'auto',
            marginLeft: "auto",
          }}>
          <Ionicons
            name={"ellipsis-vertical"}
            size={25}
            color={isDarkmode ? themeColor.white : themeColor.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center"
        }}>

        {eventsList}

      </ScrollView>
    </Layout>
  );
}
