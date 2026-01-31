import React, { useEffect, useState } from "react";
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
import { StatusBar } from "expo-status-bar";
import { AppText, AppTextInput } from "../../components/Typography";
import GoogleIcon from "../../../assets/icons/google.svg";
import {
  // GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
// import {
//   GoogleSignin,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
import { UserInitialData } from "../../types/user";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "467863551925-matcan7uqvgp4t370jus0e0u4tt39feu.apps.googleusercontent.com",
  //   });
  // }, []);

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

  const handleLogin = async () => {
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

    console.log("Login pressed", { email, password });

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user document exists and has completed onboarding
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData?.isOnboardingCompleted) {
          router.replace("/(app)");
        } else {
          router.replace("/questionnaire");
        }
      } else {
        // If user doc doesn't exist for some reason, go to questionnaire
        router.replace("/questionnaire");
      }
    } catch (err: any) {
      console.error("error sign in " + err);
      // Handle specific error codes
      if (err.code === "auth/user-not-found") {
        setEmailError("Email tidak ditemukan");
      } else if (err.code === "auth/wrong-password") {
        setEmailError("Password salah");
      } else {
        setEmailError("Gagal login, coba lagi");
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   setLoading(true);

  //   try {
  //     await GoogleSignin.hasPlayServices({
  //       showPlayServicesUpdateDialog: true,
  //     });

  //     const signInResult = await GoogleSignin.signIn();
  //     const idToken = signInResult.data?.idToken;

  //     if (!idToken) {
  //       throw new Error("Google ID token not found");
  //     }

  //     const googleCredential = GoogleAuthProvider.credential(idToken);

  //     const userCredential = await signInWithCredential(auth, googleCredential);
  //     const user = userCredential.user;

  //     // check if user document exists
  //     const userDocRef = doc(db, "users", user.uid);
  //     const userDocSnap = await getDoc(userDocRef);

  //     if (userDocSnap.exists()) {
  //       const userData = userDocSnap.data();

  //       if (userData.isOnboardingCompleted) {
  //         router.replace("/(app)");
  //       } else {
  //         router.replace("/questionnaire");
  //       }
  //     } else {
  //       const initialData: UserInitialData = {
  //         uid: user.uid,
  //         fullName: user.displayName || "",
  //         email: user.email,
  //         joinedAt: serverTimestamp(),
  //         isOnboardingCompleted: false,
  //         stats: {
  //           currentStreak: 0,
  //           totalMoneySaved: 0,
  //           healthProgress: 0,
  //           lastRelapse: null,
  //           totalCigarettesAvoided: 0,
  //           totalActivitiesCompleted: 0,
  //         },
  //       };

  //       await setDoc(userDocRef, initialData);

  //       router.replace("/questionnaire");
  //     }
  //   } catch (err: any) {
  //     if (err.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("user cancelled login");
  //     } else {
  //       console.error("error sign up google " + err);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#728c69]"
    >
      <StatusBar style="light" />
      <View className="flex-1 px-6 py-12">
        {/* Logo */}
        <View className="flex-row gap-2 items-center justify-center mb-8">
          <NirmalaIcon width={36} height={36} />
          <AppText
            variant="title"
            weight="medium"
            className="text-white text-2xl"
          >
            nirmala
          </AppText>
        </View>

        {/* Header */}
        <View className="mb-4">
          <AppText weight="medium" className="text-3xl text-white text-center">
            Masuk
          </AppText>
          <AppText
            weight="medium"
            className="text-base text-white/80 text-center"
          >
            Lanjutkan perjuanganmu.
          </AppText>
        </View>

        <AppText
          weight="medium"
          className="text-base mb-4 text-white/80 text-center"
        >
          Baru mengenal Nirmala?{" "}
          <AppText
            weight="medium"
            className="text-[#BCE4FE] underline"
            onPress={() => router.replace("/(auth)/signup")}
          >
            Buat akun
          </AppText>
        </AppText>
        {/* Form */}
        <View className="gap-4">
          {/* Email Input */}
          <View>
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
            />
            {emailError && emailTouched && (
              <AppText weight="medium" className="text-red-200 text-xs mt-2">
                {emailError}
              </AppText>
            )}
          </View>

          {/* Password Input */}
          <View className="flex-row items-center max-h-16">
            <AppTextInput
              weight="medium"
              className="flex-1 bg-[#97AE8F] text-white rounded-r-none px-4 py-5 text-base"
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

          {/* Forgot Password */}
          <TouchableOpacity onPress={() => router.replace("/forgot-password")}>
            <AppText
              weight="medium"
              className="text-[#BCE4FE] text-base text-left">
              Lupa password
            </AppText>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            disabled={loading}
            onPress={handleLogin}
            className="bg-[#FFFCF4] rounded-full py-3 mt-12"
          >
            <AppText
              weight="medium"
              className="text-center text-lg text-gray-700"
            >
              Masuk
            </AppText>
          </TouchableOpacity>

          {/* Divider */}
          {/* <View className="flex-row items-center gap-3 my-4">
            <View className="flex-1 h-px bg-white/30" />
            <AppText className="text-white/60 text-sm">Hubungkan akun</AppText>
            <View className="flex-1 h-px bg-white/30" />
          </View> */}

          {/* Google Login */}
          {/* <View className="items-center">
            <TouchableOpacity
              disabled={loading}
              onPress={handleGoogleSignIn}
              className="bg-[#FFFCF4] rounded-full px-10 py-3 items-center justify-center"
            >
              <GoogleIcon width={24} height={24} />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
