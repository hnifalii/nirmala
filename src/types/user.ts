import { FieldValue } from "firebase/firestore";

export interface UserStats {
    currentStreak: number;
    totalMoneySaved: number;
    healthProgress: number;
    lastRelapse: FieldValue | null;
    totalCigarettesAvoided: number;
    totalActivitiesCompleted: number;
}

export interface UserInitialData {
  uid: string;
  fullName: string;
  email: string | null;
  joinedAt: FieldValue;
  isOnboardingCompleted: boolean;
  stats: UserStats;
}
