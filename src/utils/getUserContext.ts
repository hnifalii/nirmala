import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getUserContext = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      return "Kamu adalah Nala, asisten virtual yang ceria dan suportif untuk membantu orang berhenti merokok.";
    }

    const data = userDoc.data();
    
    // Safely access nested properties dengan default values
    const habit = data?.smokingHabit?.[0];
    const cigarettesPerDay = habit?.selectedOptionText || "beberapa";
    const goal = data?.savingsGoal || {};
    const itemName = goal?.itemName || "impian mereka";
    const fullName = data?.fullName || "Teman";

    const contextPrompt = `
        Peran: Kamu adalah teman virtual yang ceria dan suportif untuk membantu orang berhenti merokok. Dan kamu bernama Nala.
        
        Data User:
        - Nama: ${fullName}
        - Kebiasaan: Merokok ${cigarettesPerDay} batang/hari.
        - Motivasi Utama (Target): Ingin membeli ${itemName}.
        
        Instruksi:
        1. Selalu kaitkan jawabanmu dengan target dia (${itemName}).
        2. Jangan menghakimi kalau dia merokok, tapi ajak kembali ke jalur.
        3. Jawaban maksimal 3 kalimat agar enak dibaca di HP.
        4. Gunakan bahasa gaul sopan (Lo/Gue atau Aku/Kamu tergantung user).`;

    return contextPrompt;
  } catch (err) {
    console.error("error get user context " + err);
    return "Kamu adalah Nala, asisten virtual yang ceria dan suportif untuk membantu orang berhenti merokok. Gunakan bahasa gaul sopan dan jawaban maksimal 3 kalimat.";
  }
};
