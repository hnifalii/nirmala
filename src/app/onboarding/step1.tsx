import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HypochondriacIcon from "../../../assets/icons/hypochondriac.svg";

const { width } = Dimensions.get("window");

const Step1 = () => {
  const router = useRouter();
  const [cigarettesPerDay, setCigarettesPerDay] = useState("");
  const [pricePerPack, setPricePerPack] = useState("");
  // Dropdown simplified for now as a text input or mocked selector
  // In a real app we'd use a Modal or a library for Dropdown
  const [trigger, setTrigger] = useState("Setelah Makan");

  const handleNext = () => {
    router.push("/onboarding/step2");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 96,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View className="flex-row mb-8 gap-2">
          <View className="h-1 flex-1 rounded-full bg-primary" />
          <View className="h-1 flex-1 rounded-full bg-primaryLight" />
        </View>

        {/* Header */}
        <Text className="text-3xl font-bold text-black mb-3">
          Ceritakan{"\n"}Kebiasaanmu!
        </Text>
        <Text className="text-sm text-gray-500 mb-8 leading-5">
          Ceritakan kebiasaanmu kepada kami agar kami tahu bagaimana kondisimu.
        </Text>

        {/* Illustration Placeholder */}
        <View className="items-center mb-8">
          <HypochondriacIcon width={250} height={250} />
        </View>

        {/* Form Fields */}
        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            Berapa batang rokok yang bisa kamu habiskan per harinya?
          </Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 bg-white"
            placeholder="Masukkan dalam bentuk angka"
            keyboardType="numeric"
            value={cigarettesPerDay}
            onChangeText={setCigarettesPerDay}
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            Berapa harga per bungkus rokok yang biasa kamu beli?
          </Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 bg-white"
            placeholder="Rp  ..."
            keyboardType="numeric"
            value={pricePerPack}
            onChangeText={setPricePerPack}
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            Kapan biasanya bahwa keinginan untuk merokok itu muncul?
          </Text>
          {/* Mock Dropdown */}
          <View className="border border-gray-200 rounded-lg px-4 py-3 bg-white flex-row items-center justify-between">
            <Text className="text-sm text-gray-800">{trigger}</Text>
            <TouchableOpacity
              onPress={() => {
                /* Mock Dropdown logic would go here */
              }}
            >
              <Text className="text-xs text-gray-500">▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Footer with Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-5 border-t border-gray-100 flex-row justify-end">
        <TouchableOpacity
          className="bg-primary rounded-full px-8 py-4 shadow-sm active:opacity-90 item-center justify-center flex-row"
          onPress={handleNext}
        >
          <Text className="text-white text-base font-bold text-center mr-2">
            Lanjut
          </Text>
          <Text className="text-white text-base font-bold text-center">→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step1;
