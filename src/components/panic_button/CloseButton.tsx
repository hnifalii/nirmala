import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CloseButtonProps {
  onPress: () => void;
}

export const CloseButton = ({ onPress }: CloseButtonProps) => {
  return (
    <TouchableOpacity
      className="absolute top-12 right-5 z-50"
      onPress={onPress}
    >
      <Ionicons name="close-circle" size={40} color="rgba(255,255,255,0.8)" />
    </TouchableOpacity>
  );
};
