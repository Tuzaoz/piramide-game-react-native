import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export interface ButtonProps {
  title: string;
  onPress: any;
  route?: string;
  buttonStyle?: any;
  textStyle?: any;
}

const Button = ({
  route,
  title,
  onPress,
  buttonStyle,
  textStyle,
}: ButtonProps) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#451ca5" : "#5731b1",
          },
          buttonStyle,
        ]}
      >
        <Text style={textStyle}> {title} </Text>
      </Pressable>
    </View>
  );
};

export default Button;
