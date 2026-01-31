import { useCallback, useState } from "react";
import { View, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppText } from "../../components/Typography";
import CloudIcon from "../../../assets/icons/material-symbols-light_cloud.svg";
import JarIcon from "../../../assets/icons/jar.svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { DailyLogService } from "../../services/DailyLogService";
import { Target } from "../../types/target";
import { LogData } from "../../types/dailyLog";

const { width } = Dimensions.get("window");
const DAILY_LOG_SERVICE = new DailyLogService();

const formatCurrency = (amount: number) => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};

const getEntryIcon = (status: string) => {
  switch (status) {
    case "success":
      return { bg: "#4CAF50", icon: "emoticon-happy-outline" };
    case "partial_success":
      return { bg: "#FFA726", icon: "emoticon-neutral-outline" };
    case "relapse":
      return { bg: "#FF7043", icon: "emoticon-sad-outline" };
    default:
      return { bg: "#9E9E9E", icon: "help-circle-outline" };
  }
};

const formatDate = (dateString: string) => {
  // Assuming YYYY-MM-DD
  const parts = dateString.split("-");
  if (parts.length === 3) {
    return parts[2]; // Return Day
  }
  return dateString;
};

export default function CelenganScreen() {
  const [target, setTarget] = useState<Target | null>(null);
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          // Fetch Target
          try {
            const targetData = await DAILY_LOG_SERVICE.getTargetData();
            setTarget(targetData);
          } catch (e) {
            console.log("No target data found or error", e);
          }

          // Fetch Logs
          const logsData = await DAILY_LOG_SERVICE.getUserDailyLogs();
          // logsData is QueryDocumentSnapshot[], need to map to data
          const formattedLogs = logsData.map(doc => doc.data() as LogData);
          setLogs(formattedLogs);

        } catch (error) {
          console.error("Error fetching data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [])
  );

  const hasEntries = logs.length > 0;

  return (
    <View className="flex-1 bg-[#FCFCFC]">
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 180 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Blue Header Card */}
          <LinearGradient
            colors={["#408EFF", "#78B2FF", "#AACCFF"]}
            locations={[0, 0.5, 1]}
            className="rounded-b-[30px] pb-7 px-5 pt-5"
          >
            {/* Decorative Clouds */}
            <View className="absolute top-8 left-8 opacity-80">
              <CloudIcon width={40} height={25} color="white" />
            </View>
            <View className="absolute top-12 right-12 opacity-80">
              <CloudIcon width={50} height={30} color="white" />
            </View>

            <AppText
              weight="regular"
              className="text-white text-sm text-center mb-5"
            >
              Dari rokok yang tidak dibeli
            </AppText>

            {/* Celengan Illustration */}
            <View className="items-center mb-5">
              <View className="w-40 h-40 justify-center items-center relative overflow-hidden">
                <JarIcon
                  width={140}
                  height={140}
                  color="#E0E0E0"
                />
              </View>
            </View>

            {/* Goal Info */}
            <View className="items-center">
              <AppText weight="bold" className="text-white text-2xl mb-2">
                {target?.name || "Belum ada tujuan"}
              </AppText>
              <AppText weight="regular" className="text-white/90 text-base">
                <AppText weight="bold" className="text-lg">
                  {formatCurrency(target?.current || 0)}
                </AppText>{" "}
                dari{" "}
                <AppText weight="bold" className="text-yellow-300">
                  {formatCurrency(target?.target || 0)}
                </AppText>
              </AppText>
            </View>
          </LinearGradient>

          {/* Main Content Container */}
          <View className="flex-1 px-5 pt-7 min-h-[400px]">
            {/* Section Title with Dividers */}
            <View className="flex-row items-center justify-center mb-5">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <AppText weight="regular" className="text-gray-400 text-xs px-4">
                Catatan Celengan
              </AppText>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {hasEntries ? (
              <>
                {/* Entries List */}
                <View className="mb-5">
                  {logs.map((entry, index) => {
                    const iconData = getEntryIcon(entry.status);
                    return (
                      <View
                        key={index}
                        className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow-sm"
                      >
                        {/* Icon */}
                        <View
                          className="w-12 h-12 rounded-xl justify-center items-center mr-3"
                          style={{ backgroundColor: iconData.bg }}
                        >
                          <MaterialCommunityIcons
                            name={iconData.icon as any}
                            size={24}
                            color="white"
                          />
                        </View>

                        {/* Content */}
                        <View className="flex-1">
                          <AppText
                            weight="bold"
                            className="text-dark text-sm mb-1"
                          >
                            {entry.notes}
                          </AppText>
                          <AppText
                            weight="regular"
                            className={`text-xs ${
                              entry.moneySaved > 0
                                ? "text-green-600"
                                : "text-gray-400"
                            }`}
                          >
                            {entry.moneySaved > 0 ? "+" : ""}
                            {formatCurrency(entry.moneySaved)}
                          </AppText>
                        </View>

                        {/* Date */}
                        <AppText
                          weight="regular"
                          className="text-gray-400 text-xs"
                        >
                          {formatDate(entry.date)}
                        </AppText>
                      </View>
                    );
                  })}
                </View>

                {/* Footer Message */}
                <View className="bg-[#E3EAD3] rounded-2xl p-5 items-center mt-3">
                  <View className="mb-2">
                    <AppText weight="bold" className="text-sage text-3xl">
                      ✱
                    </AppText>
                  </View>
                  <AppText
                    weight="bold"
                    className="text-sage text-sm text-center"
                  >
                    Setiap hari tanpa rokok memberi ruang lebih untuk tujuanmu.
                  </AppText>
                </View>
              </>
            ) : (
              <>
                {/* Empty State */}
                <View className="items-center py-10">
                  {/* Empty illustration */}
                  <View className="w-32 h-32 mb-6">
                    <View className="absolute top-8 left-8 w-16 h-16 rounded-full bg-blue-200 opacity-50" />
                    <View className="absolute top-4 left-4 w-24 h-24 bg-gray-200 rounded-2xl" />
                    <View className="absolute top-0 left-12 w-12 h-16 bg-gray-300 rounded-t-2xl opacity-70">
                      <View className="absolute top-2 left-3 w-6 h-8 bg-white rounded-full opacity-60" />
                    </View>
                  </View>

                  <AppText weight="bold" className="text-dark text-lg mb-2">
                    Belum ada catatan
                  </AppText>
                  <AppText
                    weight="regular"
                    className="text-gray-500 text-xs text-center mb-6 px-8"
                  >
                    Catatan akan terisi saat kamu mengumpul atau meleburkan
                    gambar rokok.
                  </AppText>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
