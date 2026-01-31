import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { PanicPopupWrapper } from "./PanicPopupWrapper";
import { LinearGradient } from "expo-linear-gradient";

interface ChallengeViewProps {
  targetName: string;
  imageUrl: string;
  timer: number;
  onStart: () => void;
  onClose?: () => void;
}

export const ChallengeView = ({
  targetName,
  imageUrl,
  timer,
  onStart,
  onClose,
}: ChallengeViewProps) => {
  // Auto-start camera after 2 seconds
  useEffect(() => {
    const timerId = setTimeout(() => {
      onStart();
    }, 2000);
    return () => clearTimeout(timerId);
  }, [onStart]);

  return (
    <PanicPopupWrapper onClose={onClose}>
      <LinearGradient
        colors={["#FFFFFF", "#FFFFFF"]}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Image
          source={{
            uri: imageUrl,
          }}
          className="w-[120px] h-[120px] mb-6"
        />
        <Text className="text-sm text-[#363B43] mb-2 font-medium">
          Cari dan Pindai
        </Text>
        <Text className="text-4xl font-bold text-[#448AFF] mb-8 text-center">
          {targetName}
        </Text>
        <Text className="text-lg text-gray-400 font-bold mb-8 w-full text-center">
          Waktu tersisa: <Text className="text-[#728C69]">{timer} detik</Text>
        </Text>
      </LinearGradient>
    </PanicPopupWrapper>
  );
};
