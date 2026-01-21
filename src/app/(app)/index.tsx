import { useState } from "react";
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
import { AppText } from "../../components/Typography";
import { ActivityModal } from "../../components/ActivityModal";
import { ACTIVITIES } from "../../constants/activities";

// Assets
import WhiteStarIcon from "../../../assets/icons/whitestar.svg";
import CloudIcon1 from "../../../assets/icons/noto-v1_cloud.svg";
import CloudIcon2 from "../../../assets/icons/material-symbols-light_cloud.svg";
import CelenganIcon from "../../../assets/icons/bottom-celengan.svg";
import Notif from "../../../assets/icons/notif.svg";
import Sun from "../../../assets/icons/mage_sun-fill.svg";

const { width } = Dimensions.get("window");

const HariIniScreen = () => {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const jedaDoronganActivity = ACTIVITIES[0]; // "Ruang Kendali"

  return (
    <LinearGradient
      colors={["#587B56", "#8FA98D", "#FDFDF8"]}
      locations={[0, 0.4, 0.8]}
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
                  <AppText weight="bold" className="text-base text-white">
                    Alvin
                  </AppText>
                  <AppText weight="regular" className="text-xs text-[#E3EAD3]">
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
                className="text-xl text-white text-center leading-7"
              >
                Hai Alvin, semoga harimu berjalan dengan lancar
              </AppText>
            </View>

            <View className="mt-5 items-center">
              <View className="flex-row items-center bg-white py-2 px-5 rounded-full gap-2.5">
                <WhiteStarIcon width={12} height={12} color="#FBA359" />
                <AppText weight="bold" className="text-sm text-dark">
                  Hari ke-1
                </AppText>
                <WhiteStarIcon width={12} height={12} color="#FBA359" />
              </View>
            </View>
          </View>

          {/* Main Content Container */}
          <View className="flex-1 bg-[#FCFCFC] rounded-t-[30px] mt-5 px-5 pt-7 min-h-[600px]">
            {/* Main Card (Celengan Target) */}
            <LinearGradient
              colors={["#408EFF", "#78B2FF", "#AACCFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-[20px] p-5 items-center mb-5 min-h-[280px] justify-between relative"
            >
              {/* Decorative Clouds */}
              <View className="absolute top-5 right-7 opacity-80">
                <CloudIcon2 width={50} height={30} color="white" />
              </View>
              <View className="absolute top-20 left-5 opacity-80">
                <CloudIcon2 width={40} height={25} color="white" />
              </View>

              <View className="mt-5 mb-2.5">
                {/* Illustration Placeholder */}
                <View className="w-[100px] h-[120px] bg-white/20 rounded-[15px] justify-center items-center border-2 border-white/40">
                  <CelenganIcon width={60} height={60} color="#E0E0E0" />
                </View>
              </View>

              <AppText weight="regular" className="text-white text-sm mb-4">
                <AppText weight="bold" className="text-lg">
                  Rp 120.000
                </AppText>{" "}
                dari{" "}
                <AppText weight="bold" className="text-[#FFD700]">
                  Rp 750.000
                </AppText>
              </AppText>

              <TouchableOpacity className="bg-white py-2.5 px-6 rounded-[20px]">
                <AppText weight="bold" className="text-xs text-dark">
                  Lihat Detail
                </AppText>
              </TouchableOpacity>
            </LinearGradient>

            {/* Quick Access Grid */}
            <View className="flex-row justify-between mb-7">
              {/* Cek Bibir Card */}
              <TouchableOpacity className="flex-1 h-[140px] rounded-[20px] overflow-hidden mr-2.5">
                <LinearGradient
                  colors={["#FF7E5F", "#FEB47B"]}
                  className="flex-1 p-4 justify-between"
                >
                  <View>
                    <AppText weight="bold" className="text-white text-sm mb-1">
                      Cek Kondisi Bibir
                    </AppText>
                    <AppText
                      weight="regular"
                      className="text-white/80 text-[10px]"
                    >
                      Sekilas kondisi fisik
                    </AppText>
                  </View>
                  <View className="flex-row justify-between items-end">
                    <View className="bg-white py-1.5 px-4 rounded-[15px] flex-row items-center gap-1">
                      <MaterialCommunityIcons
                        name="fit-to-screen-outline"
                        size={14}
                        color="black"
                      />
                      <AppText weight="bold" className="text-[10px] text-dark">
                        Cek
                      </AppText>
                    </View>
                    <Feather
                      name="search"
                      size={40}
                      color="rgba(255,255,255,0.4)"
                      style={{ transform: [{ rotate: "-10deg" }] }}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Lihat Pola Card */}
              <TouchableOpacity className="flex-1 h-[140px] rounded-[20px] overflow-hidden ml-2.5">
                <LinearGradient
                  colors={["#C792EA", "#E1BEE7"]}
                  className="flex-1 p-4 justify-between"
                >
                  <View>
                    <AppText weight="bold" className="text-white text-sm mb-1">
                      Lihat Pola
                    </AppText>
                    <AppText
                      weight="regular"
                      className="text-white/80 text-[10px]"
                    >
                      Ringkasan kebiasaanmu
                    </AppText>
                  </View>
                  <View className="flex-row justify-between items-end">
                    <View className="bg-white py-1.5 px-4 rounded-[15px] flex-row items-center gap-1">
                      <AppText weight="bold" className="text-[10px] text-dark">
                        Lihat
                      </AppText>
                      <Feather name="chevron-right" size={14} color="black" />
                    </View>
                    <MaterialCommunityIcons
                      name="wave"
                      size={40}
                      color="rgba(255,255,255,0.4)"
                      style={{ transform: [{ rotate: "-10deg" }] }}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Activity Timeline */}
            <View className="mb-5">
              <View className="bg-sage self-start py-2 px-5 rounded-[20px] mb-5">
                <AppText weight="bold" className="text-white text-sm">
                  Aktivitas Hari Ini
                </AppText>
              </View>

              {/* Vertical Line Container */}
              <View className="flex-row">
                <View className="items-center mr-4 w-5">
                  <View className="w-3 h-3 rounded-full border-2 border-sage bg-white mb-1" />
                  {/* Dashed line simulation using border-l-2 and style for dashed since NativeWind/Tailwind doesn't straightforwardly support vertical dashed lines on empty views perfectly without hacking, using borderStyle prop is safer */}
                  <View className="flex-1 w-[2px] bg-transparent border-l-2 border-dashed border-[#ddd]" />
                </View>

                <View className="flex-1 pb-5">
                  <View className="bg-white rounded-[15px] p-4 flex-row shadow-sm elevation-sm">
                    <View className="flex-1">
                      <AppText weight="bold" className="text-sm text-dark mb-1">
                        {jedaDoronganActivity.title}
                      </AppText>
                      <View className="flex-row items-center gap-1 mb-1">
                        <Feather name="check-circle" size={12} color="#999" />
                        <AppText
                          weight="regular"
                          className="text-[10px] text-[#999]"
                        >
                          {jedaDoronganActivity.duration}
                        </AppText>
                      </View>
                      <AppText
                        weight="regular"
                        className="text-[10px] text-[#666] mb-2.5"
                      >
                        {jedaDoronganActivity.description}
                      </AppText>

                      <TouchableOpacity
                        className="flex-row items-center"
                        onPress={() => setShowActivityModal(true)}
                      >
                        <AppText weight="bold" className="text-xs text-sage">
                          Lihat
                        </AppText>
                        <Feather
                          name="chevron-right"
                          size={14}
                          color="#728C69"
                        />
                      </TouchableOpacity>
                    </View>
                    {/* Illustration for Activity */}
                    <View className="w-20 h-20 rounded-[10px] overflow-hidden ml-2.5">
                      <LinearGradient
                        colors={[
                          jedaDoronganActivity.color,
                          jedaDoronganActivity.color,
                        ]}
                        className="flex-1"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Footer Quote */}
            <View className="items-center py-7 gap-2.5">
              <Feather name="asterisk" size={24} color="#728C69" />
              <AppText weight="bold" className="text-sm text-dark text-center">
                Satu aktivitas per hari sudah berarti.
              </AppText>
            </View>
          </View>

          <ActivityModal
            visible={showActivityModal}
            activity={jedaDoronganActivity}
            onClose={() => setShowActivityModal(false)}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HariIniScreen;
