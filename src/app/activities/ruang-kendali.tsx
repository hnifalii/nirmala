import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "../../components/Typography";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { ACTIVITIES } from "../../constants/activities";
import { useRouter, Stack } from "expo-router";

const { height, width } = Dimensions.get("window");

type AnimationPhase = "idle" | "inhale" | "hold" | "exhale";

// Rainbow/Sunset SVG Component
const RainbowIllustration = ({
  phase,
  duration,
}: {
  phase: AnimationPhase;
  duration: number;
}) => {
  // We use a single animated value 'progress' to control the state
  // But for complex transitions (inhale vs exhale), independent control is better
  // Let's use scaleAnim directly
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stop any previous animations
    scaleAnim.stopAnimation();
    translateAnim.stopAnimation();

    if (phase === "inhale") {
      // Expand over 'duration'
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Expand significantly
          duration: duration,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(translateAnim, {
          toValue: -50, // Move up
          duration: duration,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start();
    } else if (phase === "hold") {
      // Hold steady at expanded state
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.18,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 2000,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start();
    } else if (phase === "exhale") {
      // Shrink back to normal over 'duration'
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: duration,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start();
    } else {
      // IDLE - Gentle breathing
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.05,
              duration: 2000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
          ]),
          Animated.sequence([
            Animated.timing(translateAnim, {
              toValue: -5,
              duration: 2000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
            Animated.timing(translateAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
              easing: Easing.inOut(Easing.sin),
            }),
          ]),
        ])
      ).start();
    }
  }, [phase, duration]);

  // Derived animations for layers
  const outerScale = scaleAnim;
  const middleScale = scaleAnim.interpolate({
    inputRange: [1, 1.4],
    outputRange: [1, 1.25], // Middle layer grows less
  });
  const innerScale = scaleAnim.interpolate({
    inputRange: [1, 1.4],
    outputRange: [1, 1.15], // Inner layer grows least
  });

  return (
    <View
      className="items-center justify-end"
      style={{ height: 300, width: width, overflow: "visible" }}
    >
      <View
        className="relative items-center"
        style={{ width: width, height: 300 }}
      >
        {/* Outer beige/cream circle */}
        <Animated.View
          className="absolute rounded-full"
          style={{
            width: width * 1.2,
            height: width * 1.2,
            bottom: -width * 0.6,
            backgroundColor: "#F5E6D3",
            transform: [{ scale: outerScale }, { translateY: translateAnim }],
          }}
        />
        {/* Middle yellow circle */}
        <Animated.View
          className="absolute rounded-full"
          style={{
            width: width * 0.9,
            height: width * 0.9,
            bottom: -width * 0.45,
            backgroundColor: "#F4D58D",
            transform: [
              { scale: middleScale },
              { translateY: translateAnim },
            ],
          }}
        />
        {/* Inner salmon/peach circle */}
        <Animated.View
          className="absolute rounded-full"
          style={{
            width: width * 0.6,
            height: width * 0.6,
            bottom: -width * 0.3,
            backgroundColor: "#F5A18D",
            transform: [{ scale: innerScale }, { translateY: translateAnim }],
          }}
        />
      </View>
    </View>
  );
};

