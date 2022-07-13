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
  days: Array<any>;
  phases: Array<any>;
  videos: Array<any>;
};

export const defaultProgramData: ProgramFormData = {
  name: "",
  days: [],
  phases: [],
  videos: [],
};

export type ExerciseType = "strength" | "stretch" | "release" | "other";

export const exerciseTypes: ExerciseType[] = [
  "strength",
  "stretch",
  "release",
  "other",
];
