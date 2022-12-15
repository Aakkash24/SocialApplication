import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MessageScreen = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Messages</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6EBEC",
  },
  header: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1886B3",
    padding: 64,
    textAlign: "center",
  },
});

export default MessageScreen;
