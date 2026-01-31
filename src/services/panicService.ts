import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { uploadImageToCloudinary } from "../utils/uploadImage";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = "AIzaSyCFfH54GfJu3BKN3sijVviY5WzryK79SbQ"
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface ValidationResult {
  isCorrect: boolean;
  reason?: string;
  detectedObject?: string;
}

export async function validatePanicImageWithAI(
  base64Image: string,
  targetName: string
): Promise<ValidationResult> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `Analisis gambar ini. Apakah terdapat benda: "${targetName}"?
    Aturan:
    1. Jawab "isCorrect": true jika benda tersebut ada di gambar, walau hanya sebagian, agak buram, atau ada di latar belakang.
    2. Jangan terlalu ketat. Asalkan ada kemiripan visual yang kuat, anggap benar.
    3. Jika sangat tidak ada hubungannya, baru jawab false.
    
    Output JSON ONLY: { "isCorrect": boolean, "reason": "...", "detectedObject": "..." }`;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().trim();
    const jsonString = text.replace(/```json|```/g, "").trim();
    
    return JSON.parse(jsonString);
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    return { 
      isCorrect: false, 
      reason: `Error AI: ${error?.message || JSON.stringify(error)}` 
    };
  }
}


interface PanicLogData {
  targetName: string;
  challengeDuration: number;
  photoUri: string;
}

export async function uploadPanicLog({
  targetName,
  challengeDuration,
  photoUri,
}: PanicLogData): Promise<string | null> {
  try {
    // 1. Upload to Cloudinary
    const imageUrl = await uploadImageToCloudinary(photoUri);

    if (!imageUrl) {
        throw new Error("Failed to get image URL from Cloudinary");
    }

    // 2. Save to Firestore
    await addDoc(collection(db, "panic_logs"), {
      imageUrl: imageUrl,
      targetItem: targetName,
      timestamp: serverTimestamp(),
      status: "success",
      challengeDuration: challengeDuration,
    });
    
    return imageUrl;
  } catch (error) {
    console.error("Upload/Log failed:", error);
    return null;
  }
}
