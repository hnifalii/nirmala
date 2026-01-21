import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Gilroy-Black": require("../../assets/fonts/Gilroy-Black.ttf"),
    "Gilroy-BlackItalic": require("../../assets/fonts/Gilroy-BlackItalic.ttf"),
    "Gilroy-Bold": require("../../assets/fonts/Gilroy-Bold.ttf"),
    "Gilroy-BoldItalic": require("../../assets/fonts/Gilroy-BoldItalic.ttf"),
    "Gilroy-ExtraBold": require("../../assets/fonts/Gilroy-ExtraBold.ttf"),
    "Gilroy-ExtraBoldItalic": require("../../assets/fonts/Gilroy-ExtraBoldItalic.ttf"),
    "Gilroy-Heavy": require("../../assets/fonts/Gilroy-Heavy.ttf"),
    "Gilroy-HeavyItalic": require("../../assets/fonts/Gilroy-HeavyItalic.ttf"),
    "Gilroy-Light": require("../../assets/fonts/Gilroy-Light.ttf"),
    "Gilroy-LightItalic": require("../../assets/fonts/Gilroy-LightItalic.ttf"),
    "Gilroy-Medium": require("../../assets/fonts/Gilroy-Medium.ttf"),
    "Gilroy-MediumItalic": require("../../assets/fonts/Gilroy-MediumItalic.ttf"),
    "Gilroy-Regular": require("../../assets/fonts/Gilroy-Regular.ttf"),
    "Gilroy-RegularItalic": require("../../assets/fonts/Gilroy-RegularItalic.ttf"),
    "Gilroy-SemiBold": require("../../assets/fonts/Gilroy-SemiBold.ttf"),
    "Gilroy-SemiBoldItalic": require("../../assets/fonts/Gilroy-SemiBoldItalic.ttf"),
    "Gilroy-Thin": require("../../assets/fonts/Gilroy-Thin.ttf"),
    "Gilroy-ThinItalic": require("../../assets/fonts/Gilroy-ThinItalic.ttf"),
    "Gilroy-UltraLight": require("../../assets/fonts/Gilroy-UltraLight.ttf"),
    "Gilroy-UltraLightItalic": require("../../assets/fonts/Gilroy-UltraLightItalic.ttf"),
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
        <Stack.Screen name="(auth)" options={{ animation: "none" }} />
        <Stack.Screen name="(app)/index" />
      </Stack>
      <SitemapButton />
    </>
  );
}

function SitemapButton() {
  const router = useRouter();

  return (
    <View style={{ position: "absolute", bottom: 40, right: 20, zIndex: 9999 }}>
      <Pressable
        onPress={() => router.push("/_sitemap")}
        style={{
          backgroundColor: "#FF6B6B",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>
          📋
        </Text>
      </Pressable>
    </View>
  );
}
