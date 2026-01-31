import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth, db } from "../../firebase";
import { Timestamp, collection, addDoc, serverTimestamp, doc, updateDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

// Use environment variable for API key
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface LipAnalysisResult {
  status: {
    level: "baik" | "perlu perhatian ringan" | "perlu perhatian";
    title: string;
    description: string;
  };
  visualMetrics: {
    hydrationLevel: number; // 0-100
    colorTone: "sehat" | "pucat" | "gelap";
    textureCondition: "halus" | "kering" | "pecah-pecah";
    smokingExposureIndicator: number; // 0-100
  };
  summaryInsights: string[];
  recommendedActions: {
    id: "hydration" | "smoking_pause" | "lip_care";
    title: string;
    description: string;
    suggestions: string[];
  }[];
  analysisConfidence: number;
}

export interface SavedLipScan extends LipAnalysisResult {
  id: string;
  createdAt: Date | Timestamp;
  imageUrl?: string; // Opsional: jika kamu upload fotonya ke Cloudinary
}

export const analyzeLipCondition = async (
  base64Image: string
): Promise<LipAnalysisResult> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", 
    });

  const prompt = `
  Kamu adalah AI visual self-awareness assistant dalam aplikasi Nirmala.
  Tugasmu adalah menganalisis foto bibir pengguna untuk memberikan umpan balik visual non-medis
  yang mendukung proses berhenti merokok.

  ATURAN UTAMA:
  - Jangan membuat diagnosis medis.
  - Jangan menyebut penyakit atau kondisi klinis.
  - Gunakan bahasa netral, suportif, dan reflektif.
  - Semua analisis bersifat estimasi visual, bukan kesimpulan pasti.

  HASIL ANALISIS harus membantu:
  - meningkatkan kesadaran diri
  - menunjukkan kondisi saat ini tanpa menghakimi
  - memberikan langkah sederhana yang bisa dilakukan segera

  OUTPUT WAJIB berupa RAW JSON, tanpa markdown, dengan struktur berikut:

  {
    "status": {
      "level": "baik" | "perlu perhatian ringan" | "perlu perhatian",
      "title": "judul singkat kondisi bibir",
      "description": "penjelasan singkat kondisi secara non-medis"
    },
    "visualMetrics": {
      "hydrationLevel": number (0-100),
      "colorTone": "sehat" | "pucat" | "gelap",
      "textureCondition": "halus" | "kering" | "pecah-pecah",
      "smokingExposureIndicator": number (0-100, indikator visual non-medis)
    },
    "summaryInsights": [
      "insight singkat berbasis observasi visual dan kebiasaan"
    ],
    "recommendedActions": [
      {
        "id": "hydration" | "smoking_pause" | "lip_care",
        "title": "judul tindakan",
        "description": "manfaat singkat tindakan",
        "suggestions": ["langkah praktis, maksimal 2"]
      }
    ],
    "analysisConfidence": number (0-1)
  }

  Jika kualitas gambar kurang jelas, turunkan analysisConfidence dan sesuaikan insight secara konservatif.
  `;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().trim();
    // Clean potential markdown blocks
    const jsonString = text.replace(/```json|```/g, "").trim();
    
    

    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Lip Scan Analysis Failed:", error);
    // Fallback in case of error (e.g., quota exceeded or network issue)
    return {
      status: {
        level: "perlu perhatian",
        title: "Gagal Menganalisis",
        description: "Terjadi kesalahan saat memproses gambar. Pastikan koneksi internet stabil."
      },
      visualMetrics: {
        hydrationLevel: 0,
        colorTone: "pucat",
        textureCondition: "kering",
        smokingExposureIndicator: 0
      },
      summaryInsights: ["Analisis tidak dapat diselesaikan."],
      recommendedActions: [
        {
          id: "hydration",
          title: "Coba Lagi Nanti",
          description: "Silakan ulangi pemindaian beberapa saat lagi.",
          suggestions: ["Periksa koneksi internet", "Pastikan pencahayaan cukup"]
        }
      ],
      analysisConfidence: 0
    };
  }
};

import { uploadImageToCloudinary } from "../utils/uploadImage";

export const saveScanResult = async (analysisData: LipAnalysisResult, imageUri: string | null = null) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User tidak terautentikasi");

    try {
      let finalImageUrl = imageUri;

      // 1. Upload ke Cloudinary jika imageUri adalah local path
      if (imageUri && (imageUri.startsWith('file://') || imageUri.startsWith('content://') || !imageUri.startsWith('http'))) {
          try {
              console.log("Uploading lip scan image...");
              finalImageUrl = await uploadImageToCloudinary(imageUri);
              console.log("Upload success:", finalImageUrl);
          } catch (uploadError) {
              console.error("Failed to upload image, saving without image URL:", uploadError);
              finalImageUrl = null; // Fallback: simpan tanpa gambar jika upload gagal
          }
      }

      // 2. Simpan ke Sub-collection
      const scanRef = collection(db, 'users', user.uid, 'lip_scans');
      
      const docRef = await addDoc(scanRef, {
        ...analysisData,
        imageUrl: finalImageUrl, 
        createdAt: serverTimestamp(),
      });

      // 3. Update Profil User (Optional tapi Recommended)
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        'healthStats.lastLipScanDate': serverTimestamp(),
        'healthStats.lastLipCondition': analysisData.status.level 
      });

      return docRef.id;

    } catch (error) {
      console.error("Error saving lip scan:", error);
      throw error;
    }
  }

  /**
   * 2. AMBIL HISTORY SCAN
   * Mengambil daftar riwayat scan user (misal untuk halaman 'Progress')
   */
  export const getScanHistory = async ()  : Promise<SavedLipScan[]> => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
      const scanRef = collection(db, 'users', user.uid, 'lip_scans');
      // Urutkan dari yang terbaru
      const q = query(scanRef, orderBy('createdAt', 'desc'), limit(20));
      
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as SavedLipScan));

    } catch (error) {
      console.error("Error fetching history:", error);
      return [];
    }
  }