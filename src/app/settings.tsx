import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Title, Body, Label } from "../components/Typography";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();

  const SETTINGS_ITEMS = [
    { label: "Language", icon: "language", type: "MaterialIcons" },
    { label: "Downloads", icon: "download-outline", type: "Ionicons" },
    { label: "Google Fit", icon: "fitness-outline", type: "Ionicons" },
    { label: "Accessibility", icon: "accessibility-outline", type: "Ionicons" },
    { label: "Support", icon: "help-circle-outline", type: "Ionicons" },
    {
      label: "Terms & Conditions",
      icon: "document-text-outline",
      type: "Ionicons",
    },
    {
      label: "Privacy Policy",
      icon: "shield-checkmark-outline",
      type: "Ionicons",
    },
    { label: "My Data", icon: "server-outline", type: "Ionicons" },
  ];

  const renderIcon = (icon: string, type: string) => {
    if (type === "MaterialIcons") {
      return <MaterialIcons name={icon as any} size={24} color="#111827" />;
    }
    return <Ionicons name={icon as any} size={24} color="#111827" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Title style={styles.headerTitle} color="#111827">
          Settings
        </Title>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {SETTINGS_ITEMS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                {/* Note: Reference images don't show icons, just text. 
                            But usually settings have icons. 
                            User said "mirip seperti yang saya kirimkan".
                            The image shows ONLY text on the left? 
                            Actually looking at the image provided (uploaded_image_1769008561932.jpg)
                            It DOES NOT have icons on the left. Just text.
                            So I will remove icons to match "persis".
                        */}
                <Body style={styles.menuLabel} color="#111827" weight="medium">
                  {item.label}
                </Body>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Label style={styles.footerText} color="#6B7280">
            Logged in as
          </Label>
          <Label style={styles.footerText} color="#6B7280">
            ahmadraihan607@gmail.com
          </Label>

          <View style={{ height: 16 }} />

          <Label style={styles.versionText} color="#9CA3AF">
            Version 4.291.1 (438556) + 7.105.1
          </Label>

          <View style={{ height: 32 }} />

          <TouchableOpacity style={styles.logoutButton}>
            <Title color="#fff" style={{ fontSize: 16 }}>
              Log Out
            </Title>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  menuContainer: {
    paddingTop: 10,
  },
  menuItem: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // Separator lines
    justifyContent: "center",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "600", // Boldish text like in the image
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    marginBottom: 2,
  },
  versionText: {
    fontSize: 12,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#587B56", // Bright Blue
    borderRadius: 30, // Rounded pill shape
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
