import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button,
  TextInput
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState();
  const [eventTime, setEventTime] = useState();
  const [eventEnd, setEventEnd] = useState(0);
  const [eventType, setEventType] = useState();
  
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
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 20,

        }}>

          <Text style={{ marginTop: 15 }}>Event name</Text>
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
              <Text style={{ marginVertical: "auto" }}>Event expiration</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: 'auto',
                }}>
                  <DateTimePicker mode="date" display="default" value={new Date()} themeVariant={isDarkmode ? "dark" : "light"} />
                  <DateTimePicker mode="time" display="default" value={new Date()} themeVariant={isDarkmode ? "dark" : "light"} />
                </View>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15
            }}>
              <Text style={{ marginVertical: "auto", }}>Event type</Text>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "auto",
                  paddingTop: 2,
                }}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Select an event type...',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    onValueChange={(value) => console.log(value)}
                    items={[
                      { label: 'Classic', value: 'Classic' },
                      { label: 'Bingo', value: 'Bingo' },
                    ]}                    
                  />
                </View>
          </View>

          <Text style={{ marginTop: 15 }}>Group size</Text>
          <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "auto",
                  marginTop: -15
                }}>
                  <RNPickerSelect
                    placeholder={{
                      label: 'Select a group size...',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    onValueChange={(value) => console.log(value)}
                    items={[
                      { label: '2', value: '2' },
                      { label: '3', value: '3' },
                      { label: '4', value: '4' },
                      { label: '5', value: '5' },
                      { label: '6', value: '6' },
                      { label: '7', value: '7' },
                      { label: '8', value: '8' },
                      { label: '9', value: '9' },
                      { label: '10', value: '10' },
                    ]}                    
                  />
                </View>

      </ScrollView>
    </Layout>
  );
}

//https://github.com/ManojKanth/React-native-toggle-button-with-text
//https://www.youtube.com/watch?v=ad9f-EYtWPo&pp=ygUTcmVhY3QgbmF0aXZlIHRvZ2dsZQ%3D%3D

