import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useEffect } from "react";
import Fire from "../Fire";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? "App" : "Auth");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading Screen...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
