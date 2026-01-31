import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SuccessStars from "../../../assets/icons/success-stars.svg";

interface SuccessViewProps {
  targetName: string;
  photoUri: string | null;
  onProceed: () => void;
}

export const SuccessView = ({
  targetName,
  photoUri,
  onProceed,
}: SuccessViewProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onProceed();
    }, 2000); // Auto-advance after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#C9FFB7", "#FFFCF4"]}
      locations={[0.12, 0.7]}
      style={{
        width: "80%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        height: "60%",
      }}
    >
      <SuccessStars width={133} height={96} />
      <Text className="text-2xl font-bold text-[#333] mt-4 text-center">
        Yes, ketemu!
      </Text>
      <Text className="text-sm text-[#A1A1A1] mt-2 mb-6 text-center font-medium">
        Ini {targetName} yang kamu cari
      </Text>
    </LinearGradient>
  );
};
