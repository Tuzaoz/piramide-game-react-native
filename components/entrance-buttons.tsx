import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import Entrance from "./entrance";
import { Carta } from "@/utils/gerar-baralho";
import ResultModal from "./result-modal";
import { Player } from "@/app";
import HearthsSvg from "./naipes/hearths";
import SpadesSvgComponent from "./naipes/spades";
import DiamondsSvgComponent from "./naipes/diamonds";
import ClubsSvgComponent from "./naipes/clubs";

interface EntranceButtonsProps {
  entrance: string;
  onPress: () => void;
  card: Carta;
  handleAfterResult: () => void;
  handeDrinkCounter: () => void;
  isDisabledButtons?: boolean;
  player: Player;
}
function sortCardsByValue(cards: Carta[]): Carta[] {
  return cards.sort((a, b) => parseInt(a.valor) - parseInt(b.valor));
}
const EntranceButtons = ({
  entrance,
  onPress,
  card,
  handleAfterResult,
  handeDrinkCounter,
  isDisabledButtons,
  player,
}: EntranceButtonsProps) => {
  const [modal, setModal] = useState({ visible: false, type: "" });

  const handlePress1 = (value: string) => {
    onPress();
    const cardColor =
      card.naipe === "Copas" || card.naipe === "Ouros" ? "Vermelha" : "Preta";
    if (cardColor !== value) {
      handeDrinkCounter();
    }
    setModal({ visible: true, type: cardColor === value ? "win" : "lose" });
  };
  const handlePress2 = (value: string) => {
    onPress();
    const cardValue = parseInt(card.valor);
    let result = "win";
    if (value === "Maior" && cardValue < player.hand[0].valor) {
      handeDrinkCounter();
      result = "lose";
    } else if (value === "Menor" && cardValue > player.hand[0].valor) {
      handeDrinkCounter();
      result = "lose";
    }
    setModal({ visible: true, type: result });
  };

  const handlePress3 = (value: string) => {
    onPress();
    const cardValue = parseInt(card.valor);
    let result = "win";
    sortCardsByValue(player.hand);
    const isInside =
      cardValue > player.hand[0].valor && cardValue < player.hand[1].valor;

    if (isInside && value === "Fora") {
      handeDrinkCounter();
      result = "lose";
    } else if (!isInside && value === "Dentro") {
      handeDrinkCounter();
      result = "lose";
    }
    setModal({ visible: true, type: result });
  };

  const handlePress4 = (value: string) => {
    onPress();
    let result = "win";

    if (value !== card.naipe) {
      handeDrinkCounter();
      result = "lose";
    }
    setModal({ visible: true, type: result });
  };

  const entranceButtonsObj = {
    entrance1: (
      <View style={e1Styles.buttonsContainer}>
        <Button
          buttonStyle={[
            e1Styles.buttonContainer,
            { backgroundColor: isDisabledButtons ? "#6868687b" : "#111111" },
          ]}
          textStyle={e1Styles.ButtonText}
          title="Preta"
          onPress={() => (isDisabledButtons ? null : handlePress1("Preta"))}
        />
        <Button
          buttonStyle={[
            e1Styles.buttonContainer,
            { backgroundColor: isDisabledButtons ? "#6868687b" : "#ff291a" },
          ]}
          textStyle={e1Styles.ButtonText}
          title="Vermelha"
          onPress={() => (isDisabledButtons ? null : handlePress1("Vermelha"))}
        />
      </View>
    ),
    entrance2: (
      <View style={e1Styles.buttonsContainer}>
        <Button
          buttonStyle={[
            e1Styles.buttonContainer,
            { backgroundColor: isDisabledButtons ? "#6868687b" : "#111111" },
          ]}
          textStyle={e1Styles.ButtonText}
          title="Menor"
          onPress={() => (isDisabledButtons ? null : handlePress2("Menor"))}
        />
        <Button
          buttonStyle={[
            e1Styles.buttonContainer,
            { backgroundColor: isDisabledButtons ? "#6868687b" : "#ff291a" },
          ]}
          textStyle={e1Styles.ButtonText}
          title="Maior"
          onPress={() => (isDisabledButtons ? null : handlePress2("Maior"))}
        />
      </View>
    ),
    entrance3: (
      <View style={e1Styles.buttonsContainer}>
        <Button
          buttonStyle={[
            e1Styles.buttonContainer,
            { backgroundColor: isDisabledButtons ? "#6868687b" : "#111111" },
          ]}
          textStyle={e1Styles.ButtonText}
          title="Dentro"
          onPress={() => (isDisabledButtons ? null : handlePress3("Dentro"))}
        />
        <Button
          buttonStyle={[
            e1Styles.buttonContainer,
            { backgroundColor: isDisabledButtons ? "#6868687b" : "#ff291a" },
          ]}
          textStyle={e1Styles.ButtonText}
          title="Fora"
          onPress={() => (isDisabledButtons ? null : handlePress3("Fora"))}
        />
      </View>
    ),
    entrance4: (
      <View style={e1Styles.buttonsContainer}>
        <View style={e1Styles.buttonsCol}>
          <Pressable
            onPress={() => (isDisabledButtons ? null : handlePress4("Copas"))}
            style={[
              e1Styles.buttonContainer,
              { backgroundColor: isDisabledButtons ? "#6868687b" : "#420000" },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={e1Styles.ButtonText}> Copas </Text>
              <HearthsSvg height={25} width={25} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => (isDisabledButtons ? null : handlePress4("Espadas"))}
            style={[
              e1Styles.buttonContainer,
              { backgroundColor: isDisabledButtons ? "#6868687b" : "#3a3a3a" },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={e1Styles.ButtonText}> Espadas </Text>
              <SpadesSvgComponent height={25} width={25} />
            </View>
          </Pressable>
        </View>
        <View style={e1Styles.buttonsCol}>
          <Pressable
            onPress={() => (isDisabledButtons ? null : handlePress4("Paus"))}
            style={[
              e1Styles.buttonContainer,
              { backgroundColor: isDisabledButtons ? "#6868687b" : "#3a3a3a" },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={e1Styles.ButtonText}> Paus </Text>
              <ClubsSvgComponent height={25} width={25} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => (isDisabledButtons ? null : handlePress4("Ouros"))}
            style={[
              e1Styles.buttonContainer,
              { backgroundColor: isDisabledButtons ? "#6868687b" : "#420000" },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={e1Styles.ButtonText}> Ouros </Text>
              <DiamondsSvgComponent height={25} width={25} />
            </View>
          </Pressable>
        </View>
      </View>
    ),
  };

  return (
    <>
      {modal.visible ? (
        <ResultModal
          type={modal.type}
          setMessageVisible={setModal}
          onPress={handleAfterResult}
        />
      ) : (
        entranceButtonsObj[entrance] || null
      )}
    </>
  );
};

const e1Styles = StyleSheet.create({
  buttonsCol: {
    flexDirection: "column",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  ButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
});

export default EntranceButtons;
