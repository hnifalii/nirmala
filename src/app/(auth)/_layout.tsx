import { Slot } from "expo-router";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Slot />
    </View>
  );
}
