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
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const { width } = Dimensions.get("window");

SplashScreen.preventAutoHideAsync();

export default function AnimatedSplashScreen() {
  const router = useRouter();
  const animationProgress = useSharedValue(0);
  const hasNavigated = useRef(false);
  const [showText, setShowText] = useState(false);

  // Check auth state immediately (don't wait for animation)
  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        return new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
              if (currentUser) {
                console.log("User logged in:", currentUser.uid);
                
                try {
                  const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

                  if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User data exists, isOnboardingCompleted:", userData?.isOnboardingCompleted);

                    // Navigate based on onboarding status
                    if (userData?.isOnboardingCompleted) {
                      router.replace("/(app)");
                    } else {
                      router.replace("/questionnaire");
                    }
                  } else {
                    console.log("User document doesn't exist, going to welcome");
                    router.replace("/welcome");
                  }
                } catch (firestoreErr) {
                  console.error('Firestore error:', firestoreErr);
                  // If permission denied or other Firestore error, still navigate based on auth
                  // Assume incomplete onboarding for safety
                  router.replace("/questionnaire");
                }
              } else {
                console.log("No user logged in, going to welcome");
                router.replace("/welcome");
              }
            } catch (err) {
              console.error('Auth state change error:', err);
              router.replace('/welcome');
            } finally {
              unsubscribe();
              resolve();
            }
          });
        });
      } catch (err) {
        console.error('Auth check error:', err);
        router.replace('/welcome');
      }
    };

    checkAuthAndNavigate();
  }, [router]);

  const goNext = () => {
    // Animation callback - auth check already happened
    // This is just for UX, navigation already triggered by useEffect
  };

  useEffect(() => {
    const startAnimation = async () => {
      await SplashScreen.hideAsync();

      // FASE 1: Logo diam 2 detik, text hidden
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
