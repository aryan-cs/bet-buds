import { React, useState, useEffect } from "react";
import {View, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import {
    Layout,
    Button,
    Text,
    TopNav,
    Section,
    SectionContent,
    SectionImage,
    themeColor,
    useTheme,
  } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';

export default (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();

  const [timeLeft, setTimeLeft] = useState(props.eventEnd - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(props.eventEnd - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [props.eventEnd]);

  const formatTimeLeft = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // const formatTimeLeft = (time) => {
  //   const days = Math.floor(time / (1000 * 60 * 60 * 24));
  //   const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  //   const seconds = Math.floor((time % (1000 * 60)) / 1000);

  //   // Pad with zeroes to ensure two digits
  //   const pad = (n) => (n < 10 ? '0' + n : n);

  //   return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  // };

  return (
    <View
      style={{
          marginHorizontal: 20,
          marginVertical: 10,
          backgroundColor: isDarkmode ? themeColor.black100 : themeColor.white100,
          borderRadius: 10,
      }}>
      <TouchableHighlight
        underlayColor={isDarkmode ? themeColor.black200 : themeColor.white200}
        style={{borderRadius: 10}}
        onPress={() => {
            navigation.navigate("EventInfo");
        }}>
        <SectionContent>
            <Text size="h3" fontWeight="bold">{props.eventTitle}</Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 3,
                color: isDarkmode ? themeColor.gray400 : themeColor.gray500, 
              }}
              italic="true">{props.eventType}</Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 3,
                // marginLeft: "auto",
                color: isDarkmode ? themeColor.gray400 : themeColor.gray500,                    
              }} italic="true">{timeLeft > 0 ? formatTimeLeft(timeLeft) : 'Event has ended'}</Text>
        </SectionContent>
      </TouchableHighlight>
    </View>
  );
};
