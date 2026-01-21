/// <reference types="nativewind/types" />

import "react-native";

declare module "react-native" {
  interface ScrollViewProps {
    contentContainerClassName?: string;
  }
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png" {
  const value: any;
  export default value;
}
