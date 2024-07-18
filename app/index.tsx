import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { Link } from "expo-router";
import CreatePlayer from "@/components/create-player";
import { embaralharBaralho, gerarBaralho } from "@/utils/gerar-baralho";
import Entrance from "@/components/entrance";
export type Player = {
  id: string;
  name: string;
  hand: any[];
  drinkCount: number;
};
export type Game = {
  players: Player[];
  currentPlayer: Player;
  deck: any[];
  stage:
    | "homeScreen"
    | "createPlayer"
    | "entrance1"
    | "entrance2"
    | "entrance3"
    | "entrance4"
    | "heaven"
    | "hell";
};

const Index = () => {
  const [players, setPlayers] = React.useState<Player[]>([
    { id: "1", name: "Jogador 1", hand: [], drinkCount: 0 },
    { id: "2", name: "Jogador 2", hand: [], drinkCount: 0 },
  ]);
  const baralho = gerarBaralho();
  const baralhoEmbaralhado = embaralharBaralho(baralho);
  const [game, setGame] = React.useState<Game>({
    players: players,
    deck: baralhoEmbaralhado,
    stage: "entrance1",
    currentPlayer: players[0],
  });
  const handleChangeStage = (stage: Game["stage"]) => {
    setGame((currentGame: Game) => {
      return {
        ...currentGame,
        stage,
      };
    });
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/images/Design-sem-nome-(1).png")}
        style={styles.backgroundImage}
      >
        <StatusBar style="auto" />
        {game.stage === "homeScreen" && (
          <View style={styles.container}>
            <Image
              style={{ width: 300, height: 300 }}
              source={require("../assets/images/Engravers__Old_English_BT-removebg-preview-(1).png")}
            />
            <Button
              title="Iniciar"
              onPress={() => handleChangeStage("createPlayer")}
              buttonStyle={styles.buttonContainer}
              textStyle={styles.buttonText}
            />
          </View>
        )}
        {game.stage === "createPlayer" && (
          <CreatePlayer
            players={players}
            setPlayers={setPlayers}
            handleStage={handleChangeStage}
          />
        )}
        {game.stage.slice(0, -1) === "entrance" && (
          <Entrance
            players={players}
            game={game}
            setGame={setGame}
            setPlayers={setPlayers}
          />
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButton: {
    backgroundColor: "#b58df1",
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#834fada4",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    padding: 10,
    width: 100,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
export default Index;
