import React from "react";
import {View, Image, StyleSheet, TouchableHighlight, } from 'react-native';
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
import { useNavigation } from '@react-navigation/core';
import { getAuth } from "firebase/auth";

export default (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();
  
  return (
    <View
      style={{
          marginHorizontal: 20,
          marginVertical: 10,
          backgroundColor: props.userID === getAuth().currentUser.uid
          ? themeColor.primary
          : isDarkmode
            ? themeColor.black200
            : themeColor.white100,
          borderRadius: 10,
      }}>
        <TouchableHighlight
          underlayColor={isDarkmode ? themeColor.black300 : themeColor.white200}
          style={{borderRadius: 10}}
          // onPress={() => {
          //   {props.mode == "Bingo"
          //     ? navigation.navigate("BingoBoardInfo")
          //     : navigation.navigate("ParlayInfo");
          //   }
          // }}
          >
          <SectionContent
            style={{
              display: "flex",
              flexDirection: "row", 
            }}>
              <Text
                size="h3"
                // fontWeight="bold"
                style={{
                  fontSize: 20,
                  marginVertical: "auto",
                  maxWidth: "80%",
                  color: props.userID === getAuth().currentUser.uid
                  ? themeColor.white100
                  : isDarkmode
                    ? themeColor.white100
                    : themeColor.black200,
                }}>{props.name}</Text>
              <Text
                fontWeight="bold"
                style={{
                  fontSize: 23,
                  marginLeft: 'auto',
                  marginVertical: "auto",
                  color: props.userID === getAuth().currentUser.uid ? themeColor.white100 : themeColor.primary,
                }}>{props.difficulty + ":1"}</Text>
                {/* i dont know how odds work... @sdayaneni help */}
          </SectionContent>
        </TouchableHighlight>
    </View>
  );
};
