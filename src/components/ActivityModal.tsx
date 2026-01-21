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
const RainbowIllustration = () => (
  <View className="items-center justify-center" style={{ height: 160 }}>
    <View className="relative" style={{ width: 200, height: 160 }}>
      {/* Outer yellow circle */}
      <View
        className="absolute bg-yellow-200 rounded-full"
        style={{
          width: 200,
          height: 200,
          bottom: 0,
          left: 0,
        }}
      />
      {/* Middle yellow circle */}
      <View
        className="absolute bg-yellow-300 rounded-full"
        style={{
          width: 150,
          height: 150,
          bottom: 0,
          left: 25,
        }}
      />
      {/* Inner orange/salmon circle */}
      <View
        className="absolute bg-orange-300 rounded-full"
        style={{
          width: 100,
          height: 100,
          bottom: 0,
          left: 50,
        }}
      />
    </View>
  </View>
);

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
                  <View className="w-full gap-3">
                    {section.buttons.map((button, index) => (
                      <TouchableOpacity
                        key={index}
                        className="bg-white/20 py-3 px-6 rounded-full border border-white/40"
                        onPress={() => handleButtonClick(button.action)}
                      >
                        <AppText
                          weight="semibold"
                          className="text-white text-center"
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
                  <View className="w-full gap-3">
                    {section.buttons.map((button, index) => (
                      <TouchableOpacity
                        key={index}
                        className="bg-white py-3 px-6 rounded-full"
                        onPress={() => handleButtonClick(button.action)}
                      >
                        <AppText
                          weight="semibold"
                          className="text-blue-500 text-center"
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
                  <View className="w-full gap-3">
                    {section.buttons.map((button, index) => (
                      <TouchableOpacity
                        key={index}
                        className="bg-white py-3 px-6 rounded-full"
                        onPress={() => handleButtonClick(button.action)}
                      >
                        <AppText
                          weight="semibold"
                          className="text-blue-500 text-center"
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
            style={{ height: 200 }}
          >
            <RainbowIllustration />
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};
