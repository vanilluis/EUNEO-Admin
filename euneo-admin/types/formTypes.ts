export type ExerciseFormData = {
  name: string;
  type: string;
  steps: Array<string>;
  tips: Array<string>;
  videoLink: VideoLink;
};

export type VideoLink = {
  id?: string;
  type: "file";
  file?: File | null;
};

export const defaultFormData: ExerciseFormData = {
  name: "",
  type: "strength",
  steps: [],
  tips: [],
  videoLink: {
    id: "videoLink",
    type: "file",
    file: null,
  },
};

export type ProgramFormData = {
  name: string;
  days: Array<ProgramDay>;
  phases: Array<ProgramPhase>;
  videos: Array<VideoLink>;
};

export type ProgramPhase = {
  days: Array<string>;
  length: number;
  "next-phase": Array<{
    "max-pain": number;
    "min-pain": number;
    reference: string;
  }>;
};

export type ProgramDay = {
  exercises: Array<ProgramExercise>;
};

export type ProgramExercise = {
  id: string;
  name: string;
  reps: number;
  sets: number;
  quantity: number;
};

export const defaultProgramData: ProgramFormData = {
  name: "",
  days: [],
  phases: [],
  videos: [],
};

export const defaultProgramPhase = { days: [], length: 1, "next-phase": [] };

export const defaultProgramExercise = {
  id: "",
  name: "",
  reps: 0,
  sets: 0,
  quantity: 0,
};
export type ExerciseType = "strength" | "stretch" | "release" | "other";

export const exerciseTypes: ExerciseType[] = [
  "strength",
  "stretch",
  "release",
  "other",
];
