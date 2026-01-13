import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const insets = useSafeAreaInsets();
const HariIniScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hari Ini</Text>
      <Link href={"/login"} style={styles.link}>
        Go to Login
      </Link>
    </View>
  );
};

export default HariIniScreen;

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
  link: {
    marginTop: 20,
    color: "blue",
  },
});
