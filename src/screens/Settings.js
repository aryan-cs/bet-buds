import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { View, ScrollView, TouchableOpacity } from 'react-native';
import {
  Layout,
  Button,
  Text,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleTheme = async () => {
    if (isDarkmode) {
      setTheme("light");
      await AsyncStorage.setItem('theme', 'light');
    } else {
      setTheme("dark");
      await AsyncStorage.setItem('theme', 'dark');
    }
  };

  return (
    <Layout>
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
          }}> Settings </Text>
      </View>
        
      <ScrollView
        bounces="false"
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 15
        }}>

        <Button
          text={isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          status={isDarkmode ? "black100" : "primary"}
          type="TouchableHighlight"
          underlayColor={isDarkmode ? themeColor.black200 : themeColor.primary600}
          onPress={toggleTheme}
          style={{
            marginTop: 10,
          }}
        />
        <Button
          status="danger"
          text="Logout"
          type="TouchableHighlight"
          underlayColor={themeColor.danger600}
          onPress={handleLogout}
          style={{
            marginTop: 10,
          }}
        />
      </ScrollView>
    </Layout>
  );
}
