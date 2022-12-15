import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import UserPermission from "../Permission/UserPermission";
import * as ImagePicker from "expo-image-picker";
import Fire from "../Fire";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = () => {
    Fire.shared.createUser({ name, email, password, avatar });
  };

  const handlePickAvatar = async () => {
    UserPermission.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 3],
    });

    if (result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image
        source={require("../assets/authHeader.png")}
        style={{
          marginTop: -180,
          marginLeft: -50,
        }}
      />
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color="#FFF" />
      </TouchableOpacity>
      <View
        style={{
          position: "absolute",
          top: 60,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={styles.greeting}>{"Hello \n Sign Up to get Started"}</Text>
        <TouchableOpacity
          style={styles.avatarPlaceholder}
          onPress={handlePickAvatar}
        >
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Ionicons
            name="ios-add"
            size={40}
            color="white"
            style={{ marginTop: 6, marginLeft: 2 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.errormsg}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(name) => setName(name)}
            value={name}
          ></TextInput>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
            value={email}
          ></TextInput>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(password) => setPassword(password)}
            value={password}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 }}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={{ color: "#414959", fontSize: 15 }}>
          Already have an Account?{" "}
          <Text style={{ fontWeight: "500", color: "#1e90ff" }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 25,
    fontWeight: "400",
    textAlign: "center",
  },
  errormsg: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    marginTop: 50,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 12,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#1e90ff",
    borderRadius: 4,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#E9446A",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  back: {
    position: "absolute",
    top: 48,
    left: 25,
    width: 30,
    height: 30,
    borderRadius: 16,
    backgroundColor: "rgba(21,22,48,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default RegisterScreen;
