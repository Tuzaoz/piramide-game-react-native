import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/Button";
import { Link } from "expo-router";
import CreatePlayer from "@/components/create-player";
import { embaralharBaralho, gerarBaralho } from "@/utils/gerar-baralho";
export type Player = {
  id: string;
  name: string;
  hand: any[];
  drinkCount: number;
};
type Game = {
  players: Player[];
  currentPlayer?: Player;
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
  const [players, setPlayers] = React.useState<Player[]>([]);
  const baralho = gerarBaralho();
  const baralhoEmbaralhado = embaralharBaralho(baralho);
  const [game, setGame] = React.useState<Game>({
    players: players,
    deck: baralhoEmbaralhado,
    stage: "homeScreen",
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
