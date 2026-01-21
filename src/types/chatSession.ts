import { FieldValue } from "firebase/firestore";

export interface ChatSession {
    id: string;
    isActive: boolean;
    title: string;
    previewText: string;
    createdAt: FieldValue;
    lastUpdatedAt: FieldValue;
};