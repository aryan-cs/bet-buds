import React from "react";
import {View, Image, StyleSheet, TouchableOpacity, } from 'react-native';
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
    <TouchableOpacity
        onPress={() => {
            navigation.navigate("EventInfo");
        }}>
        <View
            style={{
                marginHorizontal: 20,
                marginVertical: 10,
                backgroundColor: isDarkmode ? themeColor.black100 : themeColor.white100,
                borderRadius: 10,
                height: 120,
            }}>
            {/* <Image source={require('../../assets/register.png')} /> */}
            <SectionContent>
                <Text size="h2" fontWeight="bold">{props.eventTitle}</Text>
                <Text style={{ fontSize: 20, marginTop: 3 }} italic="true">{props.eventType}</Text>
            </SectionContent>
        </View>
    </TouchableOpacity>
  );
};
