import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { ChatSession } from "../types/chatSession";
import { Message } from "../types/message";
import { getUserContext } from "../utils/getUserContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatService {
  async createChatSession(firstMessageText: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("User belum terautentikasi");

    const newSession: ChatSession = {
      id: "session_0",
      title: firstMessageText,
      previewText: firstMessageText.substring(0, 30) + "...",
      isActive: true,
      createdAt: serverTimestamp(),
      lastUpdatedAt: serverTimestamp(),
    };

    const sessionRef = await addDoc(
      collection(db, "users", user.uid, "chat_sessions"),
      { newSession },
    );

    return sessionRef.id;
  }

  async getChatSessions() {
    const user = auth.currentUser;
    if (!user) throw new Error("User belum terautentikasi");

    const q = query(
      collection(db, "users", user.uid, "chat_sessions"),
      orderBy("lastUpdatedAt", "desc"),
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async sendMessage(sessionId: string | null, text: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("User belum terautentikasi");

    let currentSessionId = sessionId;

    if (!currentSessionId) {
      currentSessionId = await this.createChatSession(text);
    }

    const messageRef = collection(
      db,
      "users",
      user.uid,
      "chat_sessions",
      currentSessionId,
      "messages",
    );

    const message: Message = {
      text: text,
      sender: "user",
      timestamp: serverTimestamp(),
    };

    await addDoc(messageRef, { message });

    await updateDoc(
      doc(db, "users", user.uid, "chat_sessions", currentSessionId),
      {
        lastUpdatedAt: serverTimestamp(),
        preview: text.substring(0, 30) + "...",
      },
    );

    const systemContext = await getUserContext(user.uid);

    try {
      const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

      const prompt = `
        ${systemContext}
        Berdasarkan konteks pengguna yang saya berikan, jawablah pertanyaan dari pengguna tersebut:
        ${text}
        Jawab dengan format JSON:
        { "message": "Jawaban dari pertanyaan yang diberikan" }
      `;

      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      const jsonString = response.replace(/```json|```/g, "");
      const json = JSON.parse(jsonString);
      const message = json.message;

      await addDoc(messageRef, {
        text: message,
        sender: "bot",
        timestamp: serverTimestamp(),
      });

      return { sessionId: currentSessionId, message };
    } catch (err) {
      console.error("error send message " + err);
      await addDoc(messageRef, {
        text: "Maaf, Nala sedang pusing (Koneksi Error). Coba lagi ya.",
        sender: "bot",
        timestamp: serverTimestamp(),
      });
      throw err;
    }
  }

  async getMessages(sessionId: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("User belum terautentikasi");

    const q = query(
      collection(
        db,
        "users",
        user?.uid,
        "chat_sessions",
        sessionId,
        "messages",
      ),
      orderBy("timestamp", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        _id: doc.id,
        text: data.text,
        createdAt: data.timestamp?.toDate() || new Date(),
        sender: data.sender == "user" ? "user" : "bot",
      };
    });
  }
}
