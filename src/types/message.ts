import { FieldValue } from "firebase/firestore";

export interface Message {
    sender: string;
    text: string;
    timestamp: FieldValue;
};