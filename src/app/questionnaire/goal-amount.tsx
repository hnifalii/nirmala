import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AppText, AppTextInput } from "../../components/Typography";
import PiggyIcon from "../../../assets/icons/piggy-bank.svg";
import CloudIcon from "../../../assets/icons/cloud-shadow.svg";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const { height, width } = Dimensions.get("window");

export default function GoalAmountScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleFinish = async () => {
    if (!amount.trim()) return;
    console.log("Goal amount:", amount);

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "users", user.uid), {
        savingsGoal: {
          target: parseInt(amount),
        },
        isOnboardingCompleted: true,
      });

      router.replace("/(app)");
    } catch (err) {
      console.error("error save goal amount " + err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, "");

    // Format with thousand separators
    if (numericValue) {
      const formatted = parseInt(numericValue).toLocaleString("id-ID");
      return `Rp ${formatted}`;
    }
    return "";
  };

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <LinearGradient colors={["#728C69", "#728C69"]} className="flex-1">
        {/* Top Section */}
        <View className="flex-1 px-6 pt-8 justify-start">
          {/* Info Banner */}
          <View className="flex-row items-center p-4 mb-6">
            <View className="mr-3 w-6 h-6 items-center justify-center rounded-full bg-blue-400 border border-white">
              <AppText weight="semibold" className="text-white">
                !
              </AppText>
            </View>
            <AppText weight="semibold" className="text-white text-sm flex-1">
              Kami mencatat uang dari rokok yang tidak kamu beli sebagai
              tabungan.
            </AppText>
          </View>

          {/* Question Text */}
          <AppText
            weight="bold"
            className="text-white text-2xl text-center leading-8 mb-12 mt-8"
          >
            Berapa jumlah harga dari target yang ingin kamu capai?
          </AppText>

          {/* Amount Input */}
          <View className="items-center mb-8">
            <AppTextInput
              weight="medium"
              className="w-full text-lg px-4 py-5 rounded-lg bg-[#97AE8F] text-cream"
              placeholder="Rp500.000"
              placeholderTextColor="#ddd"
              value={amount ? formatCurrency(amount) : ""}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
            />
          </View>

          {/* Finish Button */}
          <View className="items-center mt-8">
            <TouchableOpacity
              disabled={!amount.trim() || loading}
              className={`py-4 px-12 bg-sky rounded-full ${
                amount.trim() ? "" : "opacity-50"
              }`}
              onPress={handleFinish}
              activeOpacity={0.7}
            >
              <AppText
                weight="bold"
                className="text-base text-gray-700 text-center"
              >
                Selesai
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Decorative Illustration - Piggy Bank */}
      {!keyboardVisible && (
        <View
          className="absolute bottom-0 left-0 right-0 items-center"
          pointerEvents="none"
        >
          <PiggyIcon className="" />
        </View>
      )}
    </View>
  );
}
