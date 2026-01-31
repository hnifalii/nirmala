import { Link, router, useFocusEffect } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CloudIcon2 from "../../../assets/icons/material-symbols-light_cloud.svg";
import CelenganIcon from "../../../assets/icons/bottom-celengan.svg";
import Notif from "../../../assets/icons/notif.svg";
import Sun from "../../../assets/icons/mage_sun-fill.svg";
import EmptyJar from "../../../assets/icons/Empty jar.svg";
import CekBibir from "../../../assets/icons/Cek-bibir-Illustration.svg";
import ScanIcon from "../../../assets/icons/tabler_line-scan.svg";
import WaveIcon from "../../../assets/icons/mingcute_wave-fill.svg";
import AsteriskIcon from "../../../assets/icons/lucide_asterisk.svg";
import JedaDorongan from "../../../assets/icons/jeda-dorongan.svg";
import EditIcon from "../../../assets/icons/tabler_edit.svg";
import { DailyLogService } from "../../services/DailyLogService";
import { Target } from "../../types/target";

const { width } = Dimensions.get("window");
const DAILY_LOG_SERVICE = new DailyLogService();

const HariIniScreen = () => {
    const [hasCheckedIn, setHasCheckedIn] = useState(false);
    const [streak, setStreak] = useState(1);
    const [target, setTarget] = useState<Target | null>(null);

    useFocusEffect(
        useCallback(() => {
            const checkStatus = async () => {
                try {
                    const status = await DAILY_LOG_SERVICE.hasLoggedToday();
                    const currentStreak = await DAILY_LOG_SERVICE.getUserStreak();
                    const target = await DAILY_LOG_SERVICE.getTargetData();
                    
                    setHasCheckedIn(status);
                    
                    // Logic:
                    // If not checked in: Display current streak (which is completed streak).
                    // Example: DB has 5. Button says "Hari ke-5". (Or maybe +1?)
                    // User said: "diambil dari collection users.stats.currentStreak"
                    // And "ketika check in current streak tersebut ditambah satu".
                    // This implies the standard display IS the current streak.
                    // If I have 5, and I check in, it becomes 6.
                    // However, for a "Daily Check-in" button, usually it says "Day 6" if you have done 5.
                    // But I will stick to what the user said: "Hari ke-{streak}".
                    // If streak is 0, display 1?
                    // Let's assume minimum 1 for display "Hari ke-1".
                    
                    // Wait, if I have done 5 days.
                    // If I display "Hari ke-5", user thinks "I am doing day 5 again".
                    // But if I display "Hari ke-6", it matches "Progress".
                    // If user request "diambil dari ... currentStreak", maybe currentStreak INCLUDES today if checked in?
                    // No, increments on success.
                    
                    // Let's optimize for UX + compliance:
                    // If hasCheckedIn: Display currentStreak (e.g. 6).
                    // If !hasCheckedIn: Display currentStreak + 1 (e.g. 6).
                    // Because "Hari ke-6" is what I am doing today.
                    // This satisfies "ketika check in... ditambah satu". 
                    // (Old value + 1 = New value).
                    // But user said "diambil dari ... currentStreak". 
                    // I will display logic: currentStreak + (hasCheckedIn ? 0 : 1).
                    // wait, if I haven't checked int, streak is 5.
                    // I show "Hari ke-6".
                    // User clicks. Success. Streak becomes 6.
                    // I show "Hari ke-6".
                    // The number doesn't change? That contradicts "ditambah satu".
                    
                    // Alternative:
                    // DB Streak = 5.
                    // !CheckIn: Show 5. ("Hari ke-5"). 
                    // CheckIn: Streak Becomes 6. Show 6 ("Hari ke-6").
                    // This satisfies "ditambah satu".
                    // So I will just use the value from DB directly.
                    // If DB is 0, show 1? "Hari ke-1".
                    // If DB is 5, show 5.
                    
                    setStreak(currentStreak === 0 ? 1 : currentStreak);
                    setTarget(target);

                } catch (error) {
                    console.error("Failed to check daily log status", error);
                }
            };
            checkStatus();
        }, [])
    );

    const handleCheckInPress = () => {
        if (hasCheckedIn) {
            Alert.alert("Sudah Check-in", "Kamu sudah melakukan check-in hari ini. Kembali lagi besok ya!");
            return;
        }
        router.push("/check-in");
    };

  return (
    <LinearGradient
      colors={["#728C69", "#FFE05B", "#728C69"]}
      locations={[0, 0.7, 0.9]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="px-5 pt-2.5 pb-5">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-[#E3EAD3] justify-center items-center mr-2.5">
                  <Feather name="user" size={24} color="#587B56" />
                </View>
                <View>
                  <Text className="font-bold text-base text-white">Alvin</Text>
                  <Text className="font-regular text-xs text-[#E3EAD3]">
                    Profil saya
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
                <Notif width={20} height={20} />
              </TouchableOpacity>
            </View>

            <View className="mt-7 items-center">
              <Sun
                width={24}
                height={24}
                color="#FDB813"
                style={{ marginBottom: 10, alignSelf: "center" }}
              />
              <Text className="font-bold text-xl text-white text-center leading-7">
                Hai Alvin, semoga harimu berjalan dengan lancar
              </Text>
            </View>

            {/* Tombol Check-in Harian */}
            <View className="mt-5 items-center">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleCheckInPress} 
                className={`flex-row items-center py-2 px-5 rounded-full space-x-2 ${hasCheckedIn ? 'bg-white/80' : 'bg-white'}`}
              >
                <View className="flex-row space-x-2">
                  <View className="w-2 h-2 bg-[#FDE047] rotate-45" />
                  <View className="w-2 h-2 bg-[#FBA359] rotate-45" />
                </View>
                
                {/* Text and Icon Container */}
                <View className="flex-row items-center space-x-2">
                    <Text className="font-bold text-sm text-dark">
                        Hari ke-{streak}
                    </Text>
                    {!hasCheckedIn && (
                        <EditIcon width={16} height={16} color="black" />
                    )}
                </View>

                <View className="flex-row space-x-2">
                  <View className="w-2 h-2 bg-[#FBA359] rotate-45" />
                  <View className="w-2 h-2 bg-[#FDE047] rotate-45" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content Container */}
          <View className="flex-1 bg-[#FCFCFC] rounded-t-[30px] mt-5 px-5 pt-7 min-h-[600px]">
            {/* Main Card (Celengan Target) */}
            <LinearGradient
              colors={["#2576FF", "#70ADFF", "#BCE4FE"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="rounded-[20px] p-5 items-center mb-5 min-h-[350px] justify-between relative"
            >
              {/* Decorative Clouds */}
              <View className="absolute top-5 right-7 opacity-80">
                <CloudIcon2 width={50} height={30} color="white" />
              </View>
              <View className="absolute top-20 left-5 opacity-80">
                <CloudIcon2 width={40} height={25} color="white" />
              </View>

              <View className="mt-14 mb-2.5">
                {/* Illustration Placeholder */}
                <View className="items-center justify-center relative">
                  <EmptyJar width={110} height={130} />
                  <View className="absolute top-1/3">
                    <CelenganIcon width={40} height={40} color="#B5B5B5" />
                  </View>
                </View>
              </View>

              <Text className="font-regular text-[#004CC7] text-lg mb-4">
                <Text className="font-extrabold text-lg text-[#004CC7] tracking-tighter">
                  Rp {target?.current.toLocaleString('id-ID')}
                </Text>{" "}
                dari{" "}
                <Text className="font-extrabold text-lg text-[#FFE05B] tracking-tighter">
                  Rp {target?.target.toLocaleString('id-ID')}
                </Text>
              </Text>

              <TouchableOpacity className="bg-white py-2.5 px-6 rounded-[20px]">
                <Text className="font-bold text-sm text-dark">
                  Lihat Detail
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            {/* Quick Access Grid */}
            <View className="flex-row gap-2 mb-7">
              {/* Cek Bibir Card */}
              <TouchableOpacity className="flex-1 h-[140px] rounded-[20px] relative overflow-hidden bg-[#FF9A6C]">
                <View className="flex-1 p-4 justify-between">
                  <View>
                    <Text className="font-bold text-white text-lg mb-1">
                      Cek Kondisi Bibir
                    </Text>
                    <Text className="font-regular text-white/80 text-[10px]">
                      Sekilas kondisi fisik
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-end">
                    <View className="bg-white py-1.5 px-4 rounded-[15px] flex-row items-center gap-1">
                      <ScanIcon width={14} height={14} color="black" />
                      <Text className="font-bold text-[10px] text-dark">
                        Cek
                      </Text>
                    </View>
                  </View>
                  {/* Decorative Illustration */}
                  <View className="absolute -bottom-2 -right-2">
                    <CekBibir
                      width={80}
                      height={80}
                      color="rgba(255,255,255,0.4)"
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {/* Lihat Pola Card */}
              <TouchableOpacity className="flex-1 h-[140px] rounded-[20px] relative overflow-hidden bg-[#CA98ED]">
                <View className="flex-1 p-4 justify-between">
                  <View>
                    <Text className="font-bold text-white text-lg mb-1">
                      Lihat Pola
                    </Text>
                    <Text className="font-regular text-white/80 text-[10px]">
                      Ringkasan kebiasaanmu
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-end">
                    <View className="bg-white py-1.5 px-4 rounded-[15px] flex-row items-center gap-1">
                      <Text className="font-bold text-[10px] text-dark">
                        Lihat
                      </Text>
                      <Feather name="chevron-right" size={14} color="black" />
                    </View>
                    <View className="absolute -bottom-4 -right-4">
                      <WaveIcon
                        width={80}
                        height={80}
                        color="rgba(255,255,255,0.4)"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Activity Timeline */}
            <View className="mb-5">
              <View className="bg-sage self-start py-3 pr-8 pl-6 -ml-5 rounded-r-full mb-6 shadow-sm">
                <Text className="font-bold text-white text-lg">
                  Aktivitas Hari Ini
                </Text>
              </View>

              {/* Vertical Line Container */}
              <View className="flex-row">
                <View className="items-center mr-4 ml-1">
                  <View className="w-4 h-4 rounded-full border-[3px] border-sage bg-white z-10" />
                  {/* Dashed line simulation */}
                  <View className="flex-1 w-[2px] bg-transparent border-l-2 border-dashed border-[#E3EAD3] -mt-2" />
                </View>

                <View className="flex-1 pb-5">
                  <View className="bg-white rounded-[20px] p-4 flex-row shadow-xl elevation-sm border border-gray-50">
                    <View className="flex-1 pr-2 justify-between">
                      <View>
                        <Text className="font-bold text-lg text-dark mb-1">
                          Jeda Dorongan
                        </Text>
                        <View className="flex-row items-center gap-1.5 mb-2">
                          <MaterialCommunityIcons
                            name="timer-outline"
                            size={14}
                            color="#9CA3AF"
                          />
                          <Text className="font-medium text-xs text-gray-400">
                            2 menit
                          </Text>
                        </View>
                        <Text className="font-regular text-xs text-gray-500 mb-4 leading-5">
                          Luangkan waktu sejenak untuk...
                        </Text>
                      </View>

                      <TouchableOpacity className="flex-row items-center">
                        <Text className="font-bold text-sm text-sage mr-1">
                          Lihat
                        </Text>
                        <Feather
                          name="chevron-right"
                          size={16}
                          color="#728C69"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* Illustration for Activity */}
                    <View className="w-32 h-32 rounded-[16px] overflow-hidden ml-2 shadow-sm">
                      <JedaDorongan width={120} height={115} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Footer Quote */}
            <View className="items-center py-7 gap-2.5">
              <AsteriskIcon width={40} height={40} color="#728C69" />
              <Text className="font-bold text-sm text-dark text-center">
                Satu aktivitas per hari sudah berarti.
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HariIniScreen;
