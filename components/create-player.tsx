import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "./Button";
import { Player } from "@/app";
import PlayerList from "./player-list";
type CreatePlayerProps = {
  players: Player[];
  setPlayers: any;
  handleStage: any;
};

const CreatePlayer = ({
  players,
  setPlayers,
  handleStage,
}: CreatePlayerProps) => {
  const [playerValue, setPlayerValue] = React.useState("");

  const handlePlayerInput = (enteredText: string) => {
    setPlayerValue(enteredText);
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      alert("Adicione mais jogadores");
      return;
    }
    handleStage("entrance1");
  };

  function handlePlayerSubmit() {
    if (!playerValue) {
      alert("Digite um nome para o jogador");
      return;
    }
    setPlayers((currentplayers) => [
      ...currentplayers,
      {
        id: Math.random().toString(),
        name: playerValue,
        hand: [],
        drinkCount: 0,
      },
    ]);
    setPlayerValue("");
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "#fff", marginBottom: 10 }}>
        Cadastre os jogadores
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            backgroundColor: "#ebebeb",
            borderWidth: 1,
            color: "#834fada4",
            width: 200,
            fontWeight: "bold",
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholderTextColor={"#834fada4"}
          placeholder="Nome do jogador"
          value={playerValue}
          onChangeText={handlePlayerInput}
        ></TextInput>
        <Button
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          title="Cadastrar"
          onPress={handlePlayerSubmit}
        />
      </View>
      {players.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={players}
            renderItem={({ item }) => (
              <PlayerList setPlayer={setPlayers} player={item} />
            )}
            keyExtractor={(player) => player.id}
            style={styles.list}
          />
        </View>
      )}
      <View>
        <Button
          buttonStyle={styles.startButtonContainer}
          textStyle={styles.startButtonText}
          title="Iniciar Jogo"
          onPress={handleStartGame}
        />
      </View>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "90%",
    justifyContent: "center",
  },
  listContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    maxHeight: 300,
    borderRadius: 5,
    padding: 10,
  },

  buttonContainer: {
    display: "flex",
    marginLeft: 10,
    padding: 10,
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 12,
    color: "#fff",
  },
  startButtonContainer: {
    display: "flex",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  startButtonText: {
    fontSize: 20,
    color: "#fff",
  },
});

export default CreatePlayer;
