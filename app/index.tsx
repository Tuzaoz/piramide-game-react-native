import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { Link } from "expo-router";

const Index = () => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../assets/images/Engravers__Old_English_BT-removebg-preview-(1).png")}
        />
        <StatusBar style="auto" />
        <Button title="Iniciar" onPress={() => console.log("Button pressed")} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#834fada4",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Index;
