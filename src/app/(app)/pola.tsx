import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Title, Body, Label, Subtitle } from "../../components/Typography";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import BottomMascot from "../../../assets/icons/bottom-mascot.svg";
import TopMascot from "../../../assets/icons/maskot-main.png";
const { width } = Dimensions.get("window");

// Mock Data for Calendar
const DAYS_IN_MONTH = 30;
const START_DAY_OFFSET = 2; // Starts on Wednesday
const CALENDAR_DATA = Array.from({ length: DAYS_IN_MONTH }).map(() =>
  Math.random() > 0.3 ? (Math.random() > 0.6 ? 2 : 1) : 0,
);
const DAYS_OF_WEEK = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

// Mock Data for Bar Chart
const CHART_DATA = [
  { day: "Sen", value: 4000 },
  { day: "Sel", value: 6000 },
  { day: "Rab", value: 3000 },
  { day: "Kam", value: 8000 },
  { day: "Jum", value: 5000 },
  { day: "Sab", value: 9000 },
  { day: "Min", value: 7000 },
];
const Y_LABELS = ["10rb", "8rb", "6rb", "4rb", "2rb"];

export default function PolaScreen() {
  const renderHeatmap = () => {
    return (
      <View style={styles.heatmapContainer}>
        {/* Month Year Header */}
        <View style={styles.calendarTitleRow}>
          <Body weight="bold" style={{ fontSize: 16 }}>
            September 2026
          </Body>
        </View>

        {/* Days Header */}
        <View style={styles.calendarHeader}>
          {DAYS_OF_WEEK.map((day) => (
            <Label key={day} style={styles.calendarDayLabel} weight="bold">
              {day}
            </Label>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.heatmapGrid}>
          {/* Offset Days */}
          {Array.from({ length: START_DAY_OFFSET }).map((_, index) => (
            <View key={`offset-${index}`} style={styles.heatmapCellEmpty} />
          ))}

          {/* Actual Days */}
          {Array.from({ length: DAYS_IN_MONTH }).map((_, index) => {
            const value = CALENDAR_DATA[index];
            let backgroundColor = "#F3F4F6"; // Default grey
            let textColor = "#6B7280";

            if (value === 1) {
              backgroundColor = "#A7F3D0"; // Light Green
              textColor = "#065F46";
            }
            if (value === 2) {
              backgroundColor = "#10B981"; // Strong Green
              textColor = "#FFFFFF";
            }

            return (
              <View
                key={index}
                style={[styles.heatmapCell, { backgroundColor }]}
              >
                <Label
                  weight="medium"
                  style={{ color: textColor, fontSize: 12 }}
                >
                  {index + 1}
                </Label>
              </View>
            );
          })}
        </View>

        <View style={styles.heatmapLegend}>
          <Label style={{ fontSize: 10, color: "#6B7280" }}>Kurang</Label>
          <View style={[styles.legendCell, { backgroundColor: "#F3F4F6" }]} />
          <View style={[styles.legendCell, { backgroundColor: "#A7F3D0" }]} />
          <View style={[styles.legendCell, { backgroundColor: "#10B981" }]} />
          <Label style={{ fontSize: 10, color: "#6B7280" }}>Lebih</Label>
        </View>
      </View>
    );
  };

  // ... renderBarChart remains the same ...
  const renderBarChart = () => {
    const maxValue = 10000;
    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Subtitle weight="bold">Rokok Dihindari</Subtitle>
          <View style={styles.periodSelector}>
            <Label style={{ fontSize: 12, marginRight: 4 }}>Minggu</Label>
            <Ionicons name="chevron-down" size={12} color="#333" />
          </View>
        </View>
        <View style={styles.chartBody}>
          {/* Y Axis Labels */}
          <View style={styles.yAxis}>
            {Y_LABELS.map((label, index) => (
              <Label key={index} style={styles.axisLabel}>
                {label}
              </Label>
            ))}
          </View>
          {/* Bars */}
          <View style={styles.barsContainer}>
            {/* Grid Lines */}
            <View style={styles.gridLines}>
              {Y_LABELS.map((_, index) => (
                <View key={index} style={styles.gridLine} />
              ))}
            </View>

            {/* Bar Items */}
            <View style={styles.barsRow}>
              {CHART_DATA.map((item, index) => (
                <View key={index} style={styles.barWrapper}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { height: `${(item.value / maxValue) * 100}%` },
                      ]}
                    />
                  </View>
                  <Label style={styles.axisLabel}>{item.day}</Label>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    );
  };

  // ... rest of component ...

  return (
    <View style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.fixedHeader}>
        <View style={styles.headerTop}>
          <Title color="#fff" style={{ fontSize: 24 }}>
            Wawasan & Pola
          </Title>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="receipt-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainStat}>
          <Label color="rgba(255,255,255,0.7)">Runtunan Saat Ini</Label>
          <Title color="#fff" style={{ fontSize: 40, marginTop: 4 }}>
            14 Hari
          </Title>
          <View style={styles.subStatRow}>
            <View style={styles.subStatBadge}>
              <Ionicons name="arrow-up-circle" size={16} color="#10B981" />
              <Label color="#fff" weight="medium" style={{ marginLeft: 4 }}>
                {" "}
                Hemat Rp 420rb
              </Label>
            </View>
            <View style={styles.subStatBadge}>
              <Ionicons name="arrow-down-circle" size={16} color="#F59E0B" />
              <Label color="#fff" weight="medium" style={{ marginLeft: 4 }}>
                {" "}
                280 Rokok
              </Label>
            </View>
          </View>
        </View>
      </View>

      {/* Scrolling Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scrollView}
      >
        {/* Rounded Content Sheet */}
        <View style={styles.contentSheet}>
          <View style={styles.dragHandle} />

          {/* Custom Bar Chart */}
          {renderBarChart()}

          {/* Consistency Heatmap */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Subtitle weight="bold">Aktivitas Konsistensi</Subtitle>
              <TouchableOpacity>
                <Label color="#10594C">Lihat Semua</Label>
              </TouchableOpacity>
            </View>
            {renderHeatmap()}
          </View>

          {/* Craving Insight */}
          <View style={styles.section}>
            <Subtitle weight="bold" style={{ marginBottom: 12 }}>
              Wawasan
            </Subtitle>
            <View style={styles.insightCard}>
              <View style={styles.insightIconBg}>
                <Ionicons name="time-outline" size={24} color="#F59E0B" />
              </View>
              <View style={{ flex: 1 }}>
                <Body weight="bold">Waktu Rawan</Body>
                <Label color="#6B7280">
                  Keinginan merokok sering muncul sekitar{" "}
                  <Body weight="bold">09:00 Pagi</Body>.
                </Label>
              </View>
            </View>

            <View style={[styles.insightCard, { marginTop: 12 }]}>
              <View
                style={[styles.insightIconBg, { backgroundColor: "#FCE7F3" }]}
              >
                <MaterialCommunityIcons
                  name="emoticon-sad-outline"
                  size={24}
                  color="#EC4899"
                />
              </View>
              <View style={{ flex: 1 }}>
                <Body weight="bold">Pemicu Utama</Body>
                <Label color="#6B7280">
                  Stres pekerjaan teridentifikasi sebagai pemicu utama.
                </Label>
              </View>
            </View>

            {/* Mascot Advice Section */}
            <View style={styles.mascotAdviceContainer}>
              <View style={styles.mascotWrapper}>
                <Image
                  source={TopMascot}
                  style={{ width: 90, height: 90 }}
                  resizeMode="contain"
                />
                <View style={styles.mascotNameBadge}>
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color="#10B981"
                    style={{ marginLeft: 2 }}
                  />
                </View>
              </View>
              <View style={styles.adviceCard}>
                <Label
                  weight="bold"
                  color="#EA580C"
                  style={{ marginBottom: 4 }}
                >
                  💡 Tip Sehat Hari Ini
                </Label>
                <Label style={{ fontSize: 13, lineHeight: 18 }} color="#065F46">
                  Tidur cukup 7–8 jam agar tubuh segar kembali.
                </Label>
              </View>
            </View>
          </View>

          {/* Bottom Mascot */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <BottomMascot width={width} height={width * 0.6} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#587B56", // Green background behind everything
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 280, // Height to accommodate content
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1, // Lower z-index
  },
  scrollView: {
    flex: 1,
    zIndex: 2, // Highlight: Higher z-index to scroll over
  },
  scrollContentContainer: {
    paddingTop: 240, // Highlight: Push content down to reveal key header parts initially
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  mainStat: {
    marginTop: 24,
  },
  subStatRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 12,
  },
  subStatBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  contentSheet: {
    backgroundColor: "#F9FAFB",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingBottom: 20,
    minHeight: Dimensions.get("window").height - 100,
    // Add shadow to separate visual layers
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  // Chart Styles
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  periodSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  chartBody: {
    flexDirection: "row",
    height: 200,
  },
  yAxis: {
    justifyContent: "space-between",
    paddingVertical: 10,
    marginRight: 10,
  },
  axisLabel: {
    fontSize: 10,
    color: "#9CA3AF",
  },
  barsContainer: {
    flex: 1,
    position: "relative",
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  gridLine: {
    height: 1,
    backgroundColor: "#F3F4F6",
    width: "100%",
  },
  barsRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  barWrapper: {
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
    gap: 8,
  },
  barTrack: {
    width: 8,
    height: "85%", // Reserve space for label
    justifyContent: "flex-end",
    backgroundColor: "transparent", // or #F3F4F6 if track needed
    borderRadius: 4,
  },
  barFill: {
    width: "100%",
    backgroundColor: "#10B981", // Green bar
    borderRadius: 4,
  },

  // Heatmap Styles (Calendar)
  heatmapContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
  },
  calendarTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  calendarDayLabel: {
    width: "13.5%", // Approx 1/7th
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
  heatmapGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribute evenly
  },
  heatmapCell: {
    width: "13.5%",
    aspectRatio: 1, // Make it square
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  heatmapCellEmpty: {
    width: "13.5%",
    aspectRatio: 1,
    marginBottom: 8,
  },
  heatmapLegend: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  legendCell: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  // Insight Styles
  insightCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  insightIconBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  mascotAdviceContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  mascotWrapper: {
    alignItems: "center",
    marginRight: 12,
  },
  mascotNameBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
    marginTop: -20,
  },
  adviceCard: {
    flex: 1,
    backgroundColor: "#ECFDF5",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
});
