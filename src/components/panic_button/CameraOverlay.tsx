import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface CameraOverlayProps {
  timer: number;
  showShutter: boolean;
  onCapture: () => void;
}

export const CameraOverlay = ({
  timer,
  showShutter,
  onCapture,
}: CameraOverlayProps) => {
  return (
    <>
      {/* Top Timer Overlay */}
      <View className="absolute top-24 self-center bg-white py-2 px-4 rounded-3xl z-10">
        <Text className="text-[#ff4b4b] font-bold w-full text-center">
          Waktu tersisa: {timer} detik
        </Text>
      </View>

      {/* Shutter Button */}
      {showShutter && (
        <View className="absolute bottom-12 w-full items-center">
          <TouchableOpacity
            className="w-20 h-20 rounded-full border-[5px] border-white justify-center items-center bg-white/20"
            onPress={onCapture}
          >
            <View className="w-[60px] h-[60px] rounded-full bg-white" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
