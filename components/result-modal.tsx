import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
interface ResultModalProps {
  setMessageVisible: any;
  onPress: any;
  type: string;
}

const ResultModal = ({
  setMessageVisible,
  type,
  onPress,
}: ResultModalProps) => {
  const message = type === "win" ? "Acertou! Salvo" : "Errou! Beba!";
  const handlePress = () => {
    setMessageVisible({ visible: false, type: "" });
    
    onPress();
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{message}</Text>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={handlePress}
        >
          <Text style={styles.textStyle}>Continuar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ResultModal;
