import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { AppText } from "./Typography";
import AbstractIcon from "../../assets/icons/abstract.svg";

interface ProcessingModalProps {
  visible: boolean;
}

export const ProcessingModal = ({ visible }: ProcessingModalProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1.15,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0.7,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ]),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [visible]);

  if (!visible) return null;

  return (
        <View className="absolute inset-0 top-0 bottom-0 left-0 right-0 bg-black/60 z-50 items-center justify-center backdrop-blur-sm">
            <View className="bg-[#FFFDF7] p-8 rounded-[32px] items-center w-[280px]">
                {/* Loading Spinner / Icon */}
                <Animated.View style={{ transform: [{ scale }], opacity }}>
                    <AbstractIcon width={120} />
                </Animated.View>
                
                <AppText weight="bold" className="text-gray-800 mt-4 text-lg text-center">
                    Memproses...
                </AppText>
            </View>
        </View>
  );
};
