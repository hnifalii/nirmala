import { Activity } from "../types/activities";

export const ACTIVITIES: Activity[] = [
  {
    id: "ruang-kendali",
    title: "Ruang Kendali",
    duration: "2 menit",
    description:
      "Memberi jeda sejenak pada dorongan sambil menenangkan nafas dan tubuh.",
    color: "#3B82F6",
    sections: [
      {
        type: "intro",
        duration: 3000,
        title: "Ruang Kendali",
        description:
          "Memberi jeda sejenak pada dorongan sambil menenangkan nafas dan tubuh.",
      },
      {
        type: "start",
        duration: 3000,
        subtitle: "Mulai...",
      },
      {
        type: "action",
        duration: 4000,
        subtitle: "Tarik nafas",
        helperText: "4 nafas tersisa",
      },
      {
        type: "action",
        duration: 5000,
        subtitle: "Tahan...",
        helperText: "4 nafas tersisa",
      },
      {
        type: "action",
        duration: 3000,
        subtitle: "Buang nafas",
        helperText: "3 nafas tersisa",
      },
      {
        type: "action",
        duration: 4000,
        subtitle: "Tarik nafas",
        helperText: "3 nafas tersisa",
      },
      {
        type: "action",
        duration: 5000,
        subtitle: "Tahan...",
        helperText: "3 nafas tersisa",
      },
      {
        type: "action",
        duration: 3000,
        subtitle: "Buang nafas",
        helperText: "2 nafas tersisa",
      },
      {
        type: "action",
        duration: 4000,
        subtitle: "Tarik nafas",
        helperText: "2 nafas tersisa",
      },
      {
        type: "action",
        duration: 5000,
        subtitle: "Tahan...",
        helperText: "2 nafas tersisa",
      },
      {
        type: "action",
        duration: 3000,
        subtitle: "Buang nafas",
        helperText: "1 nafas tersisa",
      },
      {
        type: "action",
        duration: 4000,
        subtitle: "Tarik nafas",
        helperText: "1 nafas tersisa",
      },
      {
        type: "action",
        duration: 5000,
        subtitle: "Tahan...",
        helperText: "1 nafas tersisa",
      },
      {
        type: "action",
        duration: 3000,
        subtitle: "Buang nafas",
        helperText: "Selesai",
      },
      {
        type: "end",
        duration: 0,
        title: "Bagaimana rasanya sekarang?",
        buttons: [
          { label: "Sudah lebih tenang", action: "well" },
          { label: "Masih terasa sedikit", action: "unwell" },
        ],
      },
      {
        type: "complete",
        duration: 0,
        title: "Bagus. Kamu sudah melewati momen ini",
        buttons: [{ label: "Selesai", action: "finish" }],
      },
      {
        type: "retry",
        duration: 0,
        title: "Oke, kami bantu pelan pelan...",
        buttons: [
          { label: "Lanjutkan jeda sebentar", action: "retry" },
          { label: "Kembali ke Halaman", action: "home" },
        ],
      },
    ],
  },
  {
    id: "mindful-walk",
    title: "Mindful Walk",
    duration: "3 menit",
    description: "Jalan dengan sadar dan rasakan setiap langkah.",
    color: "#10B981",
    sections: [
      {
        type: "intro",
        duration: 2000,
        title: "Mindful Walk",
        description: "Jalan dengan sadar dan rasakan setiap langkah.",
      },
      {
        type: "start",
        duration: 1500,
        subtitle: "Mulai",
      },
      {
        type: "action",
        duration: 4000,
        subtitle: "Berjalan perlahan",
      },
      {
        type: "action",
        duration: 4000,
        subtitle: "Rasakan setiap langkah",
      },
      {
        type: "end",
        duration: 0,
        title: "Bagaimana rasanya sekarang?",
        buttons: [
          { label: "Lebih fokus", action: "well" },
          { label: "Masih gelisah", action: "unwell" },
        ],
      },
    ],
  },
];
