import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { PanicPopupWrapper } from "./PanicPopupWrapper";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// Import decorations from CountdownView
import PanicStartYellow from "../../../assets/icons/panic-start-yellow.svg";
import Panic2Stars from "../../../assets/icons/panic-2stars.svg";
import Panic2StarsWhite from "../../../assets/icons/panic-2stars-white.svg";
import PanicHalfO from "../../../assets/icons/panic-half-o.svg";
import PanicIcon from "../../../assets/icons/panic-icon.svg";
import SolarCloudBold from "../../../assets/icons/solar_cloud-bold.svg";
import MaterialSymbolsCloud from "../../../assets/icons/material-symbols_cloud.svg";
import GridiconsCloud from "../../../assets/icons/gridicons_cloud.svg";

export interface PostInterventionViewProps {
  step: 1 | 2 | 3 | 4;
  onNext: () => void;
  onFinish: () => void;
  onRestart: () => void;
  onBreath: () => void;
  onClose?: () => void;
}

export const PostInterventionView = ({
  step,
  onNext,
  onFinish,
  onRestart,
  onBreath,
  onClose,
}: PostInterventionViewProps) => {
  const [showOptions, setShowOptions] = useState(false);

  // Auto-advance Step 1
  useEffect(() => {
    if (step === 1) {
      const timer = setTimeout(() => {
        onNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Auto-advance Step 3
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        onNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const [step4Phase, setStep4Phase] = useState<"initial" | "final">("initial");

  // Auto-advance Step 4 (Success / Finish) with sub-steps
  useEffect(() => {
    if (step === 4) {
      // Reset to initial if step 4 is re-entered (though unlikely with current flow)
      setStep4Phase("initial");

      // First timer: Switch to final text after 2 seconds
      const timer1 = setTimeout(() => {
        setStep4Phase("final");
      }, 2000);

      // Second timer: Finish flow after 4 seconds (2s initial + 2s final)
      const timer2 = setTimeout(() => {
        onFinish();
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [step]);

  // Reset local state if step changes back to 1
  useEffect(() => {
    if (step === 1) {
      setShowOptions(false);
      setStep4Phase("initial");
    }
  }, [step]);

  if (step === 4) {
    return (
      <BlurView
        intensity={40}
        tint="dark"
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          },
        ]}
      >
        <View className="w-full justify-center items-center px-4">
          {step4Phase === "initial" ? (
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
            >
              <Text className="text-3xl font-bold text-[#FFFCF4] text-center mb-4">
                Dorongan berhasil{" "}
                <Text className="text-[#BCE4FE]">dilewati</Text>
              </Text>
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.duration(500)}
              exiting={FadeOut.duration(500)}
            >
              <Text className="text-3xl text-[#FFFCF4] text-center px-4 font-bold">
                Ambil napas sebentar, lalu lanjutkan{" "}
                <Text className="text-[#FFE05B]">harimu.</Text>
              </Text>
            </Animated.View>
          )}
        </View>
      </BlurView>
    );
  }

  return (
    <PanicPopupWrapper onClose={onClose}>
      <LinearGradient
        colors={["#A1C4FD", "#FFFFFF"]}
        locations={[0.12, 0.7]}
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        {/* --- DECORATIONS (Same as CountdownView) --- */}
        <View className="absolute top-20 left-6">
          <MaterialSymbolsCloud width={45} height={45} />
        </View>
        <View className="absolute top-8 left-24">
          <PanicStartYellow />
        </View>
        <View className="absolute top-10 right-28">
          <Panic2Stars />
        </View>
        <View className="absolute top-8 right-8">
          <SolarCloudBold width={45} height={45} />
        </View>
        <View className="absolute top-60 left-12">
          <Panic2StarsWhite />
        </View>
        <View className="absolute top-20 justify-center items-center mb-10">
          <PanicIcon width={200} height={200} />
        </View>
        <View className="absolute top-64 right-24">
          <GridiconsCloud width={45} height={45} />
        </View>

        {/* --- CONTENT BY STEP --- */}

        {/* OPTIONS VIEW (Triggered from Step 2) */}
        {showOptions ? (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            className="w-full justify-center items-center flex-1"
          >
            <Text className="text-3xl font-bold text-[#53634D] text-center mb-2">
              Kita lanjut pelan pelan
            </Text>
            <Text className="text-sm text-[#8E9E88] text-center mb-10 px-4 font-medium">
              Kamu bisa pilih cara lain untuk bantu menenangkan diri.
            </Text>

            <View className="gap-4 w-full">
              <TouchableOpacity
                className="bg-[#728C69] py-4 rounded-full items-center shadow-md w-full"
                onPress={onRestart}
              >
                <Text className="text-white font-bold text-lg">
                  Coba misi lanjutan
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="py-4 rounded-full items-center w-full"
                onPress={onBreath}
              >
                <Text className="text-[#728C69] font-bold text-lg">
                  Tarik napas sejenak
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : (
          <>
            {/* Step 1: Fokusmu Kembali */}
            {step === 1 && (
              <Animated.View
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(500)}
                className="flex-1 w-full justify-center items-center"
              >
                <Text className="text-4xl font-bold text-[#53634D] text-center mb-4">
                  Fokusmu kembali
                </Text>
                <Text className="text-lg text-[#8E9E88] text-center px-4 font-semibold">
                  Dorongan merokok biasanya melemah setelah{" "}
                  <Text className="text-[#448AFF] font-bold">30-60 detik.</Text>
                </Text>

                {/* Removed "Ketuk untuk lanjut" as it's auto-advance now */}
              </Animated.View>
            )}

            {/* Step 2: Feedback */}
            {step === 2 && (
              <Animated.View
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(500)}
                className="w-full justify-center items-center flex-1"
              >
                <Text className="text-3xl font-bold text-[#53634D] text-center mb-10">
                  Bagaimana rasanya sekarang?
                </Text>

                <View className="gap-4 w-full">
                  <TouchableOpacity
                    className="bg-[#728C69] py-4 rounded-full items-center shadow-md"
                    onPress={onNext}
                  >
                    <Text className="text-white font-bold text-lg">
                      Sudah reda
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="py-4 rounded-full items-center w-full"
                    onPress={() => setShowOptions(true)}
                  >
                    <Text className="text-[#728C69] font-bold text-lg">
                      Masih ada sedikit
                    </Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            )}

            {/* Step 3: Positive Reinforcement (Moved from previous implementation logic?) */}
            {step === 3 && (
              <Animated.View
                entering={FadeIn.duration(500)}
                exiting={FadeOut.duration(500)}
                className="flex-1 w-full justify-center items-center"
              >
                <Text className="text-3xl font-bold text-[#53634D] text-center mb-4">
                  Bagus! Kamu melewati satu momen sulit
                </Text>
                <Text className="text-lg text-[#8E9E88] text-center px-4 font-semibold">
                  Tadi kamu berhasil menahannya
                </Text>
              </Animated.View>
            )}
          </>
        )}
      </LinearGradient>
    </PanicPopupWrapper>
  );
};
