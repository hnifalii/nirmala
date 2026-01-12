import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { QuestionOption } from "../../types/questionnaire";

interface OptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      className={`w-full py-4 px-5 rounded-full mb-3 ${
        isSelected
          ? "bg-[#FAF3E1] border-2 border-sage"
          : "bg-[#FAF3E1] border-2 border-transparent"
      }`}
      onPress={() => onSelect(option.id)}
      activeOpacity={0.7}
    >
      <Text
        className={`text-base ${
          isSelected ? "text-textPrimary font-semibold" : "text-textPrimary font-semibold"
        }`}
      >
        {option.text}
      </Text>
    </TouchableOpacity>
  );
};
