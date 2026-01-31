import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { AppText, AppTextInput } from "../../components/Typography";
import { AlertModal } from "../../components/Modal";
import NirmalaIcon from "../../../assets/icons/nirmala-icon.svg";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailTouched) {
      if (!text.trim()) {
        setEmailError("Email tidak boleh kosong");
      } else if (!validateEmail(text)) {
        setEmailError("Format email tidak valid");
      } else {
        setEmailError("");
      }
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (!email.trim()) {
      setEmailError("Email tidak boleh kosong");
    } else if (!validateEmail(email)) {
      setEmailError("Format email tidak valid");
    } else {
      setEmailError("");
    }
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setEmailError("Email tidak boleh kosong");
      setEmailTouched(true);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Format email tidak valid");
      setEmailTouched(true);
      return;
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleConfirm = () => {
    router.replace("/(auth)/login");
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-[#728c69]"
      >
        <AlertModal
          visible={isSubmitted}
          title="Email terkirim"
          message="Link reset password telah dikirim, silakan cek email untuk melanjutkan."
          buttonLabel="Mengerti"
          buttonColor="#FBA359"
          onConfirm={handleConfirm}
        />
        <View className="flex-1 px-6 pb-24 justify-between">
          {/* Header */}
          <View>
            {/* Top spacing */}
            <View className="h-12" />

            {/* Logo */}
            <View className="flex-row gap-2 items-center justify-center mb-8">
              <NirmalaIcon width={36} height={36} />
              <AppText weight="medium" className="text-white text-2xl">
                nirmala
              </AppText>
            </View>

            {/* Title & Description */}
            <View className="mb-12">
              <AppText
                weight="bold"
                className="text-3xl mb-3 text-white text-start"
              >
                Tenang. Kami bantu.
              </AppText>
              <AppText
                weight="medium"
                className="text-base text-white/80 text-start"
              >
                Masukkan email yang terhubung dengan akun Nirmala.
              </AppText>
            </View>

            {/* Email Input */}
            <View className="mb-2">
              <AppTextInput
                weight="medium"
                className={`bg-[#97AE8F] text-white px-4 py-5 rounded-lg text-base ${
                  emailError && emailTouched ? "border-2 border-red-500" : ""
                }`}
                placeholder="Alamat Email"
                placeholderTextColor="rgba(255, 255, 255, 1)"
                value={email}
                onChangeText={handleEmailChange}
                onBlur={handleEmailBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              {emailError && emailTouched && (
                <AppText
                  weight="medium"
                  className="text-red-200 text-xs mt-2"
                >
                  {emailError}
                </AppText>
              )}
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={isLoading}
              className={`rounded-full py-3 mt-12 ${
                isLoading ? "bg-[#728c69]/80" : "bg-[#FFFCF4]"
              }`}
            >
              <AppText
                weight="bold"
                className={`text-center text-lg ${
                  isLoading ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {isLoading ? "Mengirim..." : "Reset Password"}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
        <Image
          source={require("../../../assets/mascot.png")}
          className="absolute z-10 bottom-0 left-0 right-0"
        />
    </>
  );
}
