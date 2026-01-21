import { Question } from "../types/questionnaire";

export const QUESTIONNAIRE_QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Berapa batang rokok yang biasanya kamu hisap dalam sehari?",
    options: [
      { id: "q1_a", text: "1-10 batang", value: 1 },
      { id: "q1_b", text: "11-20 batang", value: 2 },
      { id: "q1_c", text: "21-30 batang", value: 3 },
      { id: "q1_d", text: "Lebih dari 30 batang", value: 4 },
    ],
  },
  {
    id: "q2",
    text: "Sudah berapa lama kamu merokok?",
    options: [
      { id: "q2_a", text: "Kurang dari 1 tahun", value: 1 },
      { id: "q2_b", text: "1-5 tahun", value: 2 },
      { id: "q2_c", text: "5-10 tahun", value: 3 },
      { id: "q2_d", text: "Lebih dari 10 tahun", value: 4 },
    ],
  },
  {
    id: "q3",
    text: "Kapan biasanya kamu paling sering merokok?",
    options: [
      { id: "q3_a", text: "Pagi hari setelah bangun tidur", value: 1 },
      { id: "q3_b", text: "Setelah makan", value: 2 },
      { id: "q3_c", text: "Saat istirahat kerja", value: 3 },
      { id: "q3_d", text: "Malam hari sebelum tidur", value: 4 },
    ],
  },
  {
    id: "q4",
    text: "Apa pemicu utama kamu untuk merokok?",
    options: [
      { id: "q4_a", text: "Stres atau cemas", value: 1 },
      { id: "q4_b", text: "Berkumpul dengan teman", value: 2 },
      { id: "q4_c", text: "Kebiasaan setelah makan", value: 3 },
      { id: "q4_d", text: "Bosan atau tidak ada kegiatan", value: 4 },
    ],
  },
  {
    id: "q5",
    text: "Apakah kamu pernah mencoba berhenti merokok sebelumnya?",
    options: [
      { id: "q5_a", text: "Belum pernah", value: 1 },
      { id: "q5_b", text: "1-2 kali", value: 2 },
      { id: "q5_c", text: "3-5 kali", value: 3 },
      { id: "q5_d", text: "Lebih dari 5 kali", value: 4 },
    ],
  },
  {
    id: "q6",
    text: "Apa motivasi utama kamu ingin berhenti merokok?",
    options: [
      { id: "q6_a", text: "Kesehatan diri sendiri", value: 1 },
      { id: "q6_b", text: "Keluarga dan orang tersayang", value: 2 },
      { id: "q6_c", text: "Menghemat uang", value: 3 },
      { id: "q6_d", text: "Penampilan dan kebersihan", value: 4 },
    ],
  },
  {
    id: "q7",
    text: "Seberapa yakin kamu bisa berhenti merokok?",
    options: [
      { id: "q7_a", text: "Sangat yakin", value: 4 },
      { id: "q7_b", text: "Cukup yakin", value: 3 },
      { id: "q7_c", text: "Kurang yakin", value: 2 },
      { id: "q7_d", text: "Tidak yakin sama sekali", value: 1 },
    ],
  },
  {
    id: "q8",
    text: "Apakah ada orang terdekat yang mendukung kamu berhenti merokok?",
    options: [
      { id: "q8_a", text: "Ya, keluarga dan teman", value: 4 },
      { id: "q8_b", text: "Ya, hanya keluarga", value: 3 },
      { id: "q8_c", text: "Ya, hanya teman", value: 2 },
      { id: "q8_d", text: "Tidak ada", value: 1 },
    ],
  },
  {
    id: "q9",
    text: "Bagaimana kondisi kesehatanmu saat ini?",
    options: [
      { id: "q9_a", text: "Sangat sehat", value: 4 },
      { id: "q9_b", text: "Cukup sehat", value: 3 },
      { id: "q9_c", text: "Ada keluhan ringan (batuk, sesak)", value: 2 },
      { id: "q9_d", text: "Ada masalah kesehatan serius", value: 1 },
    ],
  },
  {
    id: "q10",
    text: "Kapan kamu ingin mulai berhenti merokok?",
    options: [
      { id: "q10_a", text: "Sekarang juga", value: 4 },
      { id: "q10_b", text: "Minggu depan", value: 3 },
      { id: "q10_c", text: "Bulan depan", value: 2 },
      { id: "q10_d", text: "Belum tahu pasti", value: 1 },
    ],
  },
];
