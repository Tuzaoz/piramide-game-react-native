import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import HearthsSvg from "./naipes/hearths";
import ClubsSvgComponent from "./naipes/clubs";
import DiamondsSvgComponent from "./naipes/diamonds";
import SpadesSvgComponent from "./naipes/spades";
import { Carta } from "@/utils/gerar-baralho";

function cardHandler(card: Carta) {
  const cardRenderAttributes: {
    color?: string;
    cardComponent?: React.ReactNode;
  } = {};
  switch (card?.naipe) {
    case "Copas":
      cardRenderAttributes["cardComponent"] = (
        <HearthsSvg height={40} width={40} />
      );
      cardRenderAttributes["color"] = "#ff291a";
      break;
    case "Ouros":
      cardRenderAttributes["cardComponent"] = (
        <DiamondsSvgComponent height={40} width={40} />
      );
      cardRenderAttributes["color"] = "#ff291a";
      break;
    case "Paus":
      cardRenderAttributes["cardComponent"] = (
        <ClubsSvgComponent height={40} width={40} />
      );
      cardRenderAttributes["color"] = "#000";
      break;
    case "Espadas":
      cardRenderAttributes["cardComponent"] = (
        <SpadesSvgComponent height={40} width={40} />
      );
      cardRenderAttributes["color"] = "#000";
      break;
  }
  return cardRenderAttributes;
}

export const FlipCard = ({
  isFlipped,
  cardStyle,
  direction = "y",
  duration = 500,
  FlippedContent,
  card,
}) => {
  const isDirectionX = direction === "x";
  const cardAttribute = cardHandler(card);
  const regularCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  const flippedCardAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });

    return {
      transform: [
        isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue },
      ],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          flipCardStyles.regularCard,
          cardStyle,
          regularCardAnimatedStyle,
        ]}
      >
        <LinearGradient
          colors={["#5d0098", "#5c0979", "#a200ff"]}
          style={flipCardStyles.cardStyleBack}
        >
          <Text style={flipCardStyles.questionMark}>?</Text>
        </LinearGradient>
      </Animated.View>
      <Animated.View
        style={[
          flipCardStyles.flippedCard,
          cardStyle,
          flippedCardAnimatedStyle,
        ]}
      >
        <View style={flipCardStyles.cardStylefront}>
          <View style={flipCardStyles.cardStyleFrontHeader}>
            <View
              style={{
                marginLeft: 10,
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, color: cardAttribute.color }}>
                {card.valor}
              </Text>
              {cardAttribute.cardComponent}
            </View>
          </View>
          <View style={flipCardStyles.cardStyleFrontCenter}>
            {cardAttribute.cardComponent}
          </View>
          <View style={flipCardStyles.cardStyleFrontFooter}>
            <View
              style={{
                marginRight: 10,
                marginBottom: 10,
                alignItems: "center",
              }}
            >
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                {cardAttribute.cardComponent}
              </View>
              <Text
                style={{
                  fontSize: 30,
                  color: cardAttribute.color,
                  transform: [{ rotate: "180deg" }],
                }}
              >
                {card.valor}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  regularCard: {
    position: "absolute",
    zIndex: 1,
  },
  flippedCard: {
    backfaceVisibility: "hidden",
    zIndex: 2,
  },
  cardStylefront: {
    marginTop: 20,
    width: 194,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardStyleFrontHeader: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardStyleFrontFooter: {
    flex: 1,
    alignItems: "flex-end",
  },
  cardStyleFrontCenter: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
