import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextStyle,
} from "react-native";

type Variant = "title" | "subtitle" | "body" | "caption" | "label";

type Weight =
  | "ultralight"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "heavy"
  | "black";

interface AppTextProps extends RNTextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

const fontFamilies: Record<Weight, string> = {
  ultralight: "Gilroy-UltraLight",
  thin: "Gilroy-Thin",
  light: "Gilroy-Light",
  regular: "Gilroy-Regular",
  medium: "Gilroy-Medium",
  semibold: "Gilroy-SemiBold",
  bold: "Gilroy-Bold",
  extrabold: "Gilroy-ExtraBold",
  heavy: "Gilroy-Heavy",
  black: "Gilroy-Black",
};

const variantStyles: Record<Variant, TextStyle> = {
  title: { fontSize: 28, lineHeight: 34 },
  subtitle: { fontSize: 22, lineHeight: 28 },
  body: { fontSize: 16, lineHeight: 22 },
  label: { fontSize: 14, lineHeight: 18, letterSpacing: 0.2 },
  caption: { fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
};

const styles = StyleSheet.create({
  base: { color: "#111827" },
});

export function AppText({
  variant = "body",
  weight = "regular",
  color,
  style,
  className,
  children,
  ...rest
}: AppTextProps) {
  const family = fontFamilies[weight];
  const computed: TextStyle = {
    ...(variantStyles[variant] || {}),
    fontFamily: family,
    ...(color ? { color } : {}),
  };
  return (
    <RNText
      {...rest}
      className={className}
      style={[styles.base, computed, style]}
    >
      {children}
    </RNText>
  );
}

export function Title(props: Omit<AppTextProps, "variant">) {
  return <AppText {...props} variant="title" weight={props.weight ?? "bold"} />;
}

export function Subtitle(props: Omit<AppTextProps, "variant">) {
  return (
    <AppText
      {...props}
      variant="subtitle"
      weight={props.weight ?? "semibold"}
    />
  );
}

export function Body(props: Omit<AppTextProps, "variant">) {
  return (
    <AppText {...props} variant="body" weight={props.weight ?? "regular"} />
  );
}

export function Label(props: Omit<AppTextProps, "variant">) {
  return (
    <AppText {...props} variant="label" weight={props.weight ?? "medium"} />
  );
}

export function Caption(props: Omit<AppTextProps, "variant">) {
  return (
    <AppText {...props} variant="caption" weight={props.weight ?? "regular"} />
  );
}

interface AppTextInputProps extends RNTextInputProps {
  weight?: Weight;
  className?: string;
}

const inputStyles = StyleSheet.create({
  base: {
    fontSize: 16,
    lineHeight: 22,
    color: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export function AppTextInput({
  weight = "regular",
  style,
  className,
  placeholderTextColor,
  ...rest
}: AppTextInputProps) {
  const family = fontFamilies[weight];
  const computed: TextStyle = {
    fontFamily: family,
  };
  return (
    <RNTextInput
      {...rest}
      className={className}
      style={[inputStyles.base, computed, style]}
      placeholderTextColor={placeholderTextColor ?? "#9CA3AF"}
    />
  );
}
