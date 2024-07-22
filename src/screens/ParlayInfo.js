import React from "react";
import { View, ScrollView } from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

export default (props) => {
  const { isDarkmode } = useTheme();
  const navigation = useNavigation();

  return (
    <Layout>

        <Text
          size="h1"
          fontWeight="bold"
          style={{
            marginLeft: 20,
            marginBottom: 5,
          }}>
            Parlay Info
        </Text>
        
      <ScrollView

        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center"
        }}>

      </ScrollView>
    </Layout>
  );
}
