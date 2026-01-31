import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText } from "../../components/Typography";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import PasangElipse from "../../../assets/icons/Pasang-elipse.svg";
import GambarMascot from "../../../assets/icons/gambar-mascot.svg";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get("window");

// Game data
const EXERCISE_DURATION = 60; // 1 minute in seconds
const CARDS_DATA = [
  { id: 1, icon: "flower-tulip", color: "#FF9A6C" },
  { id: 2, icon: "flower-tulip", color: "#FF9A6C" },
  { id: 3, icon: "leaf", color: "#4ADE80" },
  { id: 4, icon: "leaf", color: "#4ADE80" },
  { id: 5, icon: "water", color: "#60A5FA" },
  { id: 6, icon: "water", color: "#60A5FA" },
];

export default function PasangGambarScreen() {
  const [gameState, setGameState] = useState<
    "intro" | "playing" | "success" | "timeout"
  >("intro");
  const [cards, setCards] = useState<any[]>([]);
  const [selectedCards, setSelectedCards] = useState<any[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION);

  const [introStep, setIntroStep] = useState(0); // 0: Title, 1: Instruction, 2: Start

  // Initialize game
  useEffect(() => {
    if (gameState === "playing") {
      const shuffledCards = [...CARDS_DATA]
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({ ...card, uniqueId: index, isFlipped: false }));
      setCards(shuffledCards);
      setTimeLeft(EXERCISE_DURATION);
      setMatchedPairs([]);
      setSelectedCards([]);
    }
  }, [gameState]);

  // Intro Animation Sequence
  useEffect(() => {
    if (gameState === "intro") {
      if (introStep === 0) {
        const timer = setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIntroStep(1);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (introStep === 1) {
        const timer = setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setIntroStep(2);
        }, 3000);
        return () => clearTimeout(timer);
      } else if (introStep === 2) {
        const timer = setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setGameState("playing");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState, introStep]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      gameState === "playing" &&
      timeLeft > 0 &&
      matchedPairs.length < CARDS_DATA.length
    ) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("timeout");
    }
    return () => clearInterval(interval);
  }, [gameState, timeLeft, matchedPairs]);

  // Check matching
  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (first.icon === second.icon) {
        setMatchedPairs((prev) => [...prev, first.id, second.id]);
        setSelectedCards([]);
        if (matchedPairs.length + 2 === CARDS_DATA.length) {
          setTimeout(() => setGameState("success"), 500);
        }
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.uniqueId === first.uniqueId || c.uniqueId === second.uniqueId
                ? { ...c, isFlipped: false }
                : c,
            ),
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  }, [selectedCards]);

  const handleCardPress = (card: any) => {
    if (
      selectedCards.length >= 2 ||
      card.isFlipped ||
      matchedPairs.includes(card.id)
    )
      return;

    setCards((prev) =>
      prev.map((c) =>
        c.uniqueId === card.uniqueId ? { ...c, isFlipped: true } : c,
      ),
    );
    setSelectedCards((prev) => [...prev, card]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (gameState === "intro") {
    return (
      <View className="flex-1 bg-[#FFE05B]">
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6 justify-center items-center relative gap-5">
            {/* Decorative Circles */}
            <View className="absolute -top-10 left-0" pointerEvents="none">
              <PasangElipse width={171} height={161} />
            </View>
            <View
              className="absolute -bottom-10 right-0 rotate-180"
              pointerEvents="none"
            >
              <PasangElipse width={171} height={161} />
            </View>

            {introStep === 0 && (
              <>
                <View className="items-center mb-10">
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={24}
                    color="white"
                  />
                  <AppText className="text-white mt-2">1 menit</AppText>
                </View>

                <AppText
                  weight="bold"
                  className="text-2xl text-[#925C05] text-center mb-4"
                >
                  Pasang Gambar
                </AppText>

                <AppText className="text-[#925C05] text-center mb-20 leading-6">
                  Mencocokkan gambar sederhana untuk{"\n"}
                  mengalihkan pikiran sejenak saat dorongan{"\n"}
                  muncul.
                </AppText>
              </>
            )}

            {introStep === 1 && (
              <AppText
                weight="bold"
                className="text-xl text-[#B46C00] text-center px-10"
              >
                Ketuk kartu untuk membalik
              </AppText>
            )}

            {introStep === 2 && (
              <AppText
                weight="bold"
                className="text-2xl text-[#B46C00] text-center"
              >
                Mulai
              </AppText>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (gameState === "success") {
    return (
      <View className="flex-1 bg-[#FFE05B]">
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6 justify-center items-center relative">
            {/* Decorative Circles */}
            <View className="absolute -top-10 left-0" pointerEvents="none">
              <PasangElipse width={171} height={161} />
            </View>
            <View
              className="absolute -bottom-10 right-0 rotate-180"
              pointerEvents="none"
            >
              <PasangElipse width={171} height={161} />
            </View>

            <AppText
              weight="bold"
              className="text-2xl text-[#B46C00] text-center mb-4"
            >
              Bagus, fokusmu sudah cukup
            </AppText>

            <AppText className="text-[#B46C00] text-center mb-10">
              Dorongan biasanya mereda setelah{"\n"}
              beberapa saat.
            </AppText>

            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-white px-8 py-3 rounded-full"
            >
              <AppText weight="bold" className="text-[#B46C00]">
                Selesai
              </AppText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (gameState === "timeout") {
    return (
      <View className="flex-1 bg-[#FFE05B]">
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6 justify-center items-center relative gap-5">
            {/* Decorative Circles */}
            <View className="absolute -top-10 left-0" pointerEvents="none">
              <PasangElipse width={171} height={161} />
            </View>
            <View
              className="absolute -bottom-10 right-0 rotate-180"
              pointerEvents="none"
            >
              <PasangElipse width={171} height={161} />
            </View>

            <AppText
              weight="bold"
              className="text-2xl text-[#B46C00] text-center mb-4"
            >
              Cukup sampai sini
            </AppText>

            <AppText className="text-[#B46C00] text-center mb-10">
              Kamu sudah meluangkan waktu untuk{"\n"}
              dirimu.
            </AppText>

            <TouchableOpacity
              onPress={() => {
                setGameState("intro");
                setIntroStep(2);
                setTimeLeft(EXERCISE_DURATION);
                setMatchedPairs([]);
                setSelectedCards([]);
                setCards([]);
              }}
              className="bg-white px-8 py-3 rounded-full mb-4"
            >
              <AppText weight="bold" className="text-[#B46C00]">
                Ulangi sebentar
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()} className="py-2">
              <AppText weight="bold" className="text-[#925C05] opacity-80">
                Selesai
              </AppText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#FFE05B]">
      <SafeAreaView className="flex-1">
        <View className="flex-1 px-6 pt-5 relative">
          {/* Decorative Circles */}
          <View className="absolute -top-10 left-0" pointerEvents="none">
            <PasangElipse width={171} height={161} />
          </View>
          <View
            className="absolute -bottom-10 right-0 rotate-180"
            pointerEvents="none"
          >
            <PasangElipse width={171} height={161} />
          </View>
          {/* Header */}
          <View className="flex-row justify-center items-baseline mb-10 bg-white/20 self-center px-4 py-1 rounded-full">
            <AppText weight="bold" className="text-dark text-lg ">
              {formatTime(timeLeft)}
            </AppText>
          </View>

          <View className="items-center mb-8">
            <AppText weight="bold" className="text-xl text-[#B46C00] mb-2">
              Cari dua gambar yang sama
            </AppText>
            <AppText className="text-[#B46C00]">
              {(CARDS_DATA.length - matchedPairs.length) / 2} pasangan lagi
            </AppText>
          </View>

          {/* Grid */}
          <View className="flex-row flex-wrap justify-center gap-4">
            {cards.map((card) => (
              <TouchableOpacity
                key={card.uniqueId}
                onPress={() => handleCardPress(card)}
                activeOpacity={0.9}
                className="w-[100px] h-[120px]"
              >
                {/* Shadow/Offset Layer */}
                <View className="absolute top-1 left-1 w-full h-full bg-[#FACC15] rounded-xl" />

                {/* Card Face */}
                <LinearGradient
                  colors={["#FFFFFF", "#FFFFFF", "#F1F5F9", "#F1F5F9"]}
                  locations={[0, 0.45, 0.45, 1]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  className="w-full h-full rounded-xl items-center justify-center border-2 border-white"
                >
                  {/* Back of Card / Front of Card Logic */}
                  {card.isFlipped || matchedPairs.includes(card.id) ? (
                    <MaterialCommunityIcons
                      name={card.icon}
                      size={40}
                      color={card.color}
                    />
                  ) : (
                    <GambarMascot width={60} height={60} color="#CBD5E1" />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
