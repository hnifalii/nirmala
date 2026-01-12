import React from "react";
import { Modal, View, TouchableOpacity } from "react-native";
import { AppText } from "./Typography";

interface BaseModalProps {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  animationType?: "fade" | "slide" | "none";
  transparent?: boolean;
  statusBarTranslucent?: boolean;
}

export function BaseModal({
  visible,
  onClose,
  children,
  animationType = "fade",
  transparent = true,
  statusBarTranslucent = true,
}: BaseModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
      statusBarTranslucent={statusBarTranslucent}
    >
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        {children}
      </View>
    </Modal>
  );
}

interface ModalCardProps {
  children: React.ReactNode;
}

export function ModalCard({ children }: ModalCardProps) {
  return (
    <View className="bg-white rounded-2xl p-8 w-full max-w-sm">{children}</View>
  );
}

interface AlertModalProps {
  visible: boolean;
  title: string;
  message: string;
  buttonLabel?: string;
  buttonColor?: string;
  onConfirm: () => void;
}

export function AlertModal({
  visible,
  title,
  message,
  buttonLabel = "Mengerti",
  buttonColor = "#FBA359",
  onConfirm,
}: AlertModalProps) {
  return (
    <BaseModal visible={visible}>
      <ModalCard>
        <AppText
          weight="bold"
          className="text-xl text-gray-800 text-center mb-2"
        >
          {title}
        </AppText>

        <AppText
          weight="regular"
          className="text-gray-600 text-center mb-8 leading-6"
        >
          {message}
        </AppText>

        <TouchableOpacity
          onPress={onConfirm}
          style={{ backgroundColor: buttonColor }}
          className="rounded-full py-3"
        >
          <AppText weight="bold" className="text-center text-white text-base">
            {buttonLabel}
          </AppText>
        </TouchableOpacity>
      </ModalCard>
    </BaseModal>
  );
}
