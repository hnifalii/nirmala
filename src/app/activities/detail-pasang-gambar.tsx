import {
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText } from "../../components/Typography";
import HeaderGambar from "../../../assets/icons/header-gambar.svg";

const { width } = Dimensions.get("window");

export default function DetailPasangGambarScreen() {
  return (
    <View className="flex-1 bg-[#FFFCF4]">
      {/* Header Section */}
      <View className="bg-[#FFE05B] pt-12 pb-10 h-[200px] rounded-b-[40px] relative overflow-hidden">
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-6 z-10 w-10 h-10 bg-white/30 rounded-full items-center justify-center border border-white/50"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        {/* Card Illustration Mockup */}
        <View className="absolute bottom-0 right-0">
          <HeaderGambar width={width * 0.9} height={200} />
        </View>
      </View>

      {/* Content Section */}
      <View className="flex-1 px-6 pt-6">
        <View className="flex-row justify-between items-center mb-4">
          <AppText weight="bold" className="text-2xl text-[#1E293B]">
            Pasang Gambar
          </AppText>
          <MaterialCommunityIcons
            name="heart-outline"
            size={24}
            color="#64748B"
          />
        </View>

        <AppText className="text-[#64748B] text-base leading-6 mb-6">
          Mencocokkan gambar sederhana untuk{"\n"}
          mengalihkan pikiran sejenak saat{"\n"}
          dorongan muncul.
        </AppText>

        <View className="flex-row items-center gap-4 mb-4">
          <View className="flex-row items-center gap-2">
            <MaterialCommunityIcons
              name="view-dashboard-outline"
              size={18}
              color="#94A3B8"
            />
            <AppText className="text-[#94A3B8] font-medium">Alih Fokus</AppText>
          </View>
          <View className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
          <AppText className="text-[#94A3B8] font-medium">1 menit</AppText>
        </View>
      </View>

      {/* Footer / CTA Logic */}
      <View className="p-6 border-t border-gray-100">
        <TouchableOpacity
          onPress={() => router.push("/activities/pasang-gambar")}
          className="bg-[#758467] py-4 rounded-full items-center shadow-sm"
        >
          <AppText weight="bold" className="text-white text-lg">
            Mulai Aktivitas
          </AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
