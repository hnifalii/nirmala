import { Link, router } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
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

const { width } = Dimensions.get("window");

const HariIniScreen = () => {
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

            <View className="mt-5 items-center">
              <View className="flex-row items-center bg-white py-2 px-5 rounded-full space-x-2">
                <View className="flex-row space-x-2">
                  <View className="w-2 h-2 bg-[#FDE047] rotate-45" />
                  <View className="w-2 h-2 bg-[#FBA359] rotate-45" />
                </View>
                <Text className="font-bold text-sm text-dark">Hari ke-1</Text>
                <View className="flex-row space-x-2">
                  <View className="w-2 h-2 bg-[#FBA359] rotate-45" />
                  <View className="w-2 h-2 bg-[#FDE047] rotate-45" />
                </View>
              </View>
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
                  Rp 120.000
                </Text>{" "}
                dari{" "}
                <Text className="font-extrabold text-lg text-[#FFE05B] tracking-tighter">
                  Rp 750.000
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
