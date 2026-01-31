import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "./Typography";
import ArrowLeft from "../../assets/icons/arrow-left.svg";
import { Activity } from "../types/activities";

const { height, width } = Dimensions.get("window");

// Rainbow/Sunset SVG Component
const RainbowIllustration = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Synchronized pulse animation for all circles
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(translateY, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [pulseAnim, translateY]);

  // Create different scale values with varying strengths
  const outerScale = pulseAnim.interpolate({
    inputRange: [1, 1.08],
    outputRange: [1, 1.08], // Most movement - outer is most powerful
  });

  const middleScale = pulseAnim.interpolate({
    inputRange: [1, 1.08],
    outputRange: [1, 1.04], // Medium movement
  });

  const innerScale = pulseAnim.interpolate({
    inputRange: [1, 1.08],
    outputRange: [1, 1.03], // Least movement
  });

  // Create different translateY values with varying strengths
  const outerTranslateY = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20], // Most movement - outer is most powerful
  });

  const middleTranslateY = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -12], // Medium movement
  });

  const innerTranslateY = translateY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8], // Least movement
  });

  return (
    <View
      className="items-center justify-end"
      style={{ height: 300, width: width, overflow: "hidden" }}
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
            bottom: -width * 0.6, // Half hidden below screen
            backgroundColor: "#F5E6D3",
            transform: [{ scale: outerScale }, { translateY: outerTranslateY }],
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
              { translateY: middleTranslateY },
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
            transform: [{ scale: innerScale }, { translateY: innerTranslateY }],
          }}
        />
      </View>
    </View>
  );
};

// Activity Modal Component
export const ActivityModal = ({
  visible,
  activity,
  onClose,
}: {
  visible: boolean;
  activity: Activity | null;
  onClose: () => void;
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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

  useEffect(() => {
    if (!visible || !activity) {
      setCurrentSectionIndex(0);
      return;
    }

    const section = activity.sections[currentSectionIndex];
    if (
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
  }, [visible, currentSectionIndex, activity]);

  useEffect(() => {
    if (!visible || !activity) return;
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible, currentSectionIndex, activity, fadeAnim]);

  if (!visible || !activity) return null;

  const section = activity.sections[currentSectionIndex];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: activity.color }}>
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
            {section.type === "intro" && (
              <View className="items-center">
                <AppText
                  weight="bold"
                  className="text-3xl text-white mb-6 text-center"
                >
                  {section.title}
                </AppText>
                <AppText
                  weight="regular"
                  className="text-base text-white/90 text-center leading-6"
                >
                  {section.description}
                </AppText>
              </View>
            )}

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
            style={{ height: 300, overflow: "hidden" }}
          >
            <RainbowIllustration />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};
