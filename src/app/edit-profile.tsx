import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Title, Body, Label } from "../components/Typography";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Reusable Input Component
const ProfileInput = ({
  label,
  value,
  icon,
  isEditable = true,
}: {
  label: string;
  value: string;
  icon: any;
  isEditable?: boolean;
}) => (
  <View style={styles.inputContainer}>
    <Label style={styles.inputLabel}>{label}</Label>
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        value={value}
        editable={isEditable}
        placeholder={`Enter ${label}`}
        placeholderTextColor="#9CA3AF"
      />
      {icon}
    </View>
  </View>
);

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Title style={styles.headerTitle}>Edit Profile</Title>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View>
            <Image
              source={{ uri: "https://i.pravatar.cc/300?img=12" }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.addIconContainer}>
              <Ionicons name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <ProfileInput
            label="Full Name"
            value="Ahmad Raihan Khomeini Saputra"
            icon={<Feather name="edit-2" size={18} color="#9CA3AF" />}
          />
          <ProfileInput
            label="Nickname"
            value="Ahmad"
            icon={<Feather name="edit-2" size={18} color="#9CA3AF" />}
          />
          <ProfileInput
            label="Email"
            value="ahmadraihan607@gmail.com"
            icon={<Feather name="mail" size={18} color="#9CA3AF" />}
          />
          <ProfileInput
            label="Phone"
            value="08123456789"
            icon={<Feather name="phone" size={18} color="#9CA3AF" />}
          />
          <ProfileInput
            label="Address"
            value="Bandar Lampung, Indonesia"
            icon={
              <Ionicons name="location-outline" size={18} color="#9CA3AF" />
            }
          />
          <ProfileInput
            label="Occupation"
            value="Mahasiswa"
            icon={<Feather name="briefcase" size={18} color="#9CA3AF" />}
          />
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.discardButton}
          onPress={() => router.back()}
        >
          <Body weight="semibold" style={styles.discardText}>
            Buang
          </Body>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => router.back()}
        >
          <Body weight="semibold" style={styles.saveText}>
            Simpan
          </Body>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#10594C", // Matching the green theme text
  },
  content: {
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#10594C",
  },
  addIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#10594C",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  form: {
    paddingHorizontal: 20,
    gap: 16,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
  },
  inputLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Gilroy-Regular", // Using the font if available via textinput style inheritance issues in RN, but worth a try or rely on default
    padding: 0, // Reset default padding
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: "row",
    gap: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  discardButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  discardText: {
    color: "#000",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 50,
    backgroundColor: "#587B56",
    alignItems: "center",
    justifyContent: "center",
  },
  saveText: {
    color: "#fff",
  },
});
