import themeColor from "./theme.json";

export default {
  light: {
    statusBar: {
      color: "#fcfcfc",
    },
    section: {
      backgroundColor: themeColor.white,
    },
    text: {
      color: themeColor.black,
    },
    layout: {
      backgroundColor: themeColor.white,
    },
    topNav: {
      backgroundColor: themeColor.white,
      borderColor: "#c0c0c0",
    },
    button: {
      disabledColor: "#d8d8d8",
      disabledTextColor: themeColor.gray100,
      inverseColor: themeColor.white,
    },
    textInput: {
      backgroundColor: themeColor.white,
      borderColor: "#d8d8d8",
      color: themeColor.black,
      onFocusborderColor: "#c0c0c0",
      placeholderTextColor: themeColor.gray300,
    },
    checkBox: {
      checkedColor: themeColor.primary,
      uncheckedColor: "#d8d8d8",
      disabledColor: "#d8d8d8",
    },
    picker: {
      backgroundColor: themeColor.white,
      borderColor: "#d8d8d8",
      iconColor: themeColor.gray300,
      placeholderColor: themeColor.gray300,
      labelColor: themeColor.black,
      closeIconColor: themeColor.danger,
      selectionBackgroundColor: themeColor.white,
    },
  },
  dark: {
    statusBar: {
      color: "#0f0f0f"
    },
    section: {
      backgroundColor: "#1f1f1f"
    },
    text: {
      color: "#dddddd",
    },
    layout: {
      backgroundColor: "#0f0f0f"
    },
    topNav: {
      backgroundColor: "#1f1f1f",
      borderColor: "#2f2f2f"
    },
    button: {
      disabledColor: "#404040",
      disabledTextColor: "#1a1a1a",
      inverseColor: "#1f1f1f"
    },
    textInput: {
      backgroundColor: "#1f1f1f",
      color: "#dddddd",
      borderColor: "#333333",
      onFocusborderColor: "#7f7f7f",
      placeholderTextColor: "#575757"
    },
    checkBox: {
      checkedColor: "#E2162D",
      uncheckedColor: "#878787",
      disabledColor: "#878787"
    },
    picker: {
      backgroundColor: "#1f1f1f",
      borderColor: "#333333",
      iconColor: "#bbbbbb",
      placeholderColor: "#575757",
      labelColor: "#dddddd",
      closeIconColor: "#a70000",
      selectionBackgroundColor: "#1f1f1f"
    },
  },
};
