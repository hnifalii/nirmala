import React, { useState, useRef } from "react";
import { View, ScrollView, TouchableOpacity, Image, Dimensions, Modal, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CameraView, useCameraPermissions } from "expo-camera";
import { AppText } from "../../components/Typography";
// import ArrowLeft from "../../../../assets/icons/arrow-left.svg";
import LipsFrame from "../../../assets/lips.png";
import LipsOutline from "../../../assets/icons/lips-outline.svg";
import ScanIcon from "../../../assets/icons/lip-scan.svg";
import LipsIcon from "../../../assets/icons/lip-lips.svg";
import ProcessIcon from "../../../assets/icons/lip-process.svg";
import SparkIcon from "../../../assets/icons/lip-spark.svg";
import Step1 from "../../../assets/images/lipscan/step1.png";
import Step2 from "../../../assets/images/lipscan/step2.png";
import Step4 from "../../../assets/images/lipscan/step4.png";

const { width, height } = Dimensions.get("window");

import { analyzeLipCondition, LipAnalysisResult } from "../../services/LipscanService";

export default function LipCheckScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LipAnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const handleBack = () => {
    router.back();
  };

  const handleRetake = () => {
    setAnalysisResult(null);
    setCapturedImage(null);
  };

  if (analysisResult && capturedImage) {
      return (
          <LipResultView 
            result={analysisResult} 
            imageUri={capturedImage}
            onBack={handleBack}
            onRetake={handleRetake}
          />
      );
  }

  const handleCheckNow = async () => {
    if (!permission?.granted) {
      await requestPermission();
    }
    setIsCameraVisible(true);
  };

  const handleCloseCamera = () => {
    setIsCameraVisible(false);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
        setIsProcessing(true);
        try {
            const photo = await cameraRef.current.takePictureAsync({
                shutterSound: false,
                base64: true,
                quality: 0.5,
            });
            
            if (photo?.base64) {
                // Call the service
                
                // Store URI for display
                setCapturedImage(photo.uri || `data:image/jpeg;base64,${photo.base64}`);

                const result = await analyzeLipCondition(photo.base64);
                setAnalysisResult(result);
                
                // Show success / result
                setIsProcessing(false);
                setIsCameraVisible(false);
                console.log("Analysis Result:", result);
                // Here we would navigate to a Result Screen or show a modal
            }
        } catch (error) {
            console.error("Failed to take picture/analyze", error);
            setIsProcessing(false);
        }
    }
  };

  return (
    <View className="flex-1 bg-[#FFFDF7]">
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center pt-12 pb-4 px-6 bg-[#FFFDF7] z-10">
        <TouchableOpacity
          className="w-10 h-10 items-center justify-center rounded-full active:bg-gray-100 -ml-2"
          onPress={handleBack}
        >
          {/* <ArrowLeft width={24} height={24} color="#000000" /> */}
          <AppText className="text-xl">←</AppText>
        </TouchableOpacity>
        <AppText weight="bold" className="text-xl text-gray-900 ml-4 flex-1 text-center pr-10">
          Cek Kondisi Bibir
        </AppText>
      </View>

      <ScrollView 
        className="flex-1 px-6" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Camera Preview Placeholder (Static) */}
        <View className="w-full aspect-square rounded-[24px] mb-8 relative overflow-hidden items-center justify-center">
            <Image source={LipsFrame} className="absolute w-full h-full" resizeMode="cover"/>
            {/* Lip Outline Guide (Mock using borders/views) */}
            <LipsOutline className="absolute top-0 bottom-0 left-0 right-0"/>
            
            {/* Masking overlay (Inverted Mask) */}
            <View className="absolute top-0 left-0 right-0 h-[84px] bg-black/60" />
            <View className="absolute bottom-0 left-0 right-0 h-[84px] bg-black/60" />
            <View className="absolute top-[84px] bottom-[84px] left-0 w-[36px] bg-black/60" />
            <View className="absolute top-[84px] bottom-[84px] right-0 w-[36px] bg-black/60" />

            {/* Frame Corners */}
            <View className="absolute top-20 left-8 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
            <View className="absolute top-20 right-8 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
            <View className="absolute bottom-20 left-8 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
            <View className="absolute bottom-20 right-8 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />

            {/* Badge */}
            <View className="absolute bottom-4 right-4 bg-white/20 px-2 py-1.5 rounded-full flex-row items-center backdrop-blur-md">
                <AppText weight="bold" className="text-black text-xs mr-1 bg-white w-4 h-4 text-center items-center justify-center rounded-full">i</AppText>
                <AppText weight="medium" className="text-white text-xs">Preview posisi bibir</AppText>
            </View>
        </View>

        {/* Instructions Section */}
        <View className="bg-[#FAF3E1] rounded-[24px] p-6 mb-6">
            <AppText weight="bold" className="text-lg text-[#5E7A55] mb-3">
                Langkah memindai kondisi bibir
            </AppText>

            <View className="w-full h-0.5 bg-[#F1EBCF] mb-6"/>

            {/* Timeline Steps */}
            <View className="relative space-y-4">
                {/* Vertical Line */}
                <View className="absolute top-8 left-[22px] h-[500px] w-[4px] bg-[#F1EBCF]" />

                {/* Step 1 */}
                <View className="flex-row">
                  <View className="w-12 h-12 p-1 rounded-full bg-[#F1EBCF] items-center justify-center z-10 mr-2">
                    <ScanIcon width={24} height={24}/>
                  </View>
                  <View className="flex-1 flex-col items-start justify-start mt-1">
                    <AppText weight="medium" className="text-gray-800 text-base mb-1">Sesuaikan posisi bibir dengan area frame</AppText>
                    <Image source={Step1} resizeMode="contain"/>
                  </View>
                </View>

                {/* Step 2 */}
                <View className="flex-row">
                  <View className="w-12 h-12 p-1 rounded-full bg-[#F1EBCF] items-center justify-center z-10 mr-2">
                    <ScanIcon width={24} height={24}/>
                  </View>
                  <View className="flex-1 flex-col items-start justify-start mt-1">
                    <AppText weight="medium" className="text-gray-800 text-base mb-1">Sejajarkan bentuk bibir mengikuti outline</AppText>
                    <Image source={Step2} resizeMode="contain"/>
                  </View>
                </View>

                {/* Step 3 */}
                <View className="flex-row">
                  <View className="w-12 h-12 p-1 rounded-full bg-[#F1EBCF] items-center justify-center z-10 mr-2">
                    <ScanIcon width={24} height={24}/>
                  </View>
                  <View className="flex-1 flex-col items-start justify-start mt-1">
                    <AppText weight="medium" className="text-gray-800 text-base mb-1">Tahan posisi sejenak hingga pemindaian selesai</AppText>
                  </View>
                </View>

                {/* Step 4 */}
                <View className="flex-row">
                  <View className="w-12 h-12 p-1 rounded-full bg-[#F1EBCF] items-center justify-center z-10 mr-2">
                    <ScanIcon width={24} height={24}/>
                  </View>
                  <View className="flex-1 flex-col items-start justify-start mt-1">
                    <AppText weight="medium" className="text-gray-800 text-base mb-1">Tunggu hingga ringkasan kondisi ditampilkan</AppText>
                    <Image source={Step4} resizeMode="contain"/>
                  </View>
                </View>
            </View>
        </View>

        {/* Troubleshooting Section */}
        <View className="bg-[#E9F0E6] rounded-[20px] p-5 mb-6 relative overflow-hidden">
            <AppText weight="bold" className="text-gray-800 text-sm mb-4 z-10">
                Mengalami kendala saat pemindaian?
            </AppText>
            
            <TouchableOpacity className="bg-[#F5F2EA] py-3 px-4 rounded-xl flex-row items-center justify-between active:bg-white">
                <View className="flex-row items-center">
                    <AppText className="mr-2 text-green-700">⊕</AppText>
                    <AppText weight="medium" className="text-gray-700 text-sm">Unggah Foto</AppText>
                </View>
                <AppText className="text-gray-400 text-lg">›</AppText>
            </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Floating Bottom Button */}
      <View className="absolute bottom-8 left-6 right-6">
        <TouchableOpacity 
            className="w-full bg-[#728C69] py-4 rounded-full shadow-lg active:bg-[#5E7A55] flex-row items-center justify-center"
            onPress={handleCheckNow}
        >
            <AppText className="text-white mr-2 text-lg">⛶</AppText>
            <AppText weight="bold" className="text-white text-center text-lg">
                Cek Sekarang
            </AppText>
        </TouchableOpacity>
      </View>

      {/* Camera Modal */}
      <Modal visible={isCameraVisible} animationType="slide" presentationStyle="fullScreen">
        <View className="flex-1 bg-black">
             <StatusBar style="light" />
             
             {/* Camera View */}
             <CameraView 
                ref={cameraRef}
                style={{ flex: 1 }} 
                facing="front"
             >
                {/* Header Overlay */}
                <View className="absolute top-0 left-0 right-0 pt-12 pb-6 px-6 bg-black/40 z-20 flex-row items-center">
                     <TouchableOpacity 
                        className="w-10 h-10 items-center justify-center bg-white/20 rounded-full"
                        onPress={handleCloseCamera}
                     >
                        <AppText className="text-white text-xl">←</AppText>
                     </TouchableOpacity>
                     <AppText weight="bold" className="text-white text-lg ml-4">
                        Pindai Kondisi Bibir
                     </AppText>
                </View>

                {/* Overlay Mask - Matching the static design */}
                <View className="flex-1 items-center justify-center">
                    {/* Dark Background outside the frame */}
                     {/* We can use the same 4-view approach, effectively "cutting out" the middle 
                         But since this is full screen, the dimensions need to be calculated or flux.
                         Let's use a percentage based cutout for responsiveness */}
                     
                     <View className="absolute top-0 left-0 right-0 bottom-0">
                        {/* Top Block */}
                        <View className="flex-1 bg-black/60" />
                        
                        {/* Middle Row */}
                        <View className="flex-row h-[300px]">
                            {/* Left Block */}
                            <View className="flex-1 bg-black/60" />
                            {/* Transparent Cutout (The Frame) */}
                            <View className="w-[300px] h-[300px] relative">
                                 {/* Outline */}
                                 <LipsOutline className="absolute top-0 bottom-0 left-0 right-0 w-full h-full opacity-80" width="100%" height="100%"/>
                                 
                                 {/* Corners */}
                                 <View className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
                                 <View className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
                                 <View className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
                                 <View className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />
                            </View>
                            {/* Right Block */}
                            <View className="flex-1 bg-black/60" />
                        </View>

                        {/* Bottom Block */}
                        <View className="flex-1 bg-black/60 items-center pt-8">
                             {/* Helper Box */}
                             <View className="bg-white/90 rounded-xl p-4 flex-row items-center w-[80%]">
                                <View className="w-12 h-12 bg-[#FF9A6C] rounded-lg mr-4 items-center justify-center">
                                    <LipsOutline width={24} height={24} />
                                </View>
                                <View className="flex-1">
                                    <AppText weight="bold" className="text-gray-900 text-sm mb-1">Panduan cek bibir</AppText>
                                    <AppText className="text-gray-600 text-xs leading-4">Posisikan bibir di dalam area frame dan tahan sebentar</AppText>
                                </View>
                             </View>
                        </View>
                     </View>
                </View>

                {/* Capture Controls */}
                <View className="absolute bottom-0 left-0 right-0 pb-12 pt-6 bg-black/40 items-center z-20 rounded-t-[32px]">
                    <TouchableOpacity
                      onPress={handleTakePicture}
                      className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-white/20 active:scale-95"
                    >
                      <View className="w-16 h-16 bg-white rounded-full" />
                    </TouchableOpacity>
                    
                    <AppText className="text-white/80 text-xs mt-4">
                         Ketuk untuk mengambil foto
                    </AppText>
                </View>
             </CameraView>
             
             {/* Processing Overlay */}
             {isProcessing && (
                 <View className="absolute inset-0 top-0 bottom-0 left-0 right-0 bg-black/60 z-50 items-center justify-center backdrop-blur-sm">
                      <View className="bg-[#FFFDF7] p-8 rounded-[32px] items-center w-[280px]">
                           {/* Loading Spinner / Icon */}
                           <View className="w-20 h-20 bg-blue-100 rounded-full mb-6 items-center justify-center animate-pulse">
                                <View className="w-12 h-12 bg-blue-300 rounded-xl" />
                           </View>
                           
                           <AppText weight="bold" className="text-gray-800 text-lg text-center">
                               Memproses...
                           </AppText>
                      </View>
                 </View>
             )}
        </View>
      </Modal>
    </View>
  );
}

