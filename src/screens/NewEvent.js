import React, { useState } from "react";
import { View, ScrollView, Alert, StyleSheet } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
  TextInput
} from "react-native-rapi-ui";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { getAuth } from "firebase/auth";
import { getNumEvents, saveNewEvent, incrementNumEvents } from '../provider/BaseProvider';
import { generateCode } from "../scripts/GenerateJoinCode";

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [eventName, setEventName] = useState("");
  const [eventStart, setEventStart] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [eventType, setEventType] = useState();
  const [eventSize, setEventSize] = useState();

  const missingInformation = (field, message) => Alert.alert(field + " Invalid", message, [{ text: 'OK' }]);

  const handleWrite = async () => {
    if (!eventName.trim()) { 
      missingInformation("Event Name", "Please enter a valid event name.");
    } else if (eventEnd <= eventStart) {
      missingInformation("Time Error", "End time must be after the start time.");
    } else if (Math.floor((Math.abs(eventEnd - eventStart) / 1000) / 60) < 5) { 
      missingInformation("Duration", "The event must be at least 5 minutes long.");
    } else if (!eventType) { 
      missingInformation("Game Mode", "Please select a game mode.");
    } else if (!eventSize) { 
      missingInformation("Group Size", "Please select a group size.");
    } else {
      var numEvents = await getNumEvents();
      await incrementNumEvents();
      const joinCode = generateCode(numEvents);

      saveNewEvent(
        getAuth().currentUser.uid,
        eventName,
        parseInt((eventStart.getTime() / 1000).toFixed(0)),  // Save start time
        parseInt((eventEnd.getTime() / 1000).toFixed(0)),        // Save end time
        eventType,
        eventSize,
        joinCode
      );
      navigation.goBack();
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    if (event.type == "set") {
      setEventStart(new Date(selectedDate));
    }
  };

  const onStartTimeChange = (event, selectedTime) => {
    if (event.type == "set") {
      let newStart = new Date(eventStart);
      newStart.setHours(selectedTime.getHours());
      newStart.setMinutes(selectedTime.getMinutes());
      setEventStart(newStart);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    if (event.type == "set") {
      setEventEnd(new Date(selectedDate));
    }
  };

  const onEndTimeChange = (event, selectedTime) => {
    if (event.type == "set") {
      let newEnd = new Date(eventEnd);
      newEnd.setHours(selectedTime.getHours());
      newEnd.setMinutes(selectedTime.getMinutes());
      setEventEnd(newEnd);
    }
  };

  return (
    <Layout>
      <Text
        size="h1"
        fontWeight="bold"
        style={{
          marginLeft: 20,
          marginBottom: 5,
        }}>
        Create event
      </Text>

      <ScrollView
        bounces="false"
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 20,
        }}>

        <Text style={{ marginTop: 15 }} fontWeight="bold">Event Name</Text>
        <TextInput
          containerStyle={{ marginTop: 10, paddingHorizontal: 10 }}
          placeholder="Enter the name of the event"
          onChangeText={(text) => setEventName(text)}
        />

        {/* Start Time Pickers */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15
          }}>
          <Text style={{ marginVertical: "auto" }} fontWeight="bold">Start Time</Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 'auto',
            }}>
            <DateTimePicker mode="date" display="default" value={eventStart} onChange={onStartDateChange} themeVariant={isDarkmode ? "dark" : "light"} accentColor={themeColor.primary} />
            <DateTimePicker mode="time" display="default" value={eventStart} onChange={onStartTimeChange} themeVariant={isDarkmode ? "dark" : "light"} accentColor={themeColor.primary} />
          </View>
        </View>

        {/* End Time Pickers */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15
          }}>
          <Text style={{ marginVertical: "auto" }} fontWeight="bold">End Time</Text>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 'auto',
            }}>
            <DateTimePicker mode="date" display="default" value={eventEnd} onChange={onEndDateChange} themeVariant={isDarkmode ? "dark" : "light"} accentColor={themeColor.primary} />
            <DateTimePicker mode="time" display="default" value={eventEnd} onChange={onEndTimeChange} themeVariant={isDarkmode ? "dark" : "light"} accentColor={themeColor.primary} />
          </View>
        </View>

        {/* Game Mode and Group Size Selectors */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15
          }}>
          <Text style={{ marginVertical: "auto" }} fontWeight="bold">Game Mode</Text>
          <View style={{ marginLeft: "auto" }}>
            <RNPickerSelect
              placeholder={{ label: 'Select a game mode...', value: null }}
              items={[
                { label: 'Classic', value: "Classic" },
                { label: 'Bingo', value: "Bingo" },
              ]}
              onValueChange={(value) => setEventType(value)}
              style={pickerStyles(isDarkmode)}
            />
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 15
          }}>
          <Text style={{ marginVertical: "auto" }} fontWeight="bold">Size</Text>
          <View style={{ marginLeft: "auto" }}>
            <RNPickerSelect
              placeholder={{ label: 'Select a group size...', value: null }}
              items={[...Array(9).keys()].map((i) => ({ label: String(i + 2), value: i + 2 }))}
              onValueChange={(value) => setEventSize(value)}
              style={pickerStyles(isDarkmode)}
            />
          </View>
        </View>

        <Button
          text="Create Event"
          onPress={handleWrite}
          type="TouchableHighlight"
          underlayColor={themeColor.primary600}
          style={{ marginTop: "auto", marginBottom: 30 }}
        />
      </ScrollView>
    </Layout>
  );
}

const pickerStyles = (isDarkmode) => ({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Ubuntu_400Regular",
    backgroundColor: isDarkmode ? "#1f1f1f" : themeColor.white,
    borderColor: isDarkmode ? "#333333" : "#d8d8d8",
    color: isDarkmode ? "#dddddd" : "black",
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Ubuntu_400Regular",
    backgroundColor: isDarkmode ? "#1f1f1f" : themeColor.white,
    borderColor: isDarkmode ? "#333333" : "#d8d8d8",
    color: isDarkmode ? "#dddddd" : "black",
  }
});
