import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  LayoutAnimation,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment/moment";
import { MaterialIcons } from "@expo/vector-icons";

const posts = [
  {
    id: "1",
    name: "Aakkash",
    text: "Jeffrey Preston Bezos is an American entrepreneur, media proprietor, investor, and commercial astronaut. He is the founder, executive chairman, and former president and CEO of Amazon",
    avatar: require("../assets/temporary.webp"),
    image: require("../assets/jeff.jpg"),
    timestamp: 123456,
  },
  {
    id: "2",
    name: "Anshika",
    text: "Elon Reeve Musk is a business magnate and investor. He is the founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; owner and CEO of Twitter, Inc.; founder of The Boring Company; co-founder of Neuralink and OpenAI; and president of the Musk",
    avatar: require("../assets/t2.webp"),
    image: require("../assets/ElonMusk.png"),
    timestamp: 123456,
  },
  {
    id: "3",
    name: "Singh",
    text: "Gautam Shantilal Adani is an Indian billionaire industrialist. He is the chairman and founder of Adani Group, an Ahmedabad-based multinational conglomerate involved in port development and operations in India. Adani is also the president of Adani Foundation, which is primarily led by his wife, Priti Adani.",
    avatar: require("../assets/t3.jpg"),
    timestamp: 123456,
    image: require("../assets/GA.webp"),
  },
  {
    id: "4",
    name: "Mark",
    text: "Mark Elliot Zuckerberg is an American business magnate, internet entrepreneur, and philanthropist. He is known for co-founding the social media website Facebook and its parent company Meta Platforms, of which he is the chairman, chief executive officer, and controlling shareholder.",
    timestamp: 123456,
    avatar: require("../assets/t4.jpg"),
    image: require("../assets/mz.png"),
  },
];

const renderPost = (post) => {
  return (
    <View style={styles.feedItem}>
      <Image source={post.avatar} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.name}>{post.name}</Text>
            <Text style={styles.timestamp}>
              {moment(post.timestamp).fromNow()}
            </Text>
          </View>
          <MaterialIcons name="more-horiz" size={24} color="#73788B" />
        </View>
        <Text style={styles.posts}>{post.text}</Text>
        <Image
          source={post.image}
          resizeMode="cover"
          style={styles.postImage}
        />
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="heart-outline"
            size={24}
            color="#73788B"
            style={{
              marginRight: 15,
            }}
          />
          <Ionicons name="ios-chatbox" size={24} color="#73788B" />
        </View>
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const { email, displayName } = firebase.auth().currentUser;
  const signOut = () => {
    firebase.auth().signOut();
  };
  LayoutAnimation.easeInEaseOut();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Feed</Text>
      </View>
      <FlatList
        style={styles.feed}
        data={posts}
        renderItem={({ item }) => renderPost(item)}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFECF4",
  },
  header: {
    paddingTop: 45,
    paddingBottom: 16,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginRight: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 10,
    color: "C4C6CE",
    marginTop: 4,
  },
  posts: {
    marginTop: 15,
    fontSize: 15,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 15,
  },
});

export default HomeScreen;
