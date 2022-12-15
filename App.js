import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import MessageScreen from "./screens/MessageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AppStack = createStackNavigator();
const AppTab = createBottomTabNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyDq89xqcvWh-tcr115gt7O35XHia_MZjS0",
  authDomain: "socialapplication-10a5c.firebaseapp.com",
  projectId: "socialapplication-10a5c",
  storageBucket: "socialapplication-10a5c.appspot.com",
  messagingSenderId: "901578680890",
  appId: "1:901578680890:web:452fae6a7b3c0622c1e303",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const TabNavigation = () => (
  <AppTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Post") {
          return (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#007AFF",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="ios-add" size={30} color="#fff" />
            </View>
          );
        }

        let iconName;
        if (route.name === "Home") iconName = "ios-home";
        if (route.name === "Message") iconName = "ios-chatbox";
        if (route.name === "Notification") iconName = "ios-notifications";
        if (route.name === "Profile") iconName = "ios-person";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerShown: false,
    })}
    tabBarOptions={{
      activeTintColor: "#919191",
      inactiveTintColor: "#D2D2D2",
      showLabel: false,
    }}
    navigationOptions={{
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        if (navigation.state.key === "post") {
          console.log("opening post modal");
          navigation.navigate("postModal");
        } else {
          defaultHandler();
        }
      },
    }}
  >
    <AppTab.Screen name="Home" component={HomeScreen} />
    <AppTab.Screen name="Message" component={MessageScreen} />
    <AppTab.Screen name="Post" component={PostScreen} />
    <AppTab.Screen name="Notification" component={NotificationScreen} />
    <AppTab.Screen name="Profile" component={ProfileScreen} />
  </AppTab.Navigator>
);

const AppNavigation = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Main" component={TabNavigation} />
    <AppStack.Screen name="postModal" component={PostScreen} mode="modal" />
  </AppStack.Navigator>
);

const AuthStack = createStackNavigator();
const AuthNavigation = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  console.ignoredYellowBox = ["Setting a timer"];

  firebase.auth().onAuthStateChanged((user) => {
    setIsLoggedIn(!!firebase.auth().currentUser);
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default App;
