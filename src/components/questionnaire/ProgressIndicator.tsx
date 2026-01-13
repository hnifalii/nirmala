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
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
  withDelay,
  Easing,
  useDerivedValue,
  runOnJS,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput); // Using TextInput for number animation hack or just Text key

export const CircularProgress: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
}) => {
  const progress = current / total;
  const strokeWidth = 4;
  const radius = 35;
  const circumference = 2 * Math.PI * radius;

  // State to hold the displayed number
  const [displayValue, setDisplayValue] = useState(current);

  // Shared values
  const animatedProgress = useSharedValue(0);
  const animatedNumber = useSharedValue(0);

  useEffect(() => {
    // Animate progress
    animatedProgress.value = withTiming(progress, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });

    // Animate number
    animatedNumber.value = withTiming(current, {
      duration: 800,
      easing: Easing.out(Easing.exp),
    });
  }, [current, progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - animatedProgress.value);
    return {
      strokeDashoffset,
    };
  });

  // Derived value to update the state
  useDerivedValue(() => {
    const val = Math.round(animatedNumber.value);
    runOnJS(setDisplayValue)(val);
  });

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
        <AnimatedCircle
          cx={45}
          cy={45}
          r={radius}
          stroke="#FBA359"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90, 45, 45)`}
        />
      </Svg>
      {/* Number in center */}
      <View className="absolute items-center justify-center">
        <Text className="text-3xl font-bold text-dark">{displayValue}</Text>
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
