import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    "Gilroy-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-ExtraBold": require("../../assets/fonts/Gilroy-ExtraBold.ttf"),
    "Gilroy-Light": require("../../assets/fonts/Gilroy-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome/index" />
        <Stack.Screen name="questionnaire/index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)/index" />
      </Stack>
    </>
  );
};

export default RootLayout;
