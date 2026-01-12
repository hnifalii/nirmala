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
  selectedOptionId: string;
}

export interface QuestionnaireState {
  currentIndex: number;
  answers: QuestionnaireAnswer[];
  isCompleted: boolean;
}
