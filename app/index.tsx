import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";

const Index = () => {
  return (
    <>
      <ImageBackground
        source={require("../assets/images/Design-sem-nome-(1).png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../assets/images/Engravers__Old_English_BT-removebg-preview (1).png")}
          />
          <StatusBar style="auto" />
          <Button
            title="Iniciar"
            onPress={() => console.log("Button pressed")}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  container: {
    flex: 1,
    backgroundColor: "#834fada4",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Index;
