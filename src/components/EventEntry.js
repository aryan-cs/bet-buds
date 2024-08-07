import React, { useState, useEffect } from "react";
import { View, TouchableHighlight } from 'react-native';
import {
  Text,
  SectionContent,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { useNavigation } from '@react-navigation/core';

export default (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();

  const calculateTimeLeft = () => {
    return props.eventEnd * 1000 - Date.now();
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
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

  return (
    <View
      style={{
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: isDarkmode ? themeColor.black200 : themeColor.white100,
        borderRadius: 10,
      }}>
      <TouchableHighlight
        underlayColor={isDarkmode ? themeColor.black300 : themeColor.white200}
        style={{ borderRadius: 10 }}
        onPress={() => {
          navigation.navigate("EventInfo", {
            mode: props.eventType,
            id: props.eventId
          });
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
              color: isDarkmode ? themeColor.gray400 : themeColor.gray500,
            }} italic="true">{timeLeft > 0 ? formatTimeLeft(timeLeft) : 'Event has ended'}</Text>
        </SectionContent>
      </TouchableHighlight>
    </View>
  );
};
