import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import QuestionMark from "../../../assets/icons/ri_question-fill.svg";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

// Badge component (1 dari 10)
export const ProgressBadge: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
}) => {
  return (
    <View className="bg-cream rounded-md px-4 py-3 flex-row items-center shadow-sm">
      <View className="w-4 h-4 rounded-full items-center justify-center mr-2">
        <QuestionMark />
      </View>
      <Text className="text-textPrimary font-semibold">
        {current} dari {total}
      </Text>
    </View>
  );
};

// Circular Progress component
export const CircularProgress: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
}) => {
  const progress = current / total;
  const strokeWidth = 4;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View className="items-center justify-center bg-cream border-4 border-sage rounded-full p-px shadow-md">
      <Svg width={90} height={90}>
        {/* Background Circle */}
        <Circle
          cx={45}
          cy={45}
          r={radius}
          stroke="#FFE6DA"
          strokeWidth={strokeWidth}
          fill="#FFFCF4"
        />
        {/* Progress Circle */}
        <Circle
          cx={45}
          cy={45}
          r={radius}
          stroke="#FBA359"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90, 45, 45)`}
        />
      </Svg>
      {/* Number in center */}
      <View className="absolute items-center justify-center">
        <Text className="text-3xl font-bold text-dark">{current}</Text>
      </View>
    </View>
  );
};

// Combined (for backward compatibility)
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
}) => {
  return (
    <View className="items-center">
      <ProgressBadge current={current} total={total} />
    </View>
  );
};
