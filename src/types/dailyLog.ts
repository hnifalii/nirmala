import { FieldValue } from "firebase/firestore";

export interface DailyLog {
    cigarettesSmoked: number;
    date: string;
    moneySaved: number;
    success: boolean;
};

export interface DailyLogInput {
  cigarettesSmoked: number;
  targetPerDay: number;
  costPerCigarette: number;
}

export interface LogData {
    date: string;
    timestamp: FieldValue;
    cigarettesSmoked: number;
    notes: string;
    moneySaved: number;
    status: string;
};