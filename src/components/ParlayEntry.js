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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/core';

export default (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
          marginHorizontal: 20,
          marginVertical: 10,
          backgroundColor: isDarkmode ? themeColor.black200 : themeColor.white100,
          borderRadius: 10,
          // height: 120,
      }}>
        <TouchableHighlight
          underlayColor={isDarkmode ? themeColor.black300 : themeColor.white200}
          style={{borderRadius: 10}}
          onPress={() => {
              navigation.navigate("ParlayInfo");
          }}>
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
                  }}>{props.parlayUser}</Text>
              <Text
                fontWeight="bold"
                style={{
                  fontSize: 23,
                  marginLeft: 'auto',
                  marginVertical: "auto",
                  color: themeColor.primary,
                }}>{props.parlayProgress + "/10"}</Text>
          </SectionContent>
        </TouchableHighlight>
    </View>
  );
};
