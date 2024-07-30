import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { useNavigation } from '@react-navigation/core';
import BingoSquareInfo from '../screens/BingoSquareInfo';


export default (props) => {
  const { isDarkmode, setTheme } = useTheme();
  const navigation = useNavigation();

  const renderCell = (row, col) => (
    <View
      key={`cell-${row}-${col}`}
      style={{
          width: 60,
          height: 60,
          margin: 4,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 8,
          fontFamily: "Ubuntu_400Regular",
          backgroundColor: isDarkmode ? "#1f1f1f" : themeColor.white,
          borderColor: isDarkmode ?  "#333333" : "#d8d8d8",
          onFocusborderColor: isDarkmode ? "#7f7f7f" : "#c0c0c0",
          placeholderTextColor: isDarkmode ? "#575757" : themeColor.gray300,
      }}>
        <TouchableOpacity
          onPress={() => {
            if (!(row === 2 && col === 2)) {
              navigation.navigate("BingoSquareInfo");
            }
          }}
          style={{
            marginVertical: 'auto',
            width: "100%",
            height: "100%",
            justifyContent: "center",
          }}>
            <Text
              style={{
                textAlign: "center",
                textAlignVertical: "center",
                fontWeight: "bold",
                fontSize: (row === 2 && col === 2) ? 20 : (props.completed ? 30 : 0),
                color: themeColor.primary
            }}>{(row === 2 && col === 2) ? "FREE" : (props.completed ? "●" : "")}</Text>
        </TouchableOpacity>
    </View>
  );

  // Function to render a row of cells
  const renderRow = (row) => (
    <View key={`row-${row}`} style={styles.row}>
      {Array.from({ length: 5 }, (_, col) => renderCell(row, col))}
    </View>
  );

  // Render the 5x5 grid
  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }, (_, row) => renderRow(row))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  cellText: {
    fontSize: 16,
  },
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});