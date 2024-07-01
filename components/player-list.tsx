import { Player } from "@/app";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const PlayerList = ({
  player,
  setPlayer,
}: {
  player: Player;
  setPlayer: any;
}) => {
  function handleDelete(id: string) {
    setPlayer((currentPlayers: Player[]) => {
      return currentPlayers.filter((player) => player.id !== id);
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{player.name}</Text>
      <Button
        buttonStyle={styles.buttonStyle}
        textStyle={styles.textStyle}
        title="Excluir"
        onPress={() => handleDelete(player.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: 310,
    flexDirection: "row",
    backgroundColor: "#eba74e",
    alignItems: "center",
    borderColor: "#fc7b12",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  text: { fontSize: 25, color: "#fff", padding: 10 },
  buttonStyle: {
    display: "flex",
    backgroundColor: "#fc5412",
    marginRight: 10,
    height: 40,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 12,
    color: "#fff",
  },
});

export default PlayerList;
