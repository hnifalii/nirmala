import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: Implement actual login logic
    // For now, navigate to questionnaire
    router.replace("/questionnaire");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-12">
            {/* Back Button */}
            <TouchableOpacity onPress={handleBack} className="mb-8">
              <Text className="text-sage text-lg">← Kembali</Text>
            </TouchableOpacity>

            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-800 mb-2">
                Masuk
              </Text>
              <Text className="text-gray-500">Masuk ke akun Nirmala kamu</Text>
            </View>

            {/* Form */}
            <View className="space-y-4 mb-6">
              <View>
                <Text className="text-gray-700 mb-2 font-medium">Email</Text>
                <TextInput
                  className="bg-[#FAF3E1] rounded-xl px-4 py-4 text-gray-800"
                  placeholder="Masukkan email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="mt-4">
                <Text className="text-gray-700 mb-2 font-medium">Password</Text>
                <TextInput
                  className="bg-[#FAF3E1] rounded-xl px-4 py-4 text-gray-800"
                  placeholder="Masukkan password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="mt-2">
                <Text className="text-sage text-right">Lupa password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-sage py-4 rounded-full mt-4"
              onPress={handleLogin}
            >
              <Text className="text-white text-center font-semibold text-base">
                Masuk
              </Text>
            </TouchableOpacity>

            {/* Register Link */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500">Belum punya akun? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                <Text className="text-sage font-semibold">Daftar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
