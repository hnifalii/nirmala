import { useState, useRef, useEffect, useCallback } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useFocusEffect } from "expo-router";
import { PanicPhase } from "../types/panic";
import { CHALLENGE_ITEMS } from "../constants/panic";
import { uploadPanicLog, validatePanicImageWithAI } from "../services/panicService";

export const usePanicButton = () => {
  // ... (keep state)
  const [phase, setPhase] = useState<PanicPhase>("idle");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [countdown, setCountdown] = useState(3);
  const [challengeTimer, setChallengeTimer] = useState(45);
  const [targetItem, setTargetItem] = useState(CHALLENGE_ITEMS[0]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  // Auto-start when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (phase === "idle") {
        startPanicFlow();
      }
    }, [phase])
  );

  // --- Effects ---

  // Countdown Logic
  useEffect(() => {
    if (phase === "countdown") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown((c) => c - 1), 1500);
        return () => clearTimeout(timer);
      } else {
        setPhase("challenge");
      }
    }
  }, [phase, countdown]);

  // Challenge Timer Logic
  useEffect(() => {
    if (phase === "camera") {
      if (challengeTimer > 0) {
        const timer = setTimeout(() => setChallengeTimer((t) => t - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setPhase("timeout_overlay");
      }
    }
  }, [phase, challengeTimer]);

  // --- Actions ---

  const startPanicFlow = () => {
    setPhase("countdown");
    setCountdown(3);
    setChallengeTimer(45);
    setTargetItem(
      CHALLENGE_ITEMS[Math.floor(Math.random() * CHALLENGE_ITEMS.length)]
    );
  };

  const startCamera = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    setPhase("camera");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          shutterSound: false,
          base64: true,
          quality: 0.5,
        });

        if (photo?.uri && photo.base64) {
          setPhotoUri(photo.uri);
          setPhase("validating");

          const result = await validatePanicImageWithAI(
            photo.base64,
            targetItem.name
          );
          
          console.log("Validation Result:", result);

          setPhase(result.isCorrect ? "success_overlay" : "failure_overlay");
        }
      } catch (error) {
        console.error("Failed to take picture:", error);
      }
    }
  };

  const handleUploadAndProceed = async () => {
    // 1. Start upload in background (fire and forget for UI purposes)
    if (photoUri) {
      uploadPanicLog({
        targetName: targetItem.name,
        challengeDuration: 45 - challengeTimer,
        photoUri,
      }).catch(err => console.error("Background upload failed:", err));
    }

    // 2. Immediately proceed to next phase
    setPhase("post_intervention_1");
  };

  const restartPanicFlow = () => {
    startPanicFlow();
  };

  const navigateToBreathing = () => {
    setPhase("idle"); // Clear current state
    router.push("/activities/ruang-kendali");
  };

  const resetFlow = () => {
    setPhase("idle");
    setCountdown(3);
    setChallengeTimer(45);
    setPhotoUri(null);
    router.replace("/");
  };

  return {
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
    restartPanicFlow,
    navigateToBreathing,
  };
};
