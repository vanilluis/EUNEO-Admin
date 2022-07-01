export type ExerciseFormData = {
  name: string;
  type: string;
  steps: Array<string>;
  tips: Array<string>;
  videoLink: string;
};

export const defaultFormData: ExerciseFormData = {
  name: "",
  type: "",
  steps: [],
  tips: [],
  videoLink: "",
};
