import { Stack } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
const styles = StyleSheet.create({});
