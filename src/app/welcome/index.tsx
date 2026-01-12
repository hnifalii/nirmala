import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import NirmalaIconDark from "../../../assets/icons/nirmala-icon-dark.svg";
import WelcomeIcon from "../../../assets/icons/welcome-icon.svg";
import CloudIcon from "../../../assets/icons/noto-v1_cloud.svg";
import XIcon from "../../../assets/icons/x.svg";
import ParuIcon from "../../../assets/icons/paru.svg";
import WhiteStar from "../../../assets/icons/whitestar.svg";
import GreenStar from "../../../assets/icons/green-star.svg";

const { height, width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleCreateAccount = () => {
    if (agreedToTerms) {
      router.push("/(auth)/register");
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <LinearGradient
        colors={["#728C69", "#728C69", "#FFE884"]}
        locations={[0, 0.2, 1]}
        className="flex-1"
      >
        {/* Top Illustration Area with decorative elements */}
        <View
          className="items-center justify-center relative"
          style={{ height: height * 0.45 }}
        >
          {/* Stars - scattered around */}
          <View className="absolute" style={{ top: 40, left: 20 }}>
            <GreenStar width={14} height={14} />
          </View>
          <View className="absolute" style={{ top: 40, right: 80 }}>
            <GreenStar width={14} height={14} />
          </View>
          <View className="absolute" style={{ top: 70, left: width / 2 - 20 }}>
            <WhiteStar width={40} height={40} />
          </View>

          {/* Cloud - left side */}
          <View className="absolute" style={{ left: -20, top: height * 0.18 }}>
            <CloudIcon width={125} height={125} />
          </View>

          {/* Paru/Lungs - top right with bubble */}
          <View
            className="absolute items-center justify-center"
            style={{
              right: 20,
              top: 60,
              borderRadius: 30,
              padding: 8,
            }}
          >
            <ParuIcon width={75} height={67} />
          </View>

          {/* X icon - bottom right with bubble */}
          <View
            className="absolute items-center justify-center"
            style={{
              right: 40,
              bottom: 40,
              borderRadius: 25,
              padding: 10,
            }}
          >
            <XIcon width={95} height={77} />
          </View>

          {/* Main Illustration */}
          <View className="items-center justify-center">
            <WelcomeIcon width={350} height={350} />
          </View>
        </View>

        {/* Bottom Section with Curved White Background */}
        <View className="flex-1 relative">
          {/* Curved White Background - Ellipse Effect */}
          <View
            className="absolute bg-white"
            style={{
              width: width * 2,
              height: height,
              left: -width / 2,
              top: 0,
              borderTopLeftRadius: width,
              borderTopRightRadius: width,
            }}
          />

          {/* Content on top of curved background */}
          <View className="flex-1 z-10 pt-6">
            {/* Small Icon at top of card */}
            <View className="items-center mb-4">
              <NirmalaIconDark width={34} height={34} color="#6B8E6B" />
            </View>

            {/* Welcome Text */}
            <View className="items-center mb-8 px-6">
              <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
                Selamat datang di Nirmala
              </Text>
              <Text className="text-gray-400 text-base">
                Mulai dari satu napas
              </Text>
            </View>

            {/* Content Container */}
            <View className="flex-1 px-6 pb-8 justify-end">
              {/* Terms Checkbox */}
              <Pressable
                className="flex-row items-start mb-6"
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <View
                  className={`w-5 h-5 border-2 rounded mr-3 mt-0.5 items-center justify-center ${
                    agreedToTerms ? "bg-sage border-sage" : "border-gray-300"
                  }`}
                >
                  {agreedToTerms && (
                    <Text className="text-white text-xs">✓</Text>
                  )}
                </View>
                <Text className="flex-1 text-gray-500 text-sm leading-5">
                  Saya menyetujui{" "}
                  <Text className="text-sage font-medium">
                    Syarat dan Ketentuan
                  </Text>{" "}
                  Nirmala dan memahami{" "}
                  <Text className="text-sage font-medium">
                    Kebijakan Privasi
                  </Text>
                  .
                </Text>
              </Pressable>

              {/* Buat Akun Button */}
              <TouchableOpacity
                className={`py-4 rounded-full mb-3 ${
                  agreedToTerms ? "bg-sage" : "bg-sage/50"
                }`}
                onPress={handleCreateAccount}
                disabled={!agreedToTerms}
              >
                <Text className="text-white text-center font-semibold text-base">
                  Buat akun
                </Text>
              </TouchableOpacity>

              {/* Masuk Button */}
              <TouchableOpacity
                className="py-4 rounded-full bg-[#FAF3E1]"
                onPress={handleLogin}
              >
                <Text className="text-gray-700 text-center font-semibold text-base">
                  Masuk
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
