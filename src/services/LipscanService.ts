import { GoogleGenerativeAI } from "@google/generative-ai";

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
