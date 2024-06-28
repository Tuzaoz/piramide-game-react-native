import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button = ({ title, onPress }: ButtonProps) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#451ca5" : "#5731b1",
          },
          styles.buttonContainer,
        ]}
      >
        <Text style={styles.text}> {title} </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    width: 100,
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});

export default Button;
