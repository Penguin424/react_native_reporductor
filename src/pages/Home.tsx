import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Swiper from "../components/Swiper";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Swiper />
      <Pressable
        onPress={() => navigation.navigate("/clases")}
        style={styles.divButton}
      >
        <Text style={{ color: "white", fontSize: 18 }}>IR A CLASE</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,

    // alignItems: "center",
  },
  divButton: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#4CAAB1",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});

export default Home;
