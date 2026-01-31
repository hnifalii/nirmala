import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { PanicPopupWrapper } from "./PanicPopupWrapper";

interface PostInterventionViewProps {
  step: 1 | 2 | 3;
  onNext: () => void;
  onFinish: () => void;
  onClose?: () => void;
}

export const PostInterventionView = ({
  step,
  onNext,
  onFinish,
  onClose,
}: PostInterventionViewProps) => {
  return (
    <PanicPopupWrapper onClose={onClose}>
      {/* 1. Fokusmu Kembali */}
      {step === 1 && (
        <TouchableOpacity className="flex-1 w-full" onPress={onNext}>
          <LinearGradient
            colors={["#89f7fe", "#66a6ff"]}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Ionicons
              name="cloud"
              size={100}
              color="white"
              style={{ opacity: 0.8 }}
            />
            <Text className="text-3xl font-bold text-[#305c79] text-center mb-2.5">
              Fokusmu kembali
            </Text>
            <Text className="text-base text-[#507c99] text-center leading-6 px-5">
              Dorongan merokok biasanya melemah setelah{" "}
              <Text className="font-bold text-[#005bea]">30-60 detik.</Text>
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* 2. Feedback */}
      {step === 2 && (
        <LinearGradient
          colors={["#89f7fe", "#66a6ff"]}
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Text className="text-3xl font-bold text-[#305c79] text-center mb-2.5">
            Bagaimana rasanya sekarang?
          </Text>
          <View className="gap-5 mt-10 w-4/5">
            <TouchableOpacity
              className="bg-[#6b9068] py-4 rounded-full items-center w-full"
              onPress={onNext}
            >
              <Text className="text-white font-bold text-base">Sudah reda</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNext}>
              <Text className="text-[#305c79] text-center font-bold">
                Masih ada sedikit
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}

      {/* 3. Success / Exit */}
      {step === 3 && (
        <LinearGradient
          colors={["#89f7fe", "#66a6ff"]}
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <Ionicons name="checkmark-circle" size={100} color="white" />
          <Text className="text-3xl font-bold text-[#305c79] text-center mb-2.5">
            Bagus! Kamu melewati satu momen sulit
          </Text>
          <Text className="text-base text-[#507c99] text-center leading-6 px-5">
            Tadi kamu berhasil menahannya.
          </Text>

          <View className="gap-5 mt-10 w-4/5">
            <TouchableOpacity
              className="bg-[#6b9068] py-4 rounded-full items-center w-full"
              onPress={onFinish}
            >
              <Text className="text-white font-bold text-base">Selesai</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </PanicPopupWrapper>
  );
};
