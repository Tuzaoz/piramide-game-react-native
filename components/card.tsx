import { Carta } from "@/utils/gerar-baralho";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HearthsSvg from "./naipes/hearths";
import DiamondsSvgComponent from "./naipes/diamonds";
import ClubsSvgComponent from "./naipes/clubs";
import SpadesSvgComponent from "./naipes/spades";

function cardHandler(card: Carta) {
  const cardRenderAttributes: {
    color?: string;
    cardComponent?: React.ReactNode;
    valor?: string;
  } = {};
  switch (card?.naipe) {
    case "Copas":
      cardRenderAttributes["cardComponent"] = (
        <HearthsSvg height={25} width={25} />
      );
      cardRenderAttributes["color"] = "#ff291a";
      break;
    case "Ouros":
      cardRenderAttributes["cardComponent"] = (
        <DiamondsSvgComponent height={25} width={25} />
      );
      cardRenderAttributes["color"] = "#ff291a";
      break;
    case "Paus":
      cardRenderAttributes["cardComponent"] = (
        <ClubsSvgComponent height={25} width={25} />
      );
      cardRenderAttributes["color"] = "#000";
      break;
    case "Espadas":
      cardRenderAttributes["cardComponent"] = (
        <SpadesSvgComponent height={25} width={25} />
      );
      cardRenderAttributes["color"] = "#000";
      break;
  }

  switch (card?.valor) {
    case "13":
      cardRenderAttributes["valor"] = "K";
      break;
    case "12":
      cardRenderAttributes["valor"] = "Q";
      break;
    case "11":
      cardRenderAttributes["valor"] = "J";
      break;
    case "1":
      cardRenderAttributes["valor"] = "A";
      break;
    default:
      cardRenderAttributes["valor"] = card?.valor;
      break;
  }
  return cardRenderAttributes;
}
interface CardProps {
  cardStyle: any;
  card: Carta;
}

const Card = ({ cardStyle, card }: CardProps) => {
  const cardAttribute = cardHandler(card);

  return (
    <View>
      <View style={[flipCardStyles.flippedCard, cardStyle]}>
        <View style={[flipCardStyles.cardStylefront, cardStyle]}>
          <View style={flipCardStyles.cardStyleFrontHeader}>
            <View
              style={{
                marginLeft: 5,
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: cardAttribute.color }}>
                {cardAttribute.valor}
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
                marginRight: 5,
                marginBottom: 8,
                alignItems: "center",
              }}
            >
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                {cardAttribute.cardComponent}
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: cardAttribute.color,
                  transform: [{ rotate: "180deg" }],
                }}
              >
                {cardAttribute.valor}
              </Text>
            </View>
          </View>
        </View>
      </View>
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
    justifyContent: "center",
  },
  cardStyleFrontCenter: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Card;
