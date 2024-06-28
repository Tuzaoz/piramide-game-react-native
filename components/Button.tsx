import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  route?: string;
}

const Button = ({ route, title, onPress }: ButtonProps) => {
  return (
    <View>
      <Link href="/create-players" asChild>
        <Pressable
          // onPress={onPress}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#451ca5" : "#5731b1",
            },
            styles.buttonContainer,
          ]}
        >
          <Text style={styles.text}> {title} </Text>
        </Pressable>
      </Link>
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
