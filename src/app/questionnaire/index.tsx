import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  ProgressBadge,
  CircularProgress,
  OptionCard,
} from "../../components/questionnaire";
import { QUESTIONNAIRE_QUESTIONS } from "../../constants/questions";
import { QuestionnaireAnswer } from "../../types/questionnaire";
import CloudIcon from "../../../assets/icons/cloud-shadow.svg";
import HeaderQuestion from "../../../assets/icons/header-quest.svg";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";

const { height, width } = Dimensions.get("window");

export default function QuestionnaireScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONNAIRE_QUESTIONS[currentIndex];
  const totalQuestions = QUESTIONNAIRE_QUESTIONS.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    // Save current answer
    const newAnswer: QuestionnaireAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: selectedOption,
    };

    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex(
      (a) => a.questionId === currentQuestion.id
    );

    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Questionnaire completed, navigate to home
      // TODO: Save answers to backend/storage
      console.log("Questionnaire completed:", updatedAnswers);
      router.replace("/(app)");
    } else {
      // Go to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  return (
    <View className="flex-1">
      <StatusBar style="light" />

      <LinearGradient colors={["#728C69", "#728C69"]} className="flex-1">
        {/* Top Section with Question */}
        <View
          className="relative px-6 pt-12 justify-center"
          style={{ height: height * 0.38 }}
        >
          {/* Decorative Header */}
          <View
            className="absolute"
            style={{
              width: 150,
              height: 150,
              top: 0,
              right: 50,
            }}
          >
            <HeaderQuestion width={200} height={200} />
          </View>

          {/* Back Button - shows from question 2 onwards */}
          {currentIndex > 0 && (
            <TouchableOpacity
              className="absolute top-12 left-6 z-10"
              onPress={() => {
                setCurrentIndex(currentIndex - 1);
                // Restore previous answer if exists
                const prevAnswer = answers.find(
                  (a) =>
                    a.questionId ===
                    QUESTIONNAIRE_QUESTIONS[currentIndex - 1].id
                );
                setSelectedOption(prevAnswer?.selectedOptionId || null);
              }}
            >
              <ArrowLeft width={30} height={30} /> 
            </TouchableOpacity>
          )}

          {/* Progress Badge (1 dari 10) */}
          <View className="items-center absolute top-10 left-0 right-0">
            <ProgressBadge current={currentIndex + 1} total={totalQuestions} />
          </View>

          {/* Question Text */}
          <Text className="text-white text-2xl font-bold text-center leading-8 mb-6">
            {currentQuestion.text}
          </Text>

          {/* Cloud decoration */}
          <View className="absolute" style={{ left: 20, bottom: 20 }}>
            <CloudIcon width={80} height={80} />
          </View>
        </View>

        {/* Bottom Section with Options - with relative positioning for overlap */}
        <View className="flex-1 relative">
          {/* Circular Progress - positioned at the boundary */}
          <View
            className="absolute z-20 items-center"
            style={{
              top: -45,
              left: 0,
              right: 0,
            }}
          >
            <CircularProgress
              current={currentIndex + 1}
              total={totalQuestions}
            />
          </View>

          {/* Cream Background */}
          <View className="flex-1 bg-cream px-6 pt-16 pb-6">
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {/* Options */}
              <View className="mb-6">
                {currentQuestion.options.map((option) => (
                  <OptionCard
                    key={option.id}
                    option={option}
                    isSelected={selectedOption === option.id}
                    onSelect={handleSelectOption}
                  />
                ))}
              </View>
            </ScrollView>

            {/* Next Button */}
            <TouchableOpacity
              className={`py-4 rounded-full ${
                selectedOption ? "bg-sage" : "bg-sage/50"
              }`}
              onPress={handleNext}
              disabled={!selectedOption}
            >
              <Text className="text-white text-center font-semibold text-base">
                {isLastQuestion ? "Selesai" : "Selanjutnya"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
