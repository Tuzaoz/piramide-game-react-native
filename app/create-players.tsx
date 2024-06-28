import React from "react";
import { StyleSheet, Text, View } from "react-native";

const CreatePlayers = () => {
  return (
    <View style={styles.container}>
      <Text>Create Players</Text>
    </View>
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

export default CreatePlayers;
