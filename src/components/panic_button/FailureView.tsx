import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import FailureIcon from "../../../assets/icons/failure-icon.svg";

interface FailureViewProps {
  targetName: string;
  onRetry: () => void;
}

export const FailureView = ({ targetName, onRetry }: FailureViewProps) => {
  return (
    <View
      style={{
        width: "80%",
        height: "60%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
    >
      {/* 3D Border / Background Layer */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#EDA57D",
          borderRadius: 20,
        }}
      />

      {/* Main Gradient Face - Lifted up effectively by marginBottom */}
      <LinearGradient
        colors={["#FFCCB5", "#FFFCF4"]}
        style={{
          flex: 1,
          marginBottom: 15, // Reveals the bottom 15px of the background layer
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <FailureIcon width={126} height={114} />
        <Text className="text-2xl font-bold text-[#333] mt-4 text-center">
          Hmm, belum ketemu
        </Text>
        <Text className="text-sm text-[#A1A1A1] mt-2 mb-6 text-center font-medium">
          Pastikan {targetName.toLowerCase()} terlihat jelas
        </Text>

        <TouchableOpacity
          className="bg-[#333] py-3 px-10 rounded-full shadow-sm"
          onPress={onRetry}
        >
          <Text className="text-white font-bold text-base">Coba lagi</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
