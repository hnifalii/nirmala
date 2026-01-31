import {
  View,
  StyleSheet,
  Modal,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { CameraView } from "expo-camera";
import { usePanicButton } from "../../hooks/usePanicButton";

// --- Custom Components ---
import { PanicPopupWrapper } from "../../components/panic_button/PanicPopupWrapper";
import { CountdownView } from "../../components/panic_button/CountdownView";
import { ChallengeView } from "../../components/panic_button/ChallengeView";
// CameraOverlay removed
import { SuccessView } from "../../components/panic_button/SuccessView";
import { FailureView } from "../../components/panic_button/FailureView";
import { TimeoutView } from "../../components/panic_button/TimeoutView";
import { PostInterventionView } from "../../components/panic_button/PostInterventionView";

export default function PanicButtonScreen() {
  const {
    phase,
    setPhase,
    cameraRef,
    countdown,
    challengeTimer,
    targetItem,
    photoUri,
    startPanicFlow,
    startCamera,
    takePicture,
    handleUploadAndProceed,
    resetFlow,
  } = usePanicButton();

  // --- Render ---

  if (phase === "idle") {
    // Hidden state mostly, but for init
    return <View style={styles.container} />;
  }

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.fullScreen}>
        {/* PHASE: COUNTDOWN */}
        {phase === "countdown" && (
          <CountdownView
            count={countdown}
            targetName={targetItem.name}
            imageUrl={targetItem.imageUrl}
            onClose={resetFlow}
          />
        )}
        {/* PHASE: CHALLENGE */}
        {phase === "challenge" && (
          <ChallengeView
            targetName={targetItem.name}
            imageUrl={targetItem.imageUrl}
            timer={challengeTimer}
            onStart={startCamera}
            onClose={resetFlow}
          />
        )}
        {/* PHASE: CAMERA & OVERLAYS */}
        {(phase === "camera" ||
          phase === "validating" ||
          phase === "success_overlay" ||
          phase === "failure_overlay" ||
          phase === "timeout_overlay") && (
          <PanicPopupWrapper onClose={resetFlow}>
            <View className="flex-1 w-full justify-between items-center p-4">
              {/* Header Timer */}
              <Text className="text-lg font-bold text-gray-500 mt-2">
                Waktu tersisa:{" "}
                <Text className="text-[#728C69]">{challengeTimer} detik</Text>
              </Text>

              {/* Camera Box */}
              <View className="flex-1 w-full my-6 rounded-[30px] overflow-hidden relative bg-black shadow-lg border-4 border-white">
                <CameraView
                
                  style={StyleSheet.absoluteFill}
                  ref={cameraRef}
                  facing="back"
                />

                {/* Shutter Button */}
                {phase === "camera" && (
                  <View className="absolute bottom-6 w-full items-center">
                    <TouchableOpacity
                      onPress={takePicture}
                      className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20"
                    >
                      <View className="w-12 h-12 bg-white rounded-full" />
                    </TouchableOpacity>
                  </View>
                )}

                {/* Validating Overlay */}
                {phase === "validating" && (
                  <View className="absolute inset-0 justify-center items-center bg-black/40">
                    <Text className="text-white font-bold text-lg">
                      Memindai...
                    </Text>
                  </View>
                )}

                {/* Success Overlay */}
                {phase === "success_overlay" && (
                  <View className="absolute inset-0 justify-center items-center bg-black/40 p-4">
                    <SuccessView
                      targetName={targetItem.name}
                      photoUri={photoUri}
                      onProceed={handleUploadAndProceed}
                    />
                  </View>
                )}

                {/* Failure Overlay */}
                {phase === "failure_overlay" && (
                  <View className="absolute inset-0 justify-center items-center bg-black/40 p-4">
                    <FailureView
                      targetName={targetItem.name}
                      onRetry={() => setPhase("camera")}
                    />
                  </View>
                )}
              </View>

              {/* Footer Target Info */}
              <View className="items-center mb-4">
                <Image
                  source={{ uri: targetItem.imageUrl }}
                  className="w-16 h-16 mb-2"
                  resizeMode="contain"
                />
                <Text className="text-2xl font-bold text-[#448AFF] mb-1">
                  {targetItem.name}
                </Text>
                <Text className="text-xs text-gray-400 font-medium">
                  Arahkan kamera ke {targetItem.name.toLowerCase()} atau benda
                  mirip.
                </Text>
              </View>
            </View>
          </PanicPopupWrapper>
        )}

        {/* PHASE: POST INTERVENTION */}
        {(phase === "post_intervention_1" ||
          phase === "post_intervention_2" ||
          phase === "post_intervention_3") && (
          <PostInterventionView
            step={
              phase === "post_intervention_1"
                ? 1
                : phase === "post_intervention_2"
                  ? 2
                  : 3
            }
            onNext={() =>
              setPhase(
                phase === "post_intervention_1"
                  ? "post_intervention_2"
                  : "post_intervention_3",
              )
            }
            onFinish={resetFlow}
            onClose={resetFlow}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fullScreen: {
    flex: 1,
  },
  centerOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
