import React, { useContext } from "react";
import getEnvVars from '../../config';
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";
//Screens
// import Create from "../screens/old/Create";
// import Groups from "../screens/old/Groups";
// import Tracker from "../screens/old/Tracker";
import Master from "../screens/Master";
import Loading from "../screens/utils/Loading";
// import SecondScreen from "../screens/old/SecondScreen";
// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";
import EventInfo from "../screens/EventInfo";
import ParlayInfo from "../screens/ParlayInfo";
import NewEvent from "../screens/NewEvent";
import BingoSquareInfo from "../screens/BingoSquareInfo";
import Settings from "../screens/Settings";

const { firebaseConfig } = getEnvVars();

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="EventInfo" component={EventInfo} />
      <MainStack.Screen name="ParlayInfo" component={ParlayInfo} />
      <MainStack.Screen name="NewEvent" component={NewEvent} />
      <MainStack.Screen name="BingoSquareInfo" component={BingoSquareInfo} />
      <MainStack.Screen name="Settings" component={Settings} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      initialRouteName="Master"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="Master"
        component={Master}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Main" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"cube"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
