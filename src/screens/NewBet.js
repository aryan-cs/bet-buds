import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import {
  Layout,
  Text,
  themeColor,
  useTheme,
  Button,
  TextInput
} from "react-native-rapi-ui";
import { getAuth } from "firebase/auth";
import { saveNewBet } from '../provider/BaseProvider';
import { Slider } from '@rneui/themed'; // Correct import for Slider

export default function ({route, navigation }) {
  const { isDarkmode } = useTheme();
  const [betName, setBetName] = useState("");
  const [difficulty, setDifficulty] = useState(3);  // Default value for slider

  const missingInformation = (field, message) => Alert.alert(field + " Invalid", message, [{ text: 'OK' }]);

  const handleWrite = async () => {
    if (!betName.trim()) { 
      missingInformation("Bet Name", "Please enter a valid bet name.");
    } else {
      saveNewBet(
        getAuth().currentUser.uid,
        betName,
        difficulty,
        route.params.eventId
      );
      navigation.goBack();
    }
  };

  // Function to get the difficulty message
  const getDifficultyMessage = () => {
    switch (Math.round(difficulty)) {
      case 1:
        return "Light work.";
      case 2:
        return "Easy peasy.";
      case 3:
        return "It's a coin flip.";
      case 4:
        return "It's a coin flip, but the coin is rigged.";
      case 5:
        return "Someone's feelings are gonna get hurt.";
      default:
        return "";
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
        }}
      >
        Create Bet
      </Text>

      <ScrollView
        bounces="false"
        contentContainerStyle={{
          flexGrow: 1,
          alignContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ marginTop: 15 }} fontWeight="bold">Enter the bet description:</Text>
        <TextInput
          style={{
            paddingHorizontal: 10,
            height: 100,  // Adjust height to show approximately 4 lines
            textAlignVertical: 'top',  // Align text to the top
          }}
          containerStyle={{ marginTop: 10 }}
          placeholder="What bet would you like to make?"
          multiline={true}
          onChangeText={(text) => setBetName(text)}
        />

        <Text style={{ marginTop: 20, marginBottom: 5 }} fontWeight="bold">Select difficulty:</Text>
        <Slider
          value={difficulty}
          onValueChange={(value) => setDifficulty((value))}
          minimumValue={1}
          maximumValue={5}
          thumbTintColor={themeColor.primary}  // Adjust thumb color
          minimumTrackTintColor={themeColor.primary}  // Track color for selected portion
          maximumTrackTintColor={isDarkmode ? themeColor.gray : themeColor.white200}  // Track color for unselected portion
          trackStyle={{
            height: 30,  // Thickness of the slider
            borderRadius: 5,  // Rounded corners for the slider track
          }}
          thumbStyle={{
            width: 20,  // Width of the thumb button
            height: 30,  // Height of the thumb button
            borderRadius: 5,  // Make thumb fully round
            borderWidth: 2,
            borderColor: themeColor.primary, 
            backgroundColor: themeColor.primary,
          }}
        />

        {/* Display the corresponding difficulty message */}
        <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 18, fontStyle: "italic" }}>
          {getDifficultyMessage()}
        </Text>

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
