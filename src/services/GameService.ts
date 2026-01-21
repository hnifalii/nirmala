import { GAME_QUESTIONS } from "../constants/game";
import { GoogleGenerativeAI } from "@google/generative-ai";

export class GameService {
  getRandomQuest(): string {
    const questions = GAME_QUESTIONS;
    const random = questions[Math.floor(Math.random() * questions.length)];
    return random.text;
  }

  async validateAnswerWithAI(imageUrl: string, questionText: string) {
    try {
      const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

      const prompt = `Saya sedang main scavenger hunt. 
        Soalnya adalah: "${questionText}".
        Lihat gambar ini: ${imageUrl}.
        Apakah objek di gambar sesuai dengan soal?
        Jawab HANYA dengan format JSON: 
        { "isCorrect": boolean, "reason": "alasan singkat", "detectedObject": "nama benda" }`;

      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);

      const text = result.response.text();

      const jsonString = text.replace(/```json|```/g, "");

      return JSON.parse(jsonString);
    } catch (err) {
      console.error("error validate answer with ai " + err);
      return {
        isCorrect: false,
        reason: "Gagal terhubung ke ai",
      };
    }
  }
}