// --- Result View Component ---

function LipResultView({ 
  result, 
  imageUri, 
  onBack, 
  onRetake 
}: { 
  result: LipAnalysisResult; 
  imageUri: string; 
  onBack: () => void;
  onRetake: () => void;
}) {
  const [expandedActionId, setExpandedActionId] = useState<string | null>(null);

  const toggleAction = (id: string) => {
    setExpandedActionId(expandedActionId === id ? null : id);
  };

  const statusColor = 
    result.status.level === "baik" ? "bg-green-100 text-green-800" :
    result.status.level === "perlu perhatian ringan" ? "bg-yellow-400 text-yellow-800" :
    "bg-red-100 text-red-800";
    
  // Map level to display label
  const statusLabel = 
     result.status.level === "baik" ? "Bagus" :
     result.status.level === "perlu perhatian ringan" ? "Perhatian" :
     "Waspada";

  return (
    <View className="flex-1 bg-[#FFFDF7]">
      {/* Header Result */}
      <View className="pt-12 pb-4 px-6 bg-[#728C69] z-10 flex-row items-center">
         <TouchableOpacity onPress={onBack} className="mr-4">
            <AppText className="text-white text-xl">←</AppText>
         </TouchableOpacity>
         <AppText weight="bold" className="text-white text-lg flex-1 text-center pr-8">
            Hasil Cek Bibir
         </AppText>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ }}>
        
        {/* Hero Image */}
        <View className="w-full h-[250px] relative overflow-hidden rounded-b-3xl">
            <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
             {/* Gradient Overlay for text readability if needed, or just style */}
             <View className="absolute bottom-4 right-4 bg-black/60 px-3 py-1.5 rounded-full flex-row items-center">
                 <AppText className="text-white text-xs mr-2">i</AppText>
                 <AppText className="text-white text-xs font-medium">Area yang disorot</AppText>
             </View>
        </View>

        <View className="px-6 bg-[#FFFDF7] pt-8">
            
            {/* Status Badge */}
            <View className={`self-start px-4 py-1.5 rounded-full mb-4 ${statusColor.split(" ")[0]}`}>
                <AppText weight="bold" className={`text-xs ${statusColor.split(" ")[1]}`}>
                    {statusLabel}
                </AppText>
            </View>

            {/* Title & Desc */}
            <AppText weight="bold" className="text-2xl text-gray-900 mb-2">
                {result.status.title}
            </AppText>
            <AppText className="text-gray-500 text-sm leading-5 mb-8">
                {result.status.description}
            </AppText>

            {/* Summary Card */}
            <View className="bg-[#F9F7EF] rounded-[24px] p-6 mb-8 border border-[#E5E0D0]">
                <View className="flex-row items-center mb-4">
                    <View className="w-8 h-8 items-center justify-center rounded-full bg-[#E5E0D0] mr-3">
                         <AppText className="text-[#6B8A62]">✨</AppText>
                    </View>
                    <AppText weight="bold" className="text-[#5E7A55] text-lg">Ringkasan</AppText>
                </View>
                
                <View className="space-y-3">
                    {result.summaryInsights.map((insight, idx) => (
                        <View key={idx} className="flex-row">
                            <AppText className="text-gray-400 mr-3 mt-0.5">•</AppText>
                            <AppText className="text-gray-700 text-sm font-medium flex-1 leading-5">
                                {insight}
                            </AppText>
                        </View>
                    ))}
                </View>
            </View>

            {/* Recommendations Header */}
            <View className="bg-[#728C69] py-3 px-4 rounded-t-xl rounded-br-xl self-start mb-4">
                 <View className="flex-row items-center">
                    <View className="w-5 h-5 rounded-full border border-white items-center justify-center mr-2">
                        <AppText className="text-white text-[10px]">✓</AppText>
                    </View>
                    <AppText weight="bold" className="text-white text-sm">Rekomendasi Tindakan</AppText>
                 </View>
            </View>
            <AppText className="text-gray-400 text-sm mb-6 pl-1">
                Langkah yang bisa kamu lakukan sekarang
            </AppText>
            
            {/* Accordion List */}
            <View className="space-y-4">
                {result.recommendedActions.map((action) => {
                    const isExpanded = expandedActionId === action.id;
                    return (
                        <TouchableOpacity 
                            key={action.id} 
                            activeOpacity={0.9}
                            onPress={() => toggleAction(action.id)}
                            className={`rounded-[20px] overflow-hidden border ${isExpanded ? 'border-[#FF9A6C] bg-[#FFF8F4]' : 'border-[#F0EFE9] bg-[#F9F8F4]'}`}
                        >
                            <View className="p-5 flex-row items-center">
                                {/* Icon based on ID */}
                                <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${isExpanded ? 'bg-[#FF9A6C]/20' : 'bg-[#E5E0D0]'}`}>
                                     <AppText className="text-lg">
                                        {action.id === 'hydration' ? '🥛' : action.id === 'smoking_pause' ? '⏸️' : '🧴'}
                                     </AppText>
                                </View>
                                
                                <View className="flex-1">
                                    <AppText weight="bold" className={`text-base ${isExpanded ? 'text-[#C05D28]' : 'text-gray-800'}`}>
                                        {action.title}
                                    </AppText>
                                    <AppText className="text-xs text-gray-500 mt-1">
                                        {action.description}
                                    </AppText>
                                </View>

                                <AppText className={`text-xl ml-2 ${isExpanded ? 'rotate-180 text-[#C05D28]' : 'text-gray-400'}`}>
                                    ⌄
                                </AppText>
                            </View>

                            {/* Expanded Content */}
                            {isExpanded && (
                                <View className="bg-[#FF9A6C] px-5 py-4">
                                    {action.suggestions.map((suggestion, idx) => (
                                        <View key={idx} className="flex-row mb-2 last:mb-0 items-start">
                                            <AppText className="text-white mr-2 mt-0.5 text-xs">○</AppText>
                                            <AppText className="text-white text-sm font-medium leading-5 flex-1">
                                                {suggestion}
                                            </AppText>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

             {/* Timestamp (Mock) */}
             <View className="mt-8 mb-4">
                <AppText weight="bold" className="text-gray-400 text-xs mb-2 uppercase tracking-widest">Waktu Pemindaian</AppText>
                <View className="flex-row items-center">
                     <AppText className="text-gray-600 text-sm font-medium mr-4">📅 {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</AppText>
                     <AppText className="text-gray-600 text-sm font-medium">🕒 {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</AppText>
                </View>
             </View>

        </View>

      {/* Footer Buttons */}
      <View className="p-6 bg-[#FFFDF7] shadow-lg border-t border-gray-50">
           <TouchableOpacity className="w-full bg-[#728C69] py-4 rounded-full mb-3 items-center shadow-sm">
                <AppText weight="bold" className="text-white text-base">Tanya Ahli</AppText>
           </TouchableOpacity>
           
           <TouchableOpacity onPress={onRetake} className="w-full py-4 items-center">
                <AppText weight="bold" className="text-[#728C69] text-base">Kembali ke Halaman</AppText>
           </TouchableOpacity>
      </View>

      </ScrollView>

    </View>
  );
}