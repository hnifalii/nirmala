import { View, Text, StyleSheet } from "react-native";

export default function PolaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Gilroy-Bold",
    fontSize: 24,
    color: "#333",
  },
});