export default function RuangKendaliActivity() {
  const router = useRouter();
  const activity = ACTIVITIES.find((a) => a.id === "ruang-kendali");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const onClose = () => {
    router.back();
  };

  const handleButtonClick = (action: string) => {
    if (action === "well") {
      const completeSectionIndex = activity?.sections.findIndex(
        (s) => s.type === "complete",
      );
      if (completeSectionIndex !== undefined && completeSectionIndex !== -1) {
        setCurrentSectionIndex(completeSectionIndex);
      }
    } else if (action === "unwell") {
      const retrySectionIndex = activity?.sections.findIndex(
        (s) => s.type === "retry",
      );
      if (retrySectionIndex !== undefined && retrySectionIndex !== -1) {
        setCurrentSectionIndex(retrySectionIndex);
      }
    } else if (action === "finish" || action === "home") {
      onClose();
    } else if (action === "retry") {
      setCurrentSectionIndex(0);
    }
  };

  const handleStart = () => {
    setCurrentSectionIndex(currentSectionIndex + 1);
  };

  useEffect(() => {
    if (!activity) return;

    const section = activity.sections[currentSectionIndex];
    if (
      section.type === "intro" || // Manual start for intro
      section.type === "end" ||
      section.type === "complete" ||
      section.type === "retry"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      if (currentSectionIndex < activity.sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
      }
    }, section.duration);

    return () => clearTimeout(timer);
  }, [currentSectionIndex, activity]);

  useEffect(() => {
    if (!activity) return;
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentSectionIndex, activity, fadeAnim]);

  if (!activity) return null;

  const section = activity.sections[currentSectionIndex];

  // Specific Layout for Start Screen
  if (section.type === "intro") {
    return (
      <View className="flex-1 bg-[#FFFDF7]">
        <Stack.Screen options={{ headerShown: false }} />
        <StatusBar style="light" />

        {/* Header Section */}
        <View className="h-[33%] rounded-b-3xl w-full relative overflow-hidden">
          <LinearGradient
            colors={[activity.color, activity.color]}
            className="absolute w-full h-full"
          />
          
          {/* Back Button */}
          <TouchableOpacity
            className="absolute top-12 left-6 z-20 w-10 h-10 rounded-full bg-white/20 items-center justify-center"
            onPress={onClose}
            activeOpacity={0.7}
          >
            <ArrowLeft width={24} height={24} />
          </TouchableOpacity>

          {/* Rainbow Illustration - Positioned to look like rising sun */}
          <View className="absolute bottom-[-50px] left-0 right-0 items-center overflow-visible z-10">
             <RainbowIllustration phase="idle" duration={2000} />
          </View>
        </View>

        {/* Content Section - White Card overlaying slightly */}
        <View className="flex-1 bg-[#FFFDF7] z-20 px-6 pt-10">
          <AppText weight="bold" className="text-3xl text-gray-800 mb-4">
             {section.title}
          </AppText>
          
          <AppText weight="regular" className="text-base text-gray-600 leading-6 mb-6">
             {activity.description}
          </AppText>
          
          {/* Duration Badge */}
          <View className="flex-row items-center mb-auto">
             <View className="mr-2">
                {/* Simple Clock Icon placeholder or use MaterialIcon */}
                <AppText className="text-gray-400 text-lg">🕒</AppText>
             </View>
             <AppText weight="medium" className="text-gray-500">
               {activity.duration}
             </AppText>
          </View>

          {/* Start Button */}
          <TouchableOpacity 
             className="w-full bg-[#728C69] py-4 rounded-full mb-10 shadow-sm active:bg-[#5E7A55]"
             onPress={handleStart}
          >
             <AppText weight="bold" className="text-white text-center text-lg">
               Mulai Aktivitas
             </AppText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Immersive Layout for Action Phases
  // Determine Animation Phase
  let phase: AnimationPhase = "idle";
  if (section.type === "action") {
    const sub = section.subtitle?.toLowerCase() || "";
    if (sub.includes("tarik")) phase = "inhale";
    else if (sub.includes("tahan")) phase = "hold";
    else if (sub.includes("buang")) phase = "exhale";
  }

  return (
    <View style={{ flex: 1, backgroundColor: activity.color }}>
      <Stack.Screen options={{ headerShown: false }} />
      <LinearGradient
        colors={[activity.color, activity.color]}
        className="flex-1 w-full h-full"
        style={{ flex: 1 }}
      >
        <StatusBar style="light" />

        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-12 left-6 z-10 w-10 h-10 rounded-full bg-white/20 items-center justify-center"
          onPress={onClose}
          activeOpacity={0.7}
        >
          <ArrowLeft width={24} height={24} />
        </TouchableOpacity>

        {/* Content Area with fade transition */}
        <Animated.View
          className="flex-1 justify-center items-center px-6 w-full"
          style={{ opacity: fadeAnim }}
        >

          {section.type === "start" && (
            <View className="items-center">
              <AppText weight="bold" className="text-4xl text-white mb-4">
                {section.subtitle}
              </AppText>
            </View>
          )}



          {section.type === "action" && (
            <View className="items-center">
              <AppText
                weight="bold"
                className="text-4xl text-white text-center mb-2"
              >
                {section.subtitle}
              </AppText>
              {section.helperText && (
                <AppText
                  weight="regular"
                  className="text-base text-white/80 text-center"
                >
                  {section.helperText}
                </AppText>
              )}
            </View>
          )}

          {section.type === "end" && (
            <View className="items-center w-full">
              <AppText
                weight="bold"
                className="text-2xl text-white mb-8 text-center"
              >
                {section.title}
              </AppText>
              {section.buttons && (
                <View className="gap-3">
                  {section.buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`${index < 1 ? "bg-cream" : "active:bg-cream"} py-3 px-6 rounded-full`}
                      onPress={() => handleButtonClick(button.action)}
                    >
                      <AppText
                        weight="medium"
                        className={`${index < 1 ? "text-gray-700" : "text-cream"} text-center`}
                      >
                        {button.label}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {section.type === "complete" && (
            <View className="items-center w-full">
              <AppText
                weight="bold"
                className="text-2xl text-white mb-8 text-center"
              >
                {section.title}
              </AppText>
              {section.buttons && (
                <View className="gap-3">
                  {section.buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`${index < 1 ? "bg-cream" : "active:bg-cream"} py-3 px-6 rounded-full`}
                      onPress={() => handleButtonClick(button.action)}
                    >
                      <AppText
                        weight="medium"
                        className={`${index < 1 ? "text-gray-700" : "text-cream"} text-center`}
                      >
                        {button.label}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {section.type === "retry" && (
            <View className="items-center w-full">
              <AppText
                weight="bold"
                className="text-2xl text-white mb-8 text-center"
              >
                {section.title}
              </AppText>
              {section.buttons && (
                <View className="gap-3">
                  {section.buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      className={`${index < 1 ? "bg-cream" : "active:bg-cream"} py-3 px-6 rounded-full`}
                      onPress={() => handleButtonClick(button.action)}
                    >
                      <AppText
                        weight="medium"
                        className={`${index < 1 ? "text-gray-700" : "text-cream"} text-center`}
                      >
                        {button.label}
                      </AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </Animated.View>

        {/* Rainbow Illustration at Bottom */}
        <View
          className="absolute bottom-0 left-0 right-0 w-full items-center"
          style={{ height: 300, overflow: "visible" }}
        >
          <RainbowIllustration
            phase={phase}
            duration={section.duration || 4000}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
