import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // console.log("Login Pressed");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => setError(err.message));
  };

  LayoutAnimation.easeInEaseOut();
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
      <Text style={styles.greeting}>{"Hello Again.\n Welcome Back"}</Text>
      <View style={styles.errormsg}>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={styles.form}>
        <View>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 30 }}
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        <Text style={{ color: "#414959", fontSize: 15 }}>
          New to Social App?{" "}
          <Text style={{ fontWeight: "500", color: "#1e90ff" }}>Sign Up</Text>
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
    fontSize: 30,
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
});

export default LoginScreen;
