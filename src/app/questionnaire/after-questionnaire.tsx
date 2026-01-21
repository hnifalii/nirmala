import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { AppText, AppTextInput } from "../../components/Typography";
import { LoadingModal } from "../../components/Modal";
import PiggyIcon from "../../../assets/icons/piggy-bank.svg";
import SmartphoneIcon from "../../../assets/icons/smartphone.svg";
import ShoeIcon from "../../../assets/icons/shoe.svg";
import TicketIcon from "../../../assets/icons/ticket.svg";
import PlantIcon from "../../../assets/icons/plant.svg";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const { height, width } = Dimensions.get("window");

interface GoalOption {
  id: string;
  text: string;
}

const SAVING_GOALS: GoalOption[] = [
  { id: "smartphone", text: "Smartphone" },
  { id: "tabungan-bebas", text: "Tabungan bebas" },
  { id: "sepatu", text: "Sepatu" },
  { id: "tiket-konser", text: "Tiket konser" },
];

// Component for animated button
const AnimatedButton = ({ goal, isSelected, onPress, colors }: any) => {
  const scale = useSharedValue(1);

  const iconMap: { [key: string]: any } = {
    smartphone: SmartphoneIcon,
    "tabungan-bebas": PlantIcon,
    sepatu: ShoeIcon,
    "tiket-konser": TicketIcon,
  };

  const IconComponent = iconMap[goal.id];

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 50 }),
      withSpring(1, { damping: 100, stiffness: 200 }),
    );
    onPress(goal.id);
  };

  return (
    <Animated.View style={animatedStyle} className="m-1">
      <TouchableOpacity
        className={`flex-row py-2 pl-3 pr-4 rounded-full items-center justify-center border-2 ${
          isSelected ? "bg-cream" : "bg-transparent"
        } ${colors.borderColor}`}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        {IconComponent && (
          <View className="mr-2 p-1.5 rounded-full bg-cream">
            <IconComponent width={20} height={20} />
          </View>
        )}
        <AppText
          weight="semibold"
          className={`text-base ${
            isSelected ? "text-gray-800" : colors.textColor
          }`}
        >
          {goal.text}
        </AppText>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function AfterQuestionnaireScreen() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [isCustomInputMode, setIsCustomInputMode] = useState(false);
  const [customGoal, setCustomGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const saveButtonOpacity = useSharedValue(0);
  const saveButtonTranslate = useSharedValue(20);
  const otherButtonOpacity = useSharedValue(1);
  const optionsOpacity = useSharedValue(1);
  const optionsTranslate = useSharedValue(0);
  const inputOpacity = useSharedValue(0);
  const inputTranslate = useSharedValue(30);

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

  useEffect(() => {
    if (selectedGoals.length > 0) {
      saveButtonOpacity.value = withTiming(1, { duration: 200 });
      saveButtonTranslate.value = withTiming(0, { duration: 200 });
      otherButtonOpacity.value = withTiming(0, { duration: 200 });
    } else {
      saveButtonOpacity.value = withTiming(0, { duration: 200 });
      saveButtonTranslate.value = withTiming(20, { duration: 100 });
      otherButtonOpacity.value = withTiming(1, { duration: 200 });
    }
  }, [selectedGoals.length]);

  useEffect(() => {
    if (isCustomInputMode) {
      optionsOpacity.value = withTiming(0, { duration: 200 });
      optionsTranslate.value = withTiming(-30, { duration: 200 });
      inputOpacity.value = withTiming(1, { duration: 300 });
      inputTranslate.value = withTiming(0, { duration: 300 });
    } else {
      inputOpacity.value = withTiming(0, { duration: 200 });
      inputTranslate.value = withTiming(30, { duration: 200 });
      optionsOpacity.value = withTiming(1, { duration: 300 });
      optionsTranslate.value = withTiming(0, { duration: 300 });
    }
  }, [isCustomInputMode]);

  const saveButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: saveButtonOpacity.value,
      transform: [{ translateY: saveButtonTranslate.value }],
    };
  });

  const otherButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: otherButtonOpacity.value,
    };
  });

  const optionsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: optionsOpacity.value,
      transform: [{ translateY: optionsTranslate.value }],
    };
  });

  const inputAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: inputOpacity.value,
      transform: [{ translateY: inputTranslate.value }],
    };
  });

  const handleSelectGoal = (goalId: string) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        return prev.filter((id) => id !== goalId);
      } else {
        return [...prev, goalId];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedGoals.length === 0) return;
    setIsLoading(true);
    console.log("Selected goals:", selectedGoals);

    try {
      const user = auth.currentUser;
      if (!user) return;

      await updateDoc(doc(db, "users", user.uid), {
        savingsGoal: {
          name: selectedGoals.join(', '),
          isDone: false,
          target: 0,
          current: 0,
        },
      });

      router.push("/questionnaire/goal-amount");
    } catch (err) {
      console.error("error save goal " + err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOther = () => {
    setIsCustomInputMode(true);
    setSelectedGoals([]);
  };

  const handleBackFromInput = () => {
    setIsCustomInputMode(false);
    setCustomGoal("");
  };

  const handleSaveCustomGoal = async () => {
    if (customGoal.trim()) {
      setIsLoading(true);
      console.log("Custom goal:", customGoal);

      try {
        const user = auth.currentUser;
        if (!user) return;

        await updateDoc(doc(db, "users", user.uid), {
          savingsGoal: {
            name: customGoal,
            isDone: false,
            target: 0,
            current: 0,
          },
        });

        router.push("/questionnaire/goal-amount");
      } catch (err) {
        console.error("error save goal " + err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />

      <LinearGradient
        colors={["#728C69", "#728C69"]}
        className="flex-1 relative"
      >
        {/* Top Section with Message and Question */}
        <View className="flex-1 px-6 pt-8 justify-start relative">
          {/* Info Banner */}
          <View className="flex-row items-center p-4 mb-6">
            <View className="mr-3 w-6 h-6 items-center justify-center rounded-full bg-blue-400 border border-white">
              <AppText weight="semibold">!</AppText>
            </View>
            <AppText weight="semibold" className="text-white text-base flex-1">
              Kami mencatat uang dari rokok yang tidak kamu beli sebagai
              tabungan.
            </AppText>
          </View>

          {/* Question Text */}
          <AppText
            weight="bold"
            className="text-white text-2xl text-center leading-8 mb-8"
          >
            Kalau uang rokokmu dikumpulkan, kamu ingin memakainya untuk apa?
          </AppText>

          {/* Goal Options in 2x2 Grid or Custom Input */}
          {!isCustomInputMode ? (
            <Animated.View
              style={optionsAnimatedStyle}
              pointerEvents={isCustomInputMode ? "none" : "auto"}
            >
              <View className="flex-row flex-wrap justify-center mb-1">
                {SAVING_GOALS.map((goal, index) => {
                  const buttonColors = [
                    { borderColor: "border-white", textColor: "text-white" },
                    { borderColor: "border-white", textColor: "text-white" },
                    { borderColor: "border-white", textColor: "text-white" },
                    { borderColor: "border-white", textColor: "text-white" },
                  ];
                  const colors = buttonColors[index];
                  const isSelected = selectedGoals.includes(goal.id);

                  return (
                    <AnimatedButton
                      key={goal.id}
                      goal={goal}
                      isSelected={isSelected}
                      onPress={handleSelectGoal}
                      colors={colors}
                    />
                  );
                })}
              </View>

              {/* "Lainnya" (Other) Button */}
              <Animated.View
                className="flex-row justify-center"
                style={otherButtonAnimatedStyle}
                pointerEvents={selectedGoals.length > 0 ? "none" : "auto"}
              >
                <TouchableOpacity
                  className="py-3 px-6 rounded-full border-2 border-white items-center justify-center"
                  onPress={handleOther}
                  activeOpacity={0.7}
                >
                  <AppText
                    weight="semibold"
                    className="text-base text-white text-center"
                  >
                    Lainnya
                  </AppText>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
          ) : (
            <Animated.View
              style={inputAnimatedStyle}
              pointerEvents={isCustomInputMode ? "auto" : "none"}
              className="items-center gap-4"
            >
              <AppText weight="semibold" className="text-white text-lg mt-4">
                Masukkan tujuan kamu:
              </AppText>
              <AppTextInput
                weight="medium"
                className="w-full text-lg px-4 py-5 rounded-lg bg-[#97AE8F] text-cream"
                placeholder="Contoh: laptop, kamera, liburan"
                placeholderTextColor="#ddd"
                value={customGoal}
                onChangeText={setCustomGoal}
              />
              <View className="flex-row gap-3 mt-4 w-full">
                <TouchableOpacity
                  className="flex-1 py-3 px-4 rounded-full border-2 border-white items-center justify-center"
                  onPress={handleBackFromInput}
                  activeOpacity={0.7}
                >
                  <AppText
                    weight="semibold"
                    className="text-base text-white text-center"
                  >
                    Kembali
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!customGoal.trim()}
                  className={`flex-1 py-3 px-4 bg-sky rounded-full items-center justify-center ${
                    customGoal.trim() ? "" : "opacity-50"
                  }`}
                  onPress={handleSaveCustomGoal}
                  activeOpacity={0.7}
                >
                  <AppText
                    weight="bold"
                    className="text-base text-gray-700 text-center"
                  >
                    Simpan
                  </AppText>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          {/* "Simpan jawaban" Button with Animation */}
          <Animated.View
            className="flex-row justify-center"
            style={saveButtonAnimatedStyle}
            pointerEvents={selectedGoals.length > 0 ? "auto" : "none"}
          >
            <TouchableOpacity
              className="py-3 px-8 rounded-full bg-sky items-center justify-center shadow-lg"
              onPress={handleContinue}
              activeOpacity={0.7}
            >
              <AppText
                weight="bold"
                className="text-base text-gray-700 text-center"
              >
                Simpan jawaban
              </AppText>
            </TouchableOpacity>
          </Animated.View>
          {!keyboardVisible && (
            <View
              className="absolute bottom-0 left-0 right-0 items-center"
              pointerEvents="none"
            >
              <PiggyIcon className="" />
            </View>
          )}
        </View>
      </LinearGradient>

      {/* Loading Modal */}
      <LoadingModal visible={isLoading} message="Menyiapkan tujuanmu.." />
    </KeyboardAvoidingView>
  );
}
