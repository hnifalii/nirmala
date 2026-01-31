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
import AktivitasPath from "../../../assets/aktivitas-path.png";
import CloudIcon2 from "../../../assets/icons/material-symbols-light_cloud.svg";
import Notif from "../../../assets/icons/notif.svg";
import Sun from "../../../assets/icons/mage_sun-fill.svg";
import EmptyJar from "../../../assets/icons/Empty jar.svg";
import CekBibir from "../../../assets/icons/Cek-bibir-Illustration.svg";
import AsteriskIcon from "../../../assets/icons/lucide_asterisk.svg";
import LihatPola from "../../../assets/icons/lihat-pola-illustration.svg";
import RuangKendali from "../../../assets/icons/ruang-kendali.svg";
import { BlurredCircle } from "../../components/BlurredCircle";
import { AppText } from "../../components/Typography";
import { useState } from "react";

const { width } = Dimensions.get("window");

const HariIniScreen = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  return (
    <LinearGradient
      colors={["#728C69", "#FFE05B", "#728C69"]}
      locations={[0, 0.7, 0.9]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 0 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View className="px-5 pt-2.5 pb-5">
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-14 h-14 rounded-full bg-[#E3EAD3] justify-center items-center mr-2.5">
                  <Feather name="user" size={28} color="#587B56" />
                </View>
                <View>
                  <AppText weight="bold" className="text-xl text-white">
                    Alvin
                  </AppText>
                  <AppText weight="medium" className="text-sm text-[#E3EAD3]">
                    Profil saya
                  </AppText>
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
              <AppText
                weight="bold"
                className="text-3xl text-white text-center"
              >
                Hai Alvin, semoga harimu berjalan dengan lancar
              </AppText>
            </View>

            <View className="mt-5 items-center">
              {hasCheckedIn ? (
                <View className="flex-row items-center bg-white py-2 px-5 rounded-full space-x-2">
                  <View className="flex-row space-x-2">
                    <View className="w-2 h-2 bg-[#FDE047] rotate-45" />
                    <View className="w-2 h-2 bg-[#FBA359] rotate-45" />
                  </View>
                  <AppText weight="bold" className="text-sm text-dark">
                    Hari ke-1
                  </AppText>
                  <View className="flex-row space-x-2">
                    <View className="w-2 h-2 bg-[#FBA359] rotate-45" />
                    <View className="w-2 h-2 bg-[#FDE047] rotate-45" />
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setHasCheckedIn(true)}
                  className="relative p-1 rounded-full border border-[#fde26e]"
                >
                  <View className="w-3.5 h-3.5 rounded-full bg-[#FF9A6C] absolute z-10 top-0 left-0"></View>
                  <View className="bg-[#fde26e] py-2.5 px-6 rounded-full space-x-1 flex flex-row items-center">
                    <MaterialCommunityIcons
                      name="pencil"
                      size={15}
                      color="#363B43"
                    />
                    <AppText weight="bold" className="text-base text-dark">
                      Isi Catatan
                    </AppText>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Main Content Container */}
          <View className="relative flex-1 bg-[#FCFCFC] rounded-t-[30px] mt-5 px-5 pt-7 pb-40 min-h-[600px]">
            <BlurredCircle
              className="absolute bottom-10 -left-20 w-60 h-60"
              color="#728C69"
            />
            <BlurredCircle
              className="absolute bottom-10 -right-20 w-60 h-60"
              color="#728C69"
            />

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
                  <View className="absolute">
                    <MaterialCommunityIcons
                      name="gift"
                      size={32}
                      color="#ACACAC"
                    />
                  </View>
                </View>
              </View>

              <AppText className="text-[#004CC7] text-xl mb-4">
                <AppText
                  weight="bold"
                  className="text-xl text-[#004CC7] tracking-tighter"
                >
                  Rp0
                </AppText>{" "}
                dari{" "}
                <AppText
                  weight="bold"
                  className="text-xl text-[#FFE05B] tracking-tighter"
                >
                  Rp750.000
                </AppText>
              </AppText>

              <TouchableOpacity className="bg-white py-2.5 px-6 rounded-[20px]">
                <AppText weight="bold" className="text-sm text-dark">
                  Lihat Detail
                </AppText>
              </TouchableOpacity>
            </LinearGradient>

            {/* Quick Access Grid */}
            <View className="flex-col space-y-2 mb-7">
              {/* Cek Bibir Card */}
              <TouchableOpacity
                onPress={() => router.push("/lipscan")}
                className="flex-1 h-[80px] rounded-[20px] relative overflow-hidden bg-[#FF9A6C] justify-center"
              >
                <View className="flex-1 flex-row items-center justify-between px-5">
                  <AppText weight="bold" className="text-white text-lg">
                    Cek Kondisi Bibir
                  </AppText>
                  <CekBibir
                    width={60}
                    height={60}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
              </TouchableOpacity>

              {/* Lihat Pola Card */}
              <TouchableOpacity
                onPress={() => router.push("/pola")}
                className="flex-1 h-[80px] rounded-[20px] relative overflow-hidden bg-[#64748B] justify-center"
              >
                <View className="flex-1 flex-row items-center justify-between px-5">
                  <AppText weight="bold" className="text-white text-lg">
                    Lihat Pola
                  </AppText>
                  <LihatPola
                    width={60}
                    height={60}
                    color="rgba(255,255,255,0.4)"
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Activity Path Section */}
            <View className="mb-5">
              <View className="bg-sage self-start py-3 pr-8 pl-6 -ml-5 rounded-r-full mb-6 shadow-sm">
                <AppText weight="bold" className="text-white text-lg">
                  Aktivitas Hari Ini
                </AppText>
              </View>

              <AppText weight="medium" className="text-base text-gray-400 mb-6">
                Latihan singkat untuk membantu mengelola dorongan hari ini
              </AppText>

              {/* Path Container */}
              <View className="items-center justify-center relative min-h-[500px]">
                {/* Background Path */}
                <Image
                  source={AktivitasPath}
                  style={{
                    width: width - 40, // consistent with padding
                    height: 500,
                    resizeMode: "contain",
                    position: "absolute",
                    top: 0,
                  }}
                />

                {/* Node 1: Active (Ruang Kendali) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="absolute top-[135px] right-[60px] w-24 h-24 rounded-full overflow-hidden justify-center items-center shadow-lg border-[3px] border-white z-20"
                  onPress={() => {
                    router.push("/activities/ruang-kendali");
                  }}
                >
                  <RuangKendali className="w-fit h-fit" />
                </TouchableOpacity>

                {/* Node 2: Locked */}
                {/* Node 2: Active (Pasang Gambar) */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  className="absolute top-[235px] left-[60px] w-24 h-24 rounded-full overflow-hidden justify-center items-center border-[3px] border-white z-10 bg-[#FFDDC1] shadow-lg"
                  onPress={() =>
                    router.push("/activities/detail-pasang-gambar")
                  }
                >
                  <MaterialCommunityIcons
                    name="image-filter-frames"
                    size={40}
                    color="#B46C00"
                  />
                </TouchableOpacity>

                {/* Node 3: Locked */}
                <View className="absolute top-[370px] right-[60px] w-24 h-24 rounded-full bg-[#E2E8F0] justify-center items-center border-[3px] border-white z-10">
                  <MaterialCommunityIcons
                    name="lock"
                    size={24}
                    color="#94A3B8"
                  />
                  <View className="absolute -bottom-6">
                    <AppText
                      weight="medium"
                      className="text-[10px] text-gray-400 text-center"
                    >
                      Terkunci
                    </AppText>
                  </View>
                </View>
              </View>
            </View>

            {/* Footer Quote */}
            <View className="items-center py-7 gap-2.5">
              <AsteriskIcon width={40} height={40} color="#728C69" />
              <AppText weight="bold" className="text-sm text-dark text-center">
                Satu aktivitas per hari sudah berarti.
              </AppText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HariIniScreen;
