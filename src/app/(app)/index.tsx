import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// const insets = useSafeAreaInsets();
const Home = () => {

  return (
    <View>
      <Text>Home</Text>
      <Link href={"/login"}>Go to Login</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});