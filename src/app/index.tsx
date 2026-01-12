import { useEffect, useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { AppText } from "../components/Typography";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
  Extrapolation,
  Easing,
  runOnJS,
} from "react-native-reanimated";

import NirmalaIcon from "../../assets/icons/nirmala-icon.svg";

const { width } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

export default function AnimatedSplashScreen() {
  const router = useRouter();
  const animationProgress = useSharedValue(0);
  const hasNavigated = useRef(false);
  const [showText, setShowText] = useState(false);

  const goNext = () => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      router.replace("/welcome");
    }
  };

  useEffect(() => {
    // Reset for hot reload
    hasNavigated.current = false;
    animationProgress.value = 0;
    setShowText(false);

    const startAnimation = async () => {
      await SplashScreen.hideAsync();

      // FASE 1: Logo diam 2 detik, text hidden
      // Setelah 2 detik, show text dan mulai animasi
      setTimeout(() => {
        setShowText(true);
      }, 2000);

      // FASE 2: Logo mengecil + geser, text slide in
      animationProgress.value = withDelay(
        2000,
        withTiming(
          1,
          {
            duration: 1200,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          },
          (finished) => {
            if (finished) {
              runOnJS(goNext)();
            }
          }
        )
      );
    };

    startAnimation();
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationProgress.value,
      [0, 1],
      [3, 1],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      animationProgress.value,
      [0, 1],
      [0, 0],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX }, { scale }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animationProgress.value,
      [0, 1],
      [20, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: 1,
      transform: [{ translateX }],
    };
  });

  return (
    <View className="flex-1 bg-sage items-center justify-center">
      <StatusBar style="light" />

      <View className="flex-row items-center justify-center">
        <Animated.View style={logoAnimatedStyle}>
          <NirmalaIcon width={80} height={80} color="#FFFFFF" />
        </Animated.View>

        {/* Text only visible after 2 seconds */}
        {showText && (
          <View className="ml-4">
            <Animated.View style={textAnimatedStyle}>
              <AppText
                weight="bold"
                style={{
                  lineHeight: 52,
                  fontSize: 48,
                  color: "#FFFFFF",
                }}
              >
                nirmala
              </AppText>
            </Animated.View>
          </View>
        )}
      </View>
    </View>
  );
}
