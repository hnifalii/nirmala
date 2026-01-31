import React, { useMemo } from "react";
import { View, ViewProps } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Circle } from "react-native-svg";

interface BlurredCircleProps extends ViewProps {
  color?: string;
  size?: number;
}

export const BlurredCircle = ({ 
  color = "#728C69", 
  style,
  ...props 
}: BlurredCircleProps) => {
  const gradId = useMemo(() => "grad" + Math.random().toString(36).substring(2, 10), []);

  return (
    <View style={style} {...props}>
      <Svg height="100%" width="100%" viewBox="0 0 100 100">
        <Defs>
          <RadialGradient
            id={gradId}
            cx="50"
            cy="50"
            rx="50"
            ry="50"
            fx="50"
            fy="50"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={color} stopOpacity="0.6" />
            <Stop offset="1" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle cx="50" cy="50" r="50" fill={`url(#${gradId})`} />
      </Svg>
    </View>
  );
};
