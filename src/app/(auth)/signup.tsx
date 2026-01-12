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
import { useRouter } from "expo-router";
import NirmalaIcon from "../../../assets/icons/nirmala-icon.svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, AppTextInput } from "../../components/Typography";
import GoogleIcon from "../../../assets/icons/google.svg";

export default function SignUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [fullNameTouched, setFullNameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

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

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (fullNameTouched) {
      if (!text.trim()) {
        setFullNameError("Nama lengkap tidak boleh kosong");
      } else {
        setFullNameError("");
      }
    }
  };

  const handleFullNameBlur = () => {
    setFullNameTouched(true);
    if (!fullName.trim()) {
      setFullNameError("Nama lengkap tidak boleh kosong");
    } else {
      setFullNameError("");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordTouched) {
      if (!text.trim()) {
        setPasswordError("Password tidak boleh kosong");
      } else if (text.length < 8) {
        setPasswordError("Password minimal 8 karakter");
      } else {
        setPasswordError("");
      }
    }
    // Also validate confirm password if it's been touched
    if (confirmPasswordTouched && confirmPassword) {
      if (text !== confirmPassword) {
        setConfirmPasswordError("Password tidak cocok");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    if (!password.trim()) {
      setPasswordError("Password tidak boleh kosong");
    } else if (password.length < 8) {
      setPasswordError("Password minimal 8 karakter");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (confirmPasswordTouched) {
      if (!text.trim()) {
        setConfirmPasswordError("Konfirmasi password tidak boleh kosong");
      } else if (text !== password) {
        setConfirmPasswordError("Password tidak cocok");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Konfirmasi password tidak boleh kosong");
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Password tidak cocok");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSignUp = () => {
    // Trigger all validations
    setFullNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    let hasError = false;

    if (!fullName.trim()) {
      setFullNameError("Nama lengkap tidak boleh kosong");
      hasError = true;
    }

    if (!email.trim()) {
      setEmailError("Email tidak boleh kosong");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Format email tidak valid");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password tidak boleh kosong");
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError("Password minimal 8 karakter");
      hasError = true;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Konfirmasi password tidak boleh kosong");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Password tidak cocok");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    console.log("SignUp pressed", { fullName, email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#728c69]"
    >
      <View className="flex-1 px-6 py-12">
        {/* Logo */}
        <View className="flex-row gap-2 items-center justify-center mb-8">
          <NirmalaIcon width={36} height={36} />
          <AppText weight="semibold" className="text-white text-2xl">
            nirmala
          </AppText>
        </View>

        {/* Header */}
        <View className="mb-4">
          <AppText
            weight="bold"
            className="text-3xl mb-1 text-white text-center"
          >
            Buat akun
          </AppText>
          <AppText
            weight="medium"
            className="text-base text-white/80 text-center"
          >
            Mulai membangun jarak dari asap rokok, dengan cara yang lebih sadar.
          </AppText>
        </View>

        <AppText
          weight="medium"
          className="text-base mb-4 text-white/80 text-center"
        >
          Sudah memiliki akun?{" "}
          <AppText
            weight="semibold"
            className="text-[#BCE4FE] underline"
            onPress={() => router.replace("/(auth)/login")}
          >
            Masuk
          </AppText>
        </AppText>

        {/* Form */}
        <View className="gap-4">
          {/* Full Name Input */}
          <View>
            <AppTextInput
              weight="semibold"
              className={`bg-[#97AE8F] text-white px-4 py-5 rounded-lg text-base ${
                fullNameError && fullNameTouched
                  ? "border-2 border-red-500"
                  : ""
              }`}
              placeholder="Nama Lengkap"
              placeholderTextColor="rgba(255, 255, 255, 1)"
              value={fullName}
              onChangeText={handleFullNameChange}
              onBlur={handleFullNameBlur}
            />
            {fullNameError && fullNameTouched && (
              <Text className="text-red-200 text-xs mt-1">{fullNameError}</Text>
            )}
          </View>

          {/* Email Input */}
          <View>
            <AppTextInput
              weight="semibold"
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
              <Text className="text-red-200 text-xs mt-1">{emailError}</Text>
            )}
          </View>

          {/* Password Input */}
          <View>
            <View className="flex-row items-center max-h-16">
              <AppTextInput
                weight="semibold"
                className={`flex-1 bg-[#97AE8F] text-white rounded-r-none px-4 py-5 text-base ${
                  passwordError && passwordTouched
                    ? "border-2 border-red-500"
                    : ""
                }`}
                placeholder="Password (min. 8 karakter)"
                placeholderTextColor="rgba(255, 255, 255, 1)"
                value={password}
                onChangeText={handlePasswordChange}
                onBlur={handlePasswordBlur}
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
            {passwordError && passwordTouched && (
              <Text className="text-red-200 text-xs mt-1">{passwordError}</Text>
            )}
          </View>

          {/* Confirm Password Input */}
          <View>
            <View className="flex-row items-center max-h-16">
              <AppTextInput
                weight="semibold"
                className={`flex-1 bg-[#97AE8F] text-white rounded-r-none px-4 py-5 text-base ${
                  confirmPasswordError && confirmPasswordTouched
                    ? "border-2 border-red-500"
                    : ""
                }`}
                placeholder="Konfirmasi Password"
                placeholderTextColor="rgba(255, 255, 255, 1)"
                value={confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
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
            {confirmPasswordError && confirmPasswordTouched && (
              <Text className="text-red-200 text-xs mt-1">
                {confirmPasswordError}
              </Text>
            )}
          </View>

          {/* SignUp Button */}
          <View className="pt-6">
            <TouchableOpacity
              onPress={handleSignUp}
              className="bg-[#FFFCF4] rounded-full py-3"
            >
              <AppText
                weight="bold"
                className="text-center text-lg text-gray-700"
              >
                Buat akun
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View className="flex-row items-center gap-3 my-4">
            <View className="flex-1 h-px bg-white/30" />
            <AppText className="text-white/60 text-sm">Hubungkan akun</AppText>
            <View className="flex-1 h-px bg-white/30" />
          </View>

          {/* Google SignUp */}
          <View className="items-center">
            <TouchableOpacity className="bg-[#FFFCF4] rounded-full px-10 py-3 items-center justify-center">
              <GoogleIcon width={24} height={24}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
