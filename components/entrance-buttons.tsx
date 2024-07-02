import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

const EntranceButtons = ({ entrance }: { entrance: string }) => {
    const entranceButtonsObj = {
        entrance1: (
            <View>
                <Button
                    buttonStyle={styles.startButtonContainer}
                    textStyle={styles.startButtonText}
                    title="Iniciar Jogo"
                    onPress={handleStartGame}
                />
            </View>
        )
    };

    return entranceButtonsObj[entrance] || null;
};

  return <View></View>;
};

const styles = StyleSheet.create({});

export default EntranceButtons;
