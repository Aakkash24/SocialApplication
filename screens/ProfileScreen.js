import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import Fire from "../Fire";
import { useState } from "react";
import { useEffect } from "react";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const uid = Fire.shared.uid;
    const unsubscribe = Fire.shared.firestore
      .collection("users")
      .doc(uid)
      .onSnapshot((doc) => {
        const user = doc.data();
        setName(name);
        setAvatar(avatar);
      });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={
                avatar ? { uri: avatar } : require("../assets/Avatat.png")
              }
            />
          </View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>21</Text>
            <Text style={styles.statTitle}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>981</Text>
            <Text style={styles.statTitle}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>63</Text>
            <Text style={styles.statTitle}>Following</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Fire.shared.signOut()}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E6EBEC",
  },
  avatarContainer: {
    shadowColor: "#151734",
    shadowRadius: 15,
    shadowOpacity: 0.2,
    borderRadius: 73,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 42,
    fontWeight: "800",
    color: "#1F7EED",
    // marginBottom: 80,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginVertical: 64,
    marginBottom: 128,
  },
  stat: {
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    minWidth: 100,
    borderRadius: 19,
    backgroundColor: "#fff",
  },
  statAmount: {
    color: "#5AC8FA",
    fontSize: 36,
    fontWeight: "600",
  },
  statTitle: {
    color: "#c3c5cd",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 42,
    backgroundColor: "#fff",
    borderRadius: 26,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#1F7EED",
    fontWeight: "500",
  },
});

export default ProfileScreen;
