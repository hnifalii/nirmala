import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface PanicPopupWrapperProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string; // Allow additional styling
}

export const PanicPopupWrapper = ({
  children,
  onClose,
  className = "",
}: PanicPopupWrapperProps) => {
  return (
    <View className="flex-1 h-screen justify-center items-center bg-black/60 absolute inset-0 z-50">
      {/* Pop-up Card */}
      <View
        className={`rounded-[40px] overflow-hidden shadow-2xl relative bg-white ${className}`}
        style={{ width: width * 1, height: height * 1 }}
      >
        {/* Close Button */}
        {onClose && (
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-black/10 rounded-full"
          >
            <MaterialCommunityIcons name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        )}

        {/* Content */}
        {children}
      </View>
    </View>
  );
};
