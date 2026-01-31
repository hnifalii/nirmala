import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Pressable, View, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Apercu-Regular": require("../../assets/fonts/apercu_regular_pro.otf"),
    "Apercu-RegularItalic": require("../../assets/fonts/apercu_regular_italic_pro.otf"),
    "Apercu-Medium": require("../../assets/fonts/apercu_medium_pro.otf"),
    "Apercu-MediumItalic": require("../../assets/fonts/apercu_medium_italic_pro.otf"),
    "Apercu-Bold": require("../../assets/fonts/apercu_bold_pro.otf"),
    "Apercu-BoldItalic": require("../../assets/fonts/apercu_bold_italic_pro.otf"),
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
        <Stack.Screen name="questionnaire/after-questionnaire" />
        <Stack.Screen name="activities/index" />
        <Stack.Screen name="(auth)" options={{ animation: "none" }} />
        <Stack.Screen name="(app)/index" />
        <Stack.Screen name="chatbot" />
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
