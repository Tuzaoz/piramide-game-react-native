import { Game, Player } from "@/app";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { FlipCard } from "./rotate";

export interface EntranceProps {
  game: Game;
  players: Player[];
  deck: any[];
  setGame: any;
  setPlayers: any;
}

const Entrance = ({
  game,
  players,
  deck,
  setGame,
  setPlayers,
}: EntranceProps) => {
  const isFlipped = useSharedValue(false);

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
    if (!isFlipped.value) {
      new Promise((resolve) => setTimeout(resolve, 500));
      setGame((currentGame: Game) => {
        return {
          ...currentGame,
          deck: deck.slice(1),
        };
      });
    }
  };
  useEffect(() => {
    setGame((currentGame: Game) => {
      return {
        ...currentGame,
        stage: "entrance1",
        currentPlayer: players[0],
      };
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>{game?.currentPlayer?.name}</Text>
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={{ width: 194, height: 300 }}
        FlippedContent={<Text>legal</Text>}
        card={game.deck[0]}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.toggleButton} onPress={handlePress}>
          <Text style={styles.toggleButtonText}>Toggle card</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

  cardStyleBack: {
    marginTop: 20,
    width: 194,
    height: 300,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "center",
  },
  questionMark: {
    fontSize: 100,
    color: "#fff",
  },
});

export default Entrance;
