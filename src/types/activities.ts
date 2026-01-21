export interface Activity {
  id: string;
  title: string;
  duration: string;
  description: string;
  color: string;
  sections: ActivitySection[];
}

export interface ActivitySection {
  type: "intro" | "start" | "action" | "end" | "complete" | "retry";
  duration: number; // in milliseconds
  title?: string;
  description?: string;
  subtitle?: string;
  helperText?: string;
  buttons?: Array<{ label: string; action: string }>;
}
