import { TextStyle } from "react-native";

export const Typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  } as TextStyle,
  
  h2: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
  } as TextStyle,
  
  h3: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
  } as TextStyle,
  
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
  } as TextStyle,
  
  h5: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
  } as TextStyle,
  
  h6: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  } as TextStyle,

  // Body text
  bodyLarge: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  } as TextStyle,
  
  bodyRegular: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  } as TextStyle,
  
  bodySmall: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
  } as TextStyle,

  // Body text - Medium weight
  bodyLargeMedium: {
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
  } as TextStyle,
  
  bodyRegularMedium: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  } as TextStyle,
  
  bodySmallMedium: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
  } as TextStyle,

  // Body text - Semibold
  bodyLargeSemibold: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 24,
  } as TextStyle,
  
  bodyRegularSemibold: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  } as TextStyle,
  
  bodySmallSemibold: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 18,
  } as TextStyle,

  // Caption & Labels
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  } as TextStyle,
  
  captionMedium: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  } as TextStyle,
  
  label: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
  } as TextStyle,
  
  labelSmall: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  } as TextStyle,

  // Special
  overline: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 16,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  } as TextStyle,
};

export type TypographyKey = keyof typeof Typography;
