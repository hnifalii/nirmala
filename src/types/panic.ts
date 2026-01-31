export type PanicPhase =
  | "idle"
  | "countdown"
  | "challenge"
  | "camera"
  | "validating"
  | "success_overlay"
  | "failure_overlay"
  | "timeout_overlay"
  | "uploading"
  | "post_intervention_1"
  | "post_intervention_2"
  | "post_intervention_3"
  | "done";

export type ChallengeItem = {
  id: number;
  name: string;
  icon: string;
  imageUrl: string;
};
