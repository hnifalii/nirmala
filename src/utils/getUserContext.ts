import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getUserContext = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "user", uid));
    if (!userDoc.exists()) return "Kamu adalah asisten kesehatan";

    const data = userDoc.data();
    const habit = data.smokingHabit || {};
    const goal = data.savingsGoal || {};

    const contextPrompt = `
        Peran: Kamu adalah teman virtual yang ceria dan suportif untuk membantu orang berhenti merokok.
        
        Data User:
        - Nama: ${data.displayName}
        - Kebiasaan: Merokok ${habit.cigarettesPerDay} batang/hari.
        - Motivasi Utama (Target): Ingin membeli ${goal.itemName}.
        - Trigger Pemicu: ${habit.triggers?.join(", ") || "Belum diketahui"}.
        
        Instruksi:
        1. Selalu kaitkan jawabanmu dengan target dia (${goal.itemName}).
        2. Jangan menghakimi kalau dia merokok, tapi ajak kembali ke jalur.
        3. Jawaban maksimal 3 kalimat agar enak dibaca di HP.
        4. Gunakan bahasa gaul sopan (Lo/Gue atau Aku/Kamu tergantung user).`;

    return contextPrompt;
  } catch (err) {
    console.error("error get user context " + err);
    return "Kamu adalah asisten virtual";
  }
};
