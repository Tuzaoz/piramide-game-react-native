import { Game, Player } from "@/app";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { FlipCard } from "./rotate";
import EntranceButtons from "./entrance-buttons";
import Card from "./card";

export interface EntranceProps {
  game: Game;
  players: Player[];
  setGame: any;
  setPlayers: any;
}

const Entrance = ({ game, players, setGame, setPlayers }: EntranceProps) => {
  const isFlipped = useSharedValue(false);
  const fadeIn = useSharedValue(true);
  const fadeOut = useSharedValue(false);
  const [hasFlipped, setHasFlipped] = useState(false);

  const { deck, currentPlayer } = game;
  const [playingCard, setPlayingCard] = useState(deck[0]);
  const [isDisabledButtons, setisDisabledButtons] = useState(false);
  let entrance = 1;
  const handleFlip = () => {
    if (!hasFlipped) {
      isFlipped.value = !isFlipped.value;
      setHasFlipped(true);
    }
  };

  const handleNextPlayer = () => {
    setGame((currentGame: Game) => {
      return {
        ...currentGame,
        currentPlayer: players[players.indexOf(currentPlayer) + 1],
      };
    });
  };
  const handleAddCard = () => {
    setGame((currentGame: Game) => {
      return {
        ...currentGame,
        players: players[players.indexOf(currentPlayer)].hand.push(deck[0]),
        deck: deck.slice(1),
      };
    });
  };
  const handleAfterResult = () => {
    handleAddCard();
    fadeOut.value = true;
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      handleNextPlayer();
      fadeOut.value = false;
      fadeIn.value = true;
      handleFlip();
      setHasFlipped(false); // Reset the flip state for the next card
    });
  };

  const handlePress = () => {
    isFlipped.value = !isFlipped.value;
    if (!isFlipped.value) {
      new Promise((resolve) => setTimeout(resolve, 500));

      if (players.indexOf(currentPlayer) === players.length - 1) {
        setGame((currentGame: Game) => {
          return {
            ...currentGame,
            players: players[players.indexOf(currentPlayer)].hand.push(deck[0]),
            currentPlayer: players[0],
            deck: deck.slice(1),
            stage: `entrance${(entrance += 1)}`,
          };
        });
      } else {
        setGame((currentGame: Game) => {
          return {
            ...currentGame,
            players: players[players.indexOf(currentPlayer)].hand.push(deck[0]),
            deck: deck.slice(1),
            currentPlayer: players[players.indexOf(currentPlayer) + 1],
          };
        });
      }
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

  useEffect(() => {
    setPlayingCard(deck[0]);
  }, [deck]);

  return (
    <View style={styles.container}>
      <Text>{game?.currentPlayer?.name}</Text>
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={{ width: 194, height: 300 }}
        FlippedContent={<Text>legal</Text>}
        card={playingCard}
        fadeIn={fadeIn}
        fadeOut={fadeOut}
      />
      <View style={styles.buttonContainer}>
        <EntranceButtons
          entrance={game.stage}
          onPress={handleFlip}
          card={playingCard}
          handleAfterResult={handleAfterResult}
        />
      </View>
      <View style={styles.handContainer}>
        {players[players.indexOf(currentPlayer)]?.hand?.map((card) => (
          <Card card={card} cardStyle={{ width: 97, height: 150 }} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  handContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly", // Add this line to evenly space the children
    alignItems: "center",
    backgroundColor: "#ad8c4fa3",
    width: "95%",
    minHeight: 160,
    borderWidth: 2,
    padding: 10,
    borderColor: "#fff",
    borderRadius: 10,
    margin: 20,
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
