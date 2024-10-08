import { Game, Player } from "@/app";
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { FlipCard } from "./rotate";
import EntranceButtons from "./entrance-buttons";
import Card from "./card";

export interface EntranceProps {
  game: Game;
  players: Player[];
  setGame: any;
  setPlayers: any;
}

const Pyramid = ({ game, players, setGame, setPlayers }: EntranceProps) => {
  const isFlipped = useSharedValue(false);
  const fadeIn = useSharedValue(false);
  const fadeOut = useSharedValue(false);

  const { deck, currentPlayer } = game;
  const playingCards = deck.slice(0, 3);
  const [isDisabledButtons, setisDisabledButtons] = useState(false);
  const [entrance, setEntrance] = useState(1);

  const handleFlip1 = () => {
    if (isFlipped.value) {
      fadeOut.value = true;
      isFlipped.value = !isFlipped.value;
      return;
    }
  };

  const handleFlip = () => {
    isFlipped.value = !isFlipped.value;
  };

  const handleNextPlayer = () => {
    if (players.indexOf(currentPlayer) === players.length - 1) {
      setEntrance((prevEntrance) => {
        const newEntrance = prevEntrance + 1;

        setGame((currentGame: Game) => {
          return {
            ...currentGame,
            currentPlayer: players[0],
            deck: deck.slice(1),
            stage: newEntrance >= 4 ? "hell" : `entrance${newEntrance}`,
          };
        });

        return newEntrance; // Update the entrance state
      });
    } else {
      setGame((currentGame: Game) => {
        return {
          ...currentGame,
          currentPlayer: players[players.indexOf(currentPlayer) + 1],
          deck: deck.slice(1),
        };
      });
    }
  };

  const handleAddCard = () => {
    setGame((currentGame: Game) => {
      return {
        ...currentGame,
        players: players[players.indexOf(currentPlayer)].hand.push(deck[0]),
      };
    });
  };
  const handleAfterResult = async () => {
    setisDisabledButtons(true);
    handleAddCard();
    handleFlip1();
    handleFlip();
    await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      handleNextPlayer();
      fadeOut.value = false;
    });
    setisDisabledButtons(false);
  };

  const handleDrinkCounter = () => {
    setPlayers((currentPlayers: Player[]) => {
      currentPlayers[players.indexOf(currentPlayer)].drinkCount += 1;
      return currentPlayers;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {playingCards.map((playingCard) => (
          <FlipCard
            isFlipped={isFlipped}
            cardStyle={{ width: 97, height: 150 }}
            FlippedContent={<Text>legal</Text>}
            card={playingCard}
            fadeIn={fadeIn}
            fadeOut={fadeOut}
          />
        ))}
      </View>
      {players.map((player) => (
        <>
          <View style={styles.playerNameContainer}>
            <Text style={styles.playerName}>{player?.name}</Text>
            <Text style={styles.playerName}>{player?.drinkCount + " 🥃"}</Text>
          </View>
          <View style={styles.handContainer}>
            {players[players.indexOf(currentPlayer)]?.hand?.map((card, i) => (
              <Card
                key={card.valor + card.naipe + i}
                card={card}
                cardStyle={{ width: 45, height: 75 }}
              />
            ))}
          </View>
        </>
      ))}
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
    borderWidth: 2,
    padding: 10,
    borderColor: "#fff",
    borderRadius: 10,
    margin: 20,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "95%",
    minHeight: 160,
    padding: 10,
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
  playerNameContainer: {
    backgroundColor: "#5d0098",
    width: "50%",
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
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
  playerName: {
    fontSize: 18,
    color: "#fff",
  },
});

export default Pyramid;
