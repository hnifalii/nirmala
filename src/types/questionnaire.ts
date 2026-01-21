export interface QuestionOption {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionnaireAnswer {
  questionId: string;
  questionText: string;
  selectedOptionId: string;
  selectedOptionText: string;
}

export interface QuestionnaireState {
  currentIndex: number;
  answers: QuestionnaireAnswer[];
  isCompleted: boolean;
}

export interface QuestionnaireData {
  questionText: string;
  selectedOptionText: string;
}