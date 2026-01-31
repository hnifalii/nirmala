import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
  return (
    <LinearGradient
      colors={["#d4fc79", "#96e6a1"]}
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
      }}
    >
      <Ionicons name="sparkles" size={48} color="white" />
      <Text className="text-2xl font-bold text-[#333] mt-4 text-center">
        Yes, ketemu!
      </Text>
      <Text className="text-sm text-[#555] mt-2 mb-6 text-center font-medium">
        Ini {targetName} yang kamu cari
      </Text>

      <TouchableOpacity
        className="bg-white py-3 px-10 rounded-full shadow-sm"
        onPress={onProceed}
      >
        <Text className="text-[#88d893] font-bold text-base">Lanjut</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
