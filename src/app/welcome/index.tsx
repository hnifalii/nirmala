import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { AppText } from "../../components/Typography";

const { height, width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleCreateAccount = () => {
    if (agreedToTerms) {
      router.push("/(auth)/signup");
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <StatusBar style="light" />

      <TouchableOpacity
        className="absolute top-10 right-6 z-20"
        onPress={() => {
          router.push("/home");
        }}
      >
        <AppText className="text-white text-base">Lewati</AppText>
      </TouchableOpacity>
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
          <View className="flex-1 z-10 pt-10">
            {/* Small Icon at top of card */}
            <View className="items-center mb-6">
              <NirmalaIconDark width={34} height={34} color="#6B8E6B" />
            </View>

            {/* Welcome Text */}
            <View className="items-center mb-8 px-6">
              <AppText
                weight="bold"
                className="text-3xl text-gray-800 mb-1 text-center"
              >
                Selamat datang di Nirmala
              </AppText>
              <AppText weight="medium" className="text-gray-400 text-lg">
                Mulai dari satu napas
              </AppText>
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
                    <AppText variant="body" className="text-white text-xs">
                      ✓
                    </AppText>
                  )}
                </View>
                <AppText
                  variant="body"
                  weight="medium"
                  className="flex-1 text-gray-500 leading-5"
                >
                  Saya menyetujui{" "}
                  <AppText
                    variant="body"
                    weight="semibold"
                    className="text-sage"
                  >
                    Syarat dan Ketentuan
                  </AppText>{" "}
                  Nirmala dan memahami{" "}
                  <AppText
                    variant="body"
                    weight="semibold"
                    className="text-sage"
                  >
                    Kebijakan Privasi
                  </AppText>
                  .
                </AppText>
              </Pressable>

              {/* Buat Akun Button */}
              <TouchableOpacity
                className={`py-4 rounded-full mb-3 ${
                  agreedToTerms ? "bg-sage" : "bg-sage/50"
                }`}
                onPress={handleCreateAccount}
                disabled={!agreedToTerms}
              >
                <AppText
                  weight="semibold"
                  className="text-white text-center text-lg"
                >
                  Buat akun
                </AppText>
              </TouchableOpacity>

              {/* Masuk Button */}
              <TouchableOpacity
                className="py-4 rounded-full bg-[#FAF3E1]"
                onPress={handleLogin}
              >
                <AppText
                  weight="semibold"
                  className="text-gray-700 text-center text-lg"
                >
                  Masuk
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
