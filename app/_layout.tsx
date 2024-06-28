import { Stack } from "expo-router";
import CreatePlayers from "./create-players";
import { ImageBackground, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <ImageBackground
        source={require("../assets/images/Design-sem-nome-(1).png")}
        style={styles.backgroundImage}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="create-players" />
      </ImageBackground>
    </Stack>
  );
}
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
});
