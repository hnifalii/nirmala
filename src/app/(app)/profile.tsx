import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Title, Body, Label } from "../../components/Typography";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import BottomMascot from "../../../assets/icons/bottom-mascot.svg";

const { width } = Dimensions.get("window");

export default function ProfileScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Stres");

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {/* Header Background with Curves */}
        <View style={styles.headerContainer}>
          <Svg
            width={width}
            height={300}
            viewBox={`0 0 ${width} 300`}
            style={styles.svgBg}
          >
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#34D399" stopOpacity="1" />
                <Stop offset="1" stopColor="#10B981" stopOpacity="1" />
              </LinearGradient>
              <LinearGradient id="grad_dark" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#10594C" stopOpacity="1" />
                <Stop offset="1" stopColor="#064E3B" stopOpacity="1" />
              </LinearGradient>
            </Defs>

            <Path
              d={`M0,0 L${width},0 L${width},180 Q${width / 2},120 0,180 Z`}
              fill="#587B56"
              opacity="0.8"
            />
            <Path
              d={`M0,0 L${width},0 L${width},150 Q${width / 2},90 0,150 Z`}
              fill="#34D399"
              opacity="0.4"
            />
            <Path
              d={`M0,0 L${width},0 L${width},120 Q${width / 2},60 0,120 Z`}
              fill="url(#grad_dark)"
            />
          </Svg>

          <View style={styles.topBar}>
            <View style={{ width: 40 }} />
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => router.push("/settings")}
            >
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileAbsoluteContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: "https://i.pravatar.cc/300?img=12" }}
                style={styles.avatar}
              />
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={() => router.push("/edit-profile")}
              >
                <Feather name="edit-2" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
            <Title style={styles.name} color="#000000">
              Ahmad Raihan Khomeini{"\n"}Saputra
            </Title>
            <Body style={styles.joinedText} color="#4B5563">
              Bergabung sejak 2026
            </Body>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.section}>
          <Title style={styles.sectionTitle} color="#111827">
            Selamat Datang!
          </Title>
          <TouchableOpacity style={styles.welcomeCard}>
            <View style={{ flex: 1 }}>
              <Title style={{ fontSize: 18 }} color="#111827">
                Mulai Berhenti
              </Title>
              <Body color="#6B7280" style={{ marginTop: 4 }}>
                Pelajari teknik dasar untuk tetap bebas asap rokok.
              </Body>
            </View>
            <View style={styles.welcomeGraphic}>
              <Ionicons name="happy-outline" size={40} color="#F59E0B" />
            </View>
          </TouchableOpacity>
        </View>

        {/* My Progress Section */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Title style={styles.sectionTitle} color="#111827">
              Kemajuan Saya
            </Title>
            <View style={styles.newBadge}>
              <Label style={{ fontSize: 10 }} weight="bold" color="#1F2937">
                BARU
              </Label>
            </View>
          </View>

          <View style={styles.tabsRow}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "Stress" && styles.activeTab]}
              onPress={() => setActiveTab("Stress")}
            >
              <View style={styles.dotYellow} />
              <Label
                color={activeTab === "Stress" ? "#1F2937" : "#4B5563"}
                weight="bold"
              >
                Stres
              </Label>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "Anxiety" && styles.activeTab,
                activeTab !== "Anxiety" && styles.inactiveTab,
              ]}
              onPress={() => setActiveTab("Anxiety")}
            >
              <View style={styles.dotOrange} />
              <Label
                color={activeTab === "Anxiety" ? "#1F2937" : "#4B5563"}
                weight="bold"
              >
                Cemas
              </Label>
            </TouchableOpacity>
          </View>

          <View style={styles.trackingCard}>
            <View style={styles.linesBg}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={styles.line} />
              ))}
            </View>
            <View style={styles.trackingContent}>
              <Body
                color="#374151"
                style={{ textAlign: "center", lineHeight: 24 }}
              >
                Mulai pantau tingkat stres Anda dari waktu ke waktu dengan
                pemeriksaan bulanan.
              </Body>
            </View>
          </View>
        </View>

        {/* Check In Button */}
        <TouchableOpacity style={styles.checkInButton}>
          <Title className="text-lg" color="#fff">Mulai Konsultasi</Title>
        </TouchableOpacity>

        {/* Bottom Mascot */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <BottomMascot width={width} height={width * 0.6} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  headerContainer: {
    width: width,
    height: 300,
    alignItems: "center",
    marginBottom: 20,
  },
  svgBg: {
    position: "absolute",
    top: 0,
  },
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  settingsButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
  },
  profileAbsoluteContainer: {
    alignItems: "center",
    marginTop: 0,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#587B56",
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
    textAlign: "center",
    lineHeight: 32,
  },
  joinedText: {
    fontSize: 14,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
    zIndex: 0,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  welcomeCard: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  welcomeGraphic: {
    width: 80,
    height: 80,
    backgroundColor: "#FEF3C7",
    borderRadius: 40,
    borderBottomRightRadius: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  newBadge: {
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tabsRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    gap: 8,
  },
  activeTab: {
    backgroundColor: "#E5E7EB",
  },
  inactiveTab: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFF",
  },
  dotYellow: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F59E0B",
  },
  dotOrange: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EA580C",
  },
  trackingCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 160,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  linesBg: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 0,
    opacity: 0.4,
  },
  line: {
    height: 1,
    backgroundColor: "#F3F4F6",
    width: "100%",
  },
  trackingContent: {
    zIndex: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  checkInButton: {
    backgroundColor: "#587B56",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 40,
    marginHorizontal: 20,
    shadowColor: "#587B56",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
