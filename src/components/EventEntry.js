import React, { useState, useEffect } from "react";
import { View, TouchableHighlight } from 'react-native';
import { Text, SectionContent, themeColor, useTheme } from "react-native-rapi-ui";
import { useNavigation } from '@react-navigation/core';
import { Swipeable } from 'react-native-gesture-handler';

export default (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false); // State to track button press

  // Function to calculate the time difference between the current time and the start/end time
  const calculateTimeLeft = () => {
    const now = Date.now();
    const eventStart = props.eventStart * 1000;
    const eventEnd = props.eventEnd * 1000;

    if (now < eventStart) {
      return eventStart - now;  // Time until the event starts
    } else if (now < eventEnd) {
      return eventEnd - now;  // Time until the event ends
    } else {
      return 0;  // Event has ended
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);  // Clean up the interval on component unmount
  }, [props.eventStart, props.eventEnd]);

  // Format the time left into days, hours, minutes, and seconds
  const formatTimeLeft = (time) => {
    if (time <= 0) {
      return 'Event has ended';
    }
  
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
  
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${seconds}s`;
    }
  };  

  const renderRightActions = (progress, dragX) => {
    return (
      <TouchableHighlight
        onPress={() => {
          if (props.onDelete) {
            props.onDelete(props.eventId);
          }
          setIsPressed(true); // Set button state to pressed
          setTimeout(() => setIsPressed(false), 200); // Reset button state after 200ms
        }}
        style={{
          backgroundColor: isPressed ? themeColor.danger600 : themeColor.danger,
          justifyContent: 'center',
          alignItems: 'flex-end',
          width: 100,
          marginRight: 20,
          marginLeft: -30,
          marginVertical: 10,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          paddingRight: 20,
        }}
        underlayColor={themeColor.danger600} // Color when button is pressed
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Delete
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
      rightThreshold={40}
    >
      <View
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
          backgroundColor: isDarkmode ? themeColor.black200 : themeColor.white100,
          borderRadius: 10,
        }}
      >
        <TouchableHighlight
          underlayColor={isDarkmode ? themeColor.black300 : themeColor.white200}
          style={{ borderRadius: 10 }}
          onPress={() => {
            navigation.navigate("EventInfo", {
              mode: props.eventType,
              id: props.eventId,
            });
          }}
        >
          <SectionContent>
            <Text size="h3" fontWeight="bold">{props.eventTitle}</Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 3,
                color: isDarkmode ? themeColor.gray400 : themeColor.gray500,
              }}
              italic="true"
            >
              {props.eventType}
            </Text>
            <Text
              style={{
                fontSize: 18,
                marginTop: 3,
                color: isDarkmode ? themeColor.gray400 : themeColor.gray500,
              }}
              italic="true"
            >
              {timeLeft > 0 ? 
                (Date.now() < props.eventStart * 1000 ? `Starts in ${formatTimeLeft(timeLeft)}` : `Ends in ${formatTimeLeft(timeLeft)}`) 
                : 'Event has ended'}
            </Text>
          </SectionContent>
        </TouchableHighlight>
      </View>
    </Swipeable>
  );
};
