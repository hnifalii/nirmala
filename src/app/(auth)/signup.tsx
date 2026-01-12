import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import NirmalaIcon from "../../../assets/icons/nirmala-icon.svg";
import Ionicons from "@expo/vector-icons/Ionicons";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

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

  const handleSignUp = () => {
    if (!fullName.trim()) {
      alert("Nama lengkap tidak boleh kosong");
      return;
    }
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
    if (!password.trim()) {
      alert("Password tidak boleh kosong");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password tidak cocok");
      return;
    }

    console.log("SignUp pressed", { fullName, email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#728c69]"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-6 py-12">
          {/* Logo */}
          <View className="flex-row gap-2 items-center justify-center mb-8">
            <NirmalaIcon width={36} height={36} />
            <Text className="text-white text-2xl font-semibold">nirmala</Text>
          </View>

          {/* Header */}
          <View className="mb-8">
            <Text className="text-3xl font-bold text-white mb-3 text-center">
              Buat akun
            </Text>
            <Text className="text-base text-white/80 text-center">
              Mulai membangun jarak dari asap rokok, dengan cara yang lebih
              sadar.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-4">
            {/* Full Name Input */}
            <TextInput
              className="bg-[#97AE8F] text-white px-4 py-5 rounded-lg text-base"
              placeholder="Nama Lengkap"
              placeholderTextColor="rgba(255, 255, 255, 1)"
              value={fullName}
              onChangeText={setFullName}
            />

            {/* Email Input */}
            <TextInput
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
            />
            {emailError && emailTouched && (
              <Text className="text-red-200 text-xs mt-2">{emailError}</Text>
            )}

            {/* Password Input */}
            <View className="flex-row items-center max-h-16">
              <TextInput
                className="flex-1 bg-[#97AE8F] text-white rounded-l-lg px-4 py-5 text-base"
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 1)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="h-full ml-2 px-4 rounded-r-lg bg-[#BDC9B9] justify-center items-center"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#728c69"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View className="flex-row items-center max-h-16">
              <TextInput
                className="flex-1 bg-[#97AE8F] text-white rounded-l-lg px-4 py-5 text-base"
                placeholder="Konfirmasi Password"
                placeholderTextColor="rgba(255, 255, 255, 1)"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                className="h-full ml-2 px-4 rounded-r-lg bg-[#BDC9B9] justify-center items-center"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye" : "eye-off"}
                  size={24}
                  color="#728c69"
                />
              </TouchableOpacity>
            </View>

            {/* Lupa Password */}
            <Link href="/forgot-password">
              <Text className="text-[#BCE4FE] text-base font-semibold text-left">
                Lupa password kamu?
              </Text>
            </Link>

            {/* SignUp Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-[#FFFCF4] rounded-full py-3 mt-12"
            >
              <Text className="text-center text-base font-bold text-black">
                Buat akun
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center gap-3 my-4">
              <View className="flex-1 h-px bg-white/30" />
              <Text className="text-white/60 text-sm">Hubungkan akun</Text>
              <View className="flex-1 h-px bg-white/30" />
            </View>

            {/* Google SignUp */}
            <TouchableOpacity className="bg-[#FFFCF4] rounded-full px-12 py-3 items-center justify-center">
              <Ionicons name="logo-google" size={24} />
            </TouchableOpacity>

            {/* Login Link */}
            <View className="items-center mt-4">
              <Text className="text-white text-sm">
                Sudah punya akun?{" "}
                <Link href="/login">
                  <Text className="font-semibold underline">Masuk</Text>
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
