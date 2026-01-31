import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../firebase";
import { ChatService } from "../../services/ChatService";
import { AppText } from "../../components/Typography";
import { ChatSession } from "../../types/chatSession";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatIcon from "../../../assets/icons/chatbot-icon.svg";
import Murung from "../../../assets/icons/murung.svg";
import Cerita from "../../../assets/icons/cerita.svg";
import Edit from "../../../assets/icons/tabler_edit.svg";

interface DisplayMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatbotScreen = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("Pengguna");
  const [userEmail, setUserEmail] = useState("");
  const [loadingSession, setLoadingSession] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(false);

  const sidebarAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const chatService = useRef(new ChatService()).current;

  // Load sessions and user data on mount
  useEffect(() => {
    loadChatSessions();
    loadUserName();
  }, [chatService]);

  // Load messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      setShowWelcome(false);
      loadMessages(currentSessionId);
    } else {
      setMessages([]);
      setShowWelcome(true);
    }
  }, [currentSessionId]);

  // Sidebar animation
  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [sidebarOpen]);

  const loadUserName = async () => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || "Pengguna");
      setUserEmail(user.email || "");
    }
  };

  const loadChatSessions = async () => {
    try {
      const sessions = await chatService.getChatSessions();
      setChatSessions(sessions as ChatSession[]);
    } catch (err) {
      console.error("Error loading chat sessions:", err);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      setLoadingSession(true);
      const msgs = await chatService.getMessages(sessionId);
      // Map dari format Firestore ke DisplayMessage
      const displayMsgs = msgs.map((msg: any) => ({
        id: msg._id,
        text: msg.text,
        sender: msg.sender,
        timestamp: msg.timestamp,
      }));
      setMessages(displayMsgs);
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setLoadingSession(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setInputText("");

    // Jika belum ada session, buat session baru dengan pesan pertama
    let sessionId = currentSessionId;
    if (!sessionId) {
      try {
        sessionId = await chatService.createChatSession(userMessage);
        setCurrentSessionId(sessionId);
        await loadChatSessions();
      } catch (err) {
        console.error("Error creating session:", err);
        return;
      }
    }

    // Add user message to UI
    const userMsg: DisplayMessage = {
      id: Date.now().toString(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      setLoading(true);
      // Get AI response
      const result = await chatService.sendMessage(sessionId, userMessage);
      const botMsg: DisplayMessage = {
        id: Date.now().toString() + "bot",
        text: result.message,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    // Reset state tanpa membuat session (seperti ChatGPT/Gemini)
    setCurrentSessionId(null);
    setInputText("");
    setMessages([]);
    setShowWelcome(true);
    setSidebarOpen(false);
  };

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    setSidebarOpen(false);
  };

  const handleQuickAction = (action: string) => {
    setInputText(action);
  };

  const sidebarTranslateX = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-350, 0],
  });

  // Avatar color based on name
  const getAvatarColor = (name: string) => {
    const colors = ["#728C69", "#9DB4B4", "#FFE05B", "#CDFFBC"];
    return colors[name.charCodeAt(0) % colors.length];
  };

  const renderMessage = (item: DisplayMessage) => {
    if (item.sender === "user") {
      return (
        <View key={item.id} className="flex-row justify-end mb-8 px-4">
          <View className="bg-[#728C69] rounded-xl rounded-tr-none p-5 max-w-[80%]">
            <AppText className="text-white">{item.text}</AppText>
          </View>
        </View>
      );
    }

    return (
      <View key={item.id} className="mb-3 px-8">
        <View className="flex-row mb-3">
          <View className="w-7 h-7 rounded-xl bg-[#E8E8E8] justify-center align-middle">
            <ChatIcon />
          </View>
        </View>
        <View className="max-w-[85%]">
          <AppText className="text-[#363B43]">{item.text}</AppText>
        </View>
        <AppText className="text-[12px] opacity-40">
          {item.timestamp.getHours() + ":" + item.timestamp.getMinutes()}
        </AppText>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <TouchableOpacity
            className="absolute top-0 left-0 right-0 bottom-0 z-10"
            onPress={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Animated.View
          className="absolute left-0 top-0 bottom-0 w-80 bg-white border-r border-r-[#E0E0E0] z-20 px-2"
          style={{
            transform: [{ translateX: sidebarTranslateX }],
          }}
        >
          <View className="p-4 pt-5">
            {/* Search Bar */}
            <View className="bg-[#EBEBEB] rounded-full flex-row items-center px-4 py-2 mb-5">
              <Ionicons name="search" size={18} color="#A1A1A1" />
              <TextInput
                placeholder="Telusuri"
                className="flex-1 ml-2 text-sm text-[#333]"
                placeholderTextColor="#A1A1A1"
              />
            </View>

            {/* New Chat Button */}
            <TouchableOpacity
              onPress={handleNewChat}
              className="flex flex-row gap-3 px-4 my-2"
            >
              <Edit />
              <AppText className="text-sm font-bold self-center">
                Buat Obrolan Baru
              </AppText>
            </TouchableOpacity>

            {/* Chat Sessions List */}
            <AppText className="text-[#A1A1A1] px-4 font-bold my-5">
              Obrolan Saya
            </AppText>

            {chatSessions.length > 0 ? (
              <FlatList
                data={chatSessions}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelectSession(item.id)}
                    className={`py-4 px-3 rounded-full ${
                      currentSessionId === item.id
                        ? "bg-[#728C69]"
                        : "bg-transparent"
                    }`}
                  >
                    <AppText
                      className={`${
                        currentSessionId === item.id
                          ? "text-white"
                          : "text-black"
                      }`}
                      numberOfLines={1}
                    >
                      {item.title || "Obrolan Baru"}
                    </AppText>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <AppText className="text-[#A1a1a1] opacity-60 px-4">
                Belum ada obrolan.
              </AppText>
            )}
          </View>

          {/* User Profile Section */}
          <View className="absolute bottom-0 left-0 right-0 p-4 border-t border-t-[#E0E0E0] bg-white">
            <View className="bg-[#728C69] rounded-3xl p-4 mb-3 overflow-hidden shadow-sm">
              <View className="flex-row items-center">
                {/* Avatar */}
                <View
                  className="w-10 h-10 rounded-full justify-center items-center mr-3 flex-shrink-0 border border-white/30"
                  style={{ backgroundColor: getAvatarColor(userName) }}
                >
                  <AppText className="text-white text-base font-bold shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </AppText>
                </View>

                {/* Name and Email */}
                <View className="flex-1 justify-center">
                  <AppText className="text-sm font-bold text-white">
                    {userName}
                  </AppText>
                  <AppText className="text-xs text-gray-100 mt-0.5">
                    {userEmail}
                  </AppText>
                </View>

                {/* Bintang sudah dihapus di sini */}
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Main Content */}
        <View className="flex-1 flex-col">
          {/* Header */}
          <View className="flex-row items-center px-4 py-3">
            <TouchableOpacity
              onPress={() => setSidebarOpen(!sidebarOpen)}
              className="w-11 h-11 justify-center"
            >
              <Ionicons
                name={sidebarOpen ? "close" : "menu"}
                size={24}
                color="#728C69"
              />
            </TouchableOpacity>

            <View className="flex-1 justify-center items-center">
              <AppText className="text-lg font-bold text-[#333]">
                Ruang Cerita
              </AppText>
            </View>

            <View className="w-11" />
          </View>

          {/* Messages or Welcome Screen */}
          {showWelcome ? (
            <View className="flex-1 justify-center items-center px-6">
              {/* Welcome Content */}
              <View className="items-center px-2">
                <View className="flex flex-row gap-3 self-start px-2">
                  {/* Chatbot Icon */}
                  <ChatIcon />
                  {/* Greeting */}
                  <View className="mb-2 self-center">
                    <AppText className="font-bold">
                      Halo{" "}
                      <AppText className="text-[#728C69]">{userName}</AppText>
                    </AppText>
                  </View>
                </View>

                {/* Title */}
                <AppText className="text-2xl font-bold text-[#333] mt-2 mb-12 self-start px-2">
                  Ceritakan kondisimu hari ini
                </AppText>

                {/* Input Field */}
                <View className="w-full bg-white rounded-full border border-[#E0E0E0] mb-4 flex-row items-center">
                  <TextInput
                    placeholder="Nala siap mendengar"
                    value={inputText}
                    onChangeText={setInputText}
                    className="flex-1 text-sm text-[#333] font-semibold m-2 opacity-60"
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    className="bg-[#728C69] p-3 m-2 rounded-full"
                    onPress={handleSendMessage}
                  >
                    <Ionicons
                      name="send"
                      size={20}
                      color={`#fff`}
                      className="ml-2"
                    />
                  </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View className="w-full gap-3 mb-5">
                  <View className="flex flex-row w-3/6 gap-2">
                    <TouchableOpacity
                      onPress={() =>
                        handleQuickAction("Saya mengalami keluhan")
                      }
                      className="p-2 border border-gray-300 rounded-lg gap-2"
                    >
                      <Murung />
                      <AppText className="text-[#333] text-sm font-medium">
                        Saya mengalami keluhan
                      </AppText>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleQuickAction("Saya ingin bercerita")}
                      className="p-2 border border-gray-300 rounded-lg gap-2"
                    >
                      <Cerita />
                      <AppText className="text-[#333] text-sm font-medium">
                        Saya ingin bercerita
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Disclaimer */}
                <View className="w-full p-3 mt-44">
                  <AppText className="text-xs text-[#888888] text-center font-semibold">
                    Nala hanya sebagai klarifikasi kondisi dan ajakan tindakan.
                    Segera{" "}
                    <AppText className="text-xs text-[#53634D]">
                      Tanya Ahli
                    </AppText>{" "}
                    jika mengalami kondisi serius
                  </AppText>
                </View>
              </View>
            </View>
          ) : (
            <>
              {/* Messages List or Loading */}
              {loadingSession ? (
                <View className="flex-1 justify-center items-center">
                  <ActivityIndicator size="large" color="#728C69" />
                </View>
              ) : (
                <FlatList
                  ref={flatListRef}
                  data={messages}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => renderMessage(item)}
                  onContentSizeChange={() =>
                    flatListRef.current?.scrollToEnd({ animated: true })
                  }
                  contentContainerStyle={{ paddingVertical: 16 }}
                  scrollEnabled={true}
                  ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-10">
                      <AppText className="text-[#999]">
                        Mulai percakapan
                      </AppText>
                    </View>
                  }
                />
              )}

              {/* Input Area - Always visible when not in welcome */}
              <View className="px-4 py-3 pb-20 border-t border-t-[#E0E0E0] bg-white">
                <View className="flex-row items-center gap-2">
                  <View className="flex-1 bg-[#F5F5F5] rounded-3xl px-3.5 py-2.5">
                    <TextInput
                      placeholder="Tulis pesan..."
                      value={inputText}
                      onChangeText={setInputText}
                      className="text-sm text-[#333]"
                      placeholderTextColor="#999"
                      maxLength={500}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handleSendMessage}
                    disabled={loading}
                    className="w-11 h-11 rounded-full bg-[#728C69] justify-center items-center"
                  >
                    <Ionicons name="send" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotScreen;
