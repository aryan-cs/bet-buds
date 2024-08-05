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
import BingoBoard from "../components/BingoBoard";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getNumEvents, saveNewEvent, incrementNumEvents } from '../provider/BaseProvider';
import { generateCode } from "../scripts/GenerateJoinCode";

// https://reactnavigation.org/docs/tab-view/

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [eventTime, setEventTime] = useState(new Date());
  const [eventEnd, setEventEnd] = useState(new Date());
  const [eventType, setEventType] = useState();
  const [eventSize, setEventSize] = useState();

  const missingInformation = (field, message) => Alert.alert(field + " Invalid", message, [{text: 'OK'}]);

  const handleWrite = async () => {
    
    if (!eventName.trim()) { missingInformation("Event Name", "Please enter a valid event name."); }
    else if (Math.floor((Math.abs(Date.now() - eventEnd) / 1000) / 60) < 5) { missingInformation("Expiration", "The event must be at least 5 minutes long."); }
    else if (!eventType) { missingInformation("Game Mode", "Please select a game mode."); }
    else if (!eventSize) { missingInformation("Group Size", "Please select a group size."); }
    else {
      var numEvents = await getNumEvents();
      await incrementNumEvents();
      const joinCode = generateCode(numEvents);
      // console.log(joinCode);
      saveNewEvent(
        getAuth().currentUser.uid,
        eventName,
        parseInt((eventEnd.getTime() / 1000).toFixed(0)),
        eventType,
        eventSize,
        joinCode
      )

      navigation.goBack();
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (event.type == "set") {
      eventEnd.setFullYear(selectedDate.getFullYear());
      eventEnd.setMonth(selectedDate.getMonth());
      eventEnd.setDate(selectedDate.getDate());
    }
  };

  const onTimeChange = (event, selectedTime) => {
    if (event.type == "set") {
      eventEnd.setHours(selectedTime.getHours());
      eventEnd.setMinutes(selectedTime.getMinutes());
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
          
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15
            }}>
              <Text style={{ marginVertical: "auto" }} fontWeight="bold">Expiration</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 'auto',
                }}>
                  <DateTimePicker mode="date" display="default" value={eventDate} onChange={onDateChange} themeVariant={isDarkmode ? "dark" : "light"} accentColor={themeColor.primary}/>
                  <DateTimePicker mode="time" display="default" value={eventTime} onChange={onTimeChange} themeVariant={isDarkmode ? "dark" : "light"} accentColor={themeColor.primary}/>
                </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15
            }}>
              <Text style={{ marginVertical: "auto", }} fontWeight="bold">Game Mode</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "auto",
                }}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Select a game mode...',
                      value: null,
                    }}
                    items={[
                      { label: 'Classic', value: "Classic" },
                      { label: 'Bingo', value: "Bingo" },
                    ]}
                    onValueChange={(value) => setEventType(value)}
                    style={{
                      inputIOS: {
                        fontSize: 14,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 8,
                        fontFamily: "Ubuntu_400Regular",
                        backgroundColor: isDarkmode ? "#1f1f1f" : themeColor.white,
                        borderColor: isDarkmode ?  "#333333" : "#d8d8d8",
                        color: isDarkmode ? "#dddddd" : "black",
                        onFocusborderColor: isDarkmode ? "#7f7f7f" : "#c0c0c0",
                        placeholderTextColor: isDarkmode ? "#575757" : themeColor.gray300,
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
                        onFocusborderColor: isDarkmode ? "#7f7f7f" : "#c0c0c0",
                        placeholderTextColor: isDarkmode ? "#575757" : themeColor.gray300,
                      }
                    }}
                  />
                </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15
            }}>
              <Text style={{ marginVertical: "auto", }} fontWeight="bold">Size</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "auto",
                }}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Select a group size...',
                      value: null,
                    }}
                    items={[
                      { label: '2', value: 2 },
                      { label: '3', value: 3 },
                      { label: '4', value: 4 },
                      { label: '5', value: 5 },
                      { label: '6', value: 6 },
                      { label: '7', value: 7 },
                      { label: '8', value: 8 },
                      { label: '9', value: 9 },
                      { label: '10', value: 10 },
                    ]}
                    onValueChange={(value) => setEventSize(value)}
                    style={{
                      inputIOS: {
                        fontSize: 14,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 8,
                        fontFamily: "Ubuntu_400Regular",
                        backgroundColor: isDarkmode ? "#1f1f1f" : themeColor.white,
                        borderColor: isDarkmode ?  "#333333" : "#d8d8d8",
                        color: isDarkmode ? "#dddddd" : "black",
                        onFocusborderColor: isDarkmode ? "#7f7f7f" : "#c0c0c0",
                        placeholderTextColor: isDarkmode ? "#575757" : themeColor.gray300,
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
                        onFocusborderColor: isDarkmode ? "#7f7f7f" : "#c0c0c0",
                        placeholderTextColor: isDarkmode ? "#575757" : themeColor.gray300,
                      }
                    }}
                  />
                </View>
              </View>

              <Button
                text="Create Event"
                onPress={handleWrite}
                type="TouchableHighlight"
                underlayColor={themeColor.primary600}
                style={{
                  marginTop: "auto",
                  marginBottom: 30,                  
                }}
              />

      </ScrollView>
    {/* <BingoBoard/> */}
  </Layout>
  );
}