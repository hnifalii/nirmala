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

// Assets
import WhiteStarIcon from "../../../assets/icons/whitestar.svg";
import CloudIcon1 from "../../../assets/icons/noto-v1_cloud.svg";
import CloudIcon2 from "../../../assets/icons/material-symbols-light_cloud.svg";
import CelenganIcon from "../../../assets/icons/bottom-celengan.svg"; 
import Notif from "../../../assets/icons/notif.svg";
import Sun from "../../../assets/icons/mage_sun-fill.svg"

const { width } = Dimensions.get("window");

const HariIniScreen = () => {
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
                  <Text className="font-bold text-base text-white">Alvin</Text>
                  <Text className="font-regular text-xs text-[#E3EAD3]">Profil saya</Text>
                </View>
              </View>
              <TouchableOpacity className="w-10 h-10 rounded-full bg-white justify-center items-center">
                <Notif width={20} height={20}/>
              </TouchableOpacity>
            </View>

            <View className="mt-7 items-center">
                <Sun width={24} height={24} color="#FDB813" style={{marginBottom: 10, alignSelf:'center'}} />
              <Text className="font-bold text-xl text-white text-center leading-7">
                Hai Alvin, semoga harimu berjalan dengan lancar
              </Text>
            </View>

            <View className="mt-5 items-center">
              <View className="flex-row items-center bg-white py-2 px-5 rounded-full gap-2.5">
                <WhiteStarIcon width={12} height={12} color="#FBA359" />
                <Text className="font-bold text-sm text-dark">Hari ke-1</Text>
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

              <Text className="font-regular text-white text-sm mb-4">
                <Text className="font-bold text-lg">Rp 120.000</Text> dari <Text className="font-bold text-[#FFD700]">Rp 750.000</Text>
              </Text>

              <TouchableOpacity className="bg-white py-2.5 px-6 rounded-[20px]">
                <Text className="font-bold text-xs text-dark">Lihat Detail</Text>
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
                        <Text className="font-bold text-white text-sm mb-1">Cek Kondisi Bibir</Text>
                        <Text className="font-regular text-white/80 text-[10px]">Sekilas kondisi fisik</Text>
                    </View>
                    <View className="flex-row justify-between items-end">
                        <View className="bg-white py-1.5 px-4 rounded-[15px] flex-row items-center gap-1">
                            <MaterialCommunityIcons name="fit-to-screen-outline" size={14} color="black" />
                            <Text className="font-bold text-[10px] text-dark">Cek</Text>
                        </View>
                        <Feather name="search" size={40} color="rgba(255,255,255,0.4)" style={{ transform: [{rotate: '-10deg'}]}} />
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
                        <Text className="font-bold text-white text-sm mb-1">Lihat Pola</Text>
                        <Text className="font-regular text-white/80 text-[10px]">Ringkasan kebiasaanmu</Text>
                    </View>
                    <View className="flex-row justify-between items-end">
                        <View className="bg-white py-1.5 px-4 rounded-[15px] flex-row items-center gap-1">
                             <Text className="font-bold text-[10px] text-dark">Lihat</Text>
                             <Feather name="chevron-right" size={14} color="black" />
                        </View>
                        <MaterialCommunityIcons name="wave" size={40} color="rgba(255,255,255,0.4)" style={{ transform: [{rotate: '-10deg'}]}} />
                    </View>
                 </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Activity Timeline */}
            <View className="mb-5">
                <View className="bg-sage self-start py-2 px-5 rounded-[20px] mb-5">
                    <Text className="font-bold text-white text-sm">Aktivitas Hari Ini</Text>
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
                               <Text className="font-bold text-sm text-dark mb-1">Jeda Dorongan</Text>
                               <View className="flex-row items-center gap-1 mb-1">
                                   <Feather name="check-circle" size={12} color="#999" />
                                   <Text className="font-regular text-[10px] text-[#999]">2 menit</Text>
                               </View>
                               <Text className="font-regular text-[10px] text-[#666] mb-2.5">Luangkan waktu sejenak untuk...</Text>
                               
                               <TouchableOpacity className="flex-row items-center">
                                   <Text className="font-bold text-xs text-sage">Lihat</Text>
                                   <Feather name="chevron-right" size={14} color="#728C69" />
                               </TouchableOpacity>
                           </View>
                           {/* Illustration for Activity */}
                           <View className="w-20 h-20 rounded-[10px] overflow-hidden ml-2.5">
                               <LinearGradient colors={["#4FACFE", "#00F2FE"]} className="flex-1" />
                           </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Footer Quote */}
             <View className="items-center py-7 gap-2.5">
                <Feather name="asterisk" size={24} color="#728C69" />
                <Text className="font-bold text-sm text-dark text-center">Satu aktivitas per hari sudah berarti.</Text>
             </View>

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HariIniScreen;
