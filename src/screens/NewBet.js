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
import { getAuth } from "firebase/auth";
import {saveNewBet} from '../provider/BaseProvider';

export default function ({ navigation }) {
  const { isDarkmode } = useTheme();
  const [betName, setBetName] = useState("");
  const [difficulty, setDifficulty] = useState(0);

  const missingInformation = (field, message) => Alert.alert(field + " Invalid", message, [{ text: 'OK' }]);

  const handleWrite = async () => {
    if (!betName.trim()) { 
      missingInformation("Bet Name", "Please enter a valid bet name.");
    }
    if(!difficulty.trim()) {
        missingInformation("Difficulty", "Please enter a valid difficulty.");
    }
    else {
    //   var numEvents = await getNumEvents();
    //   await incrementNumEvents();

      saveNewBet( //change to bet
        getAuth().currentUser.uid,
        betName,
        difficulty
      );
      navigation.goBack();
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
        Create bet
      </Text>

      <ScrollView
        bounces="false"
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 20,
        }}>

        <Text style={{ marginTop: 15 }} fontWeight="bold">Bet:</Text>
        <TextInput
          style={{ marginTop: 10, paddingHorizontal: 10, height: 400, textAlignVertical: "top"}}
          placeholder="What bet would you like to make?"
          multiline={true}
          onChangeText={(text) => setBetName(text)}
        />


        <Button
          text="Create Bet"
          onPress={handleWrite}
          type="TouchableHighlight"
          underlayColor={themeColor.primary600}
          style={{ marginTop: "auto", marginBottom: 30 }}
        />
      </ScrollView>
    </Layout>
  );
}
