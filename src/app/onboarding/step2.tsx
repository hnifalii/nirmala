import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FollowTheLeaderIcon from "../../../assets/icons/follow_the_leader.svg";

const { width } = Dimensions.get("window");

const Step2 = () => {
  const router = useRouter();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [commitment, setCommitment] = useState("");

  const handleFinish = () => {
    // In a real app we would save the data here
    router.replace("/(app)");
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
          <View className="h-1 flex-1 rounded-full bg-primary" />
        </View>

        {/* Header */}
        <Text className="text-3xl font-bold text-black mb-3">
          Motivasi{"\n"}Terbesarmu?
        </Text>
        <Text className="text-sm text-gray-500 mb-8 leading-5">
          Apa yang akan kamu beli jika berhasil berhenti?
        </Text>

        {/* Illustration Placeholder */}
        <View className="items-center mb-8">
          <FollowTheLeaderIcon width={250} height={200} />
        </View>

        {/* Form Fields */}
        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            Apa nama barang yang ingin kamu beli?
          </Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 bg-white"
            placeholder="Contoh: Ferrari SF90"
            value={itemName}
            onChangeText={setItemName}
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            Berapa harganya?
          </Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 bg-white"
            placeholder="Rp  ..."
            keyboardType="numeric"
            value={itemPrice}
            onChangeText={setItemPrice}
          />
        </View>

        <View className="mb-5">
          <Text className="text-sm font-semibold text-gray-800 mb-2">
            Tuliskan komitmen kepada dirimu sendiri bahwa kamu benar-benar ingin
            berhenti!
          </Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 bg-white h-32 align-top"
            placeholder="Saya berjanji saya tidak akan mengulanginya..."
            multiline
            numberOfLines={4}
            value={commitment}
            onChangeText={setCommitment}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {/* Footer with Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-6 py-5 border-t border-gray-100 flex-row justify-end">
        <TouchableOpacity
          className="bg-primary rounded-full px-8 py-4 shadow-sm active:opacity-90 item-center justify-center flex-row"
          onPress={handleFinish}
        >
          <Text className="text-white text-base font-bold text-center mr-2">
            Selesaikan
          </Text>
          <Text className="text-white text-base font-bold text-center">→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
