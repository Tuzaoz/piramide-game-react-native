import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import Button from "./Button";
import Entrance from "./entrance";
import { Carta } from "@/utils/gerar-baralho";

const EntranceButtons = ({
  entrance,
  onPress,
  card,
}: {
  entrance: string;
  onPress: () => void;
  card: Carta;
}) => {
  const handlePress1 = (value: string) => {
    const cardColor =
      card.naipe === "Copas" || card.naipe === "Ouros" ? "Vermelha" : "Preta";
    if (value === cardColor) {
      Alert.alert("Acertou!");
    } else {
      Alert.alert("Errou!");
    }
    onPress();
  };

  const entranceButtonsObj = {
    entrance1: (
      <View>
        <Button
          buttonStyle={e1Styles.buttonContainer}
          textStyle={e1Styles.ButtonText}
          title="Preta"
          onPress={handlePress1("Preta")}
        />
        <Button
          buttonStyle={e1Styles.buttonContainer}
          textStyle={e1Styles.ButtonText}
          title="Vermelha"
          onPress={handlePress1("Vermelha")}
        />
      </View>
    ),
    // entrance2: (
    //   <View>
    //     <Button
    //       buttonStyle={styles.startButtonContainer}
    //       textStyle={styles.startButtonText}
    //       title="Iniciar Jogo"
    //       onPress={handleStartGame}
    //     />
    //   </View>
    // ),
  };

  return entranceButtonsObj[entrance] || null;
};

const e1Styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontSize: 24,
    color: "#fff",
  },
});

export default EntranceButtons;
