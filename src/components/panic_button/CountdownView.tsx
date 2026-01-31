import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PanicPopupWrapper } from "./PanicPopupWrapper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PanicIcon from "../../../assets/icons/panic-icon.svg";
import PanicStartYellow from "../../../assets/icons/panic-start-yellow.svg";
import Panic2Stars from "../../../assets/icons/panic-2stars.svg";
import Panic2StarsWhite from "../../../assets/icons/panic-2stars-white.svg";
import PanicHalfO from "../../../assets/icons/panic-half-o.svg";

interface CountdownViewProps {
  count: number;
  onClose: () => void;
}

export const CountdownView = ({ count, onClose }: CountdownViewProps) => {
  return (
    <PanicPopupWrapper onClose={onClose}>
      <LinearGradient
        colors={["#FBA359", "#FFFCF4"]}
        locations={[0.12, 0.7]}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {/* --- DECORATION PLACEHOLDERS (Replace Icon with your SVG) --- */}

        {/* Top Left: Ring/Circle */}
        <View className="absolute top-12 left-6 opacity-60">
          {/* PLACEHOLDER ICON */}
          <View className="w-8 h-8 rounded-full border-[3px] border-white/50" />
        </View>

        {/* Top Mid-Left: Yellow Sparkle */}
        <View className="absolute top-8 left-24 opacity-80">
          {/* PLACEHOLDER ICON */}
          <PanicStartYellow />
        </View>

        {/* Top Mid-Right: White Sparkle */}
        <View className="absolute top-10 right-28 opacity-90">
          {/* PLACEHOLDER ICON */}
          <Panic2Stars />
        </View>

        {/* Top Right: Square/Diamond */}
        <View className="absolute top-8 right-8 opacity-60">
          {/* PLACEHOLDER ICON */}
          <View className="w-8 h-8 bg-white/40 rounded-lg transform rotate-45" />
        </View>

        {/* Mid Right: Small Sparkle */}
        <View className="absolute top-60 right-12 opacity-80">
          {/* PLACEHOLDER ICON */}
          <MaterialCommunityIcons
            name="star-four-points"
            size={16}
            color="white"
          />
        </View>

        {/* Mid Left: Small Sparkle */}
        <View className="absolute top-60 left-12 opacity-80">
          {/* PLACEHOLDER ICON */}
          <Panic2StarsWhite />
        </View>

        {/* Center Bottom: Small Sparkle */}
        <View className="absolute top-80 w-full items-center opacity-80">
          {/* PLACEHOLDER ICON */}
          <PanicHalfO />
        </View>

        {/* Center Main Icon */}
        <View className="flex items-center justify-center mb-10">
          <PanicIcon width={200} height={200} />
        </View>

        <Text className="text-4xl font-bold text-[#53634D] mt-10 text-center">
          Jeda sejenak
        </Text>
        <Text className="text-lg text-[#A1A1A1] font-bold text-center mb-12 px-6">
          Alihkan dorongan dengan misi singkat
        </Text>

        <View className="w-[140px] h-[140px] rounded-full border-[6px] border-[#CDE8C4] justify-center items-center bg-transparent mb-12 shadow-md">
          <Text className="text-7xl font-bold text-[#728C69]">{count}</Text>
        </View>

        <Text className="text-base text-[#97AE8F] font-semibold opacity-90 tracking-widest uppercase">
          Siapkan kameramu..
        </Text>
      </LinearGradient>
    </PanicPopupWrapper>
  );
};
