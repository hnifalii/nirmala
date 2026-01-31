import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface TimeoutViewProps {
  onRetry: () => void;
}

export const TimeoutView = ({ onRetry }: TimeoutViewProps) => {
  return (
    <View className="flex-1 w-full items-center justify-center bg-gray-800 p-8">
      <Ionicons name="hourglass-outline" size={80} color="#fff" />
      <Text className="text-2xl font-bold text-white mt-5 text-center">
        Waktunya selesai
      </Text>
      <Text className="text-sm text-[#eee] mt-2.5 mb-5 text-center opacity-90">
        Tidak apa-apa kalau belum berhasil.
      </Text>

      <TouchableOpacity
        className="bg-white py-3 px-10 rounded-full mt-5"
        onPress={onRetry}
      >
        <Text className="text-gray-900 font-bold">Coba misi lain</Text>
      </TouchableOpacity>
    </View>
  );
};
