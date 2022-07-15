// Firebase imports
import { db } from "../firebase/initFirebase";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
// 3rd party libraries
import * as UpChunk from "@mux/upchunk";
// Types
import {
  ExerciseFormData,
  ProgramDay,
  ProgramFormData,
  ProgramPhase,
} from "../types/formTypes";
import { Exercise } from "../types/types";

const _createExerciseId = (exerciseName: string, exercises: Exercise[]) => {
  const idList = exercises.map((ex) => {
    const id = ex.id;
    return parseInt(id.split("-")[0]);
  });

  const highestID = Math.max(...idList);
  const nameLower = exerciseName.trim().toLowerCase().split(" ").join("-");

  return `${highestID + 1}-${nameLower}`;
};

const _createProgramId = (programName: string) => {
  const nameList = programName.trim().toLowerCase().split(" ");
  const pid = nameList.join("-");

  return pid;
};

const _mapDays = (days: ProgramDay[]) => {
  let daysMap = {};
  days.forEach((day, index) => {
    daysMap[`d${index + 1}`] = { ...day };
  });

  return daysMap;
};

const _mapPhases = (phases: ProgramPhase[]) => {
  let phaseMap = {};
  phases.forEach((phase, index) => {
    phaseMap[`p${index + 1}`] = { ...phase };
  });

  return phaseMap;
};

const firestoreWriteService = () => {
  return {
    addProgram: async (data: ProgramFormData) => {
      const pid = _createProgramId(data.name);
      const mappedDays = _mapDays(data.days);
      const mappedPhases = _mapPhases(data.phases);

      const response = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pid,
          data,
          days: mappedDays,
          phases: mappedPhases,
        }),
      });

      if (response.ok) {
        return { success: true, message: "Successfully created program!" };
      }
      return {
        success: false,
        message: `Program could not be created. ${response.statusText}`,
      };
    },
    addExercise: async (
      data: ExerciseFormData,
      videoData: { displayID: string; assetID: string } | null
    ) => {
      const querySnapshot = await getDocs(collection(db, "exercises"));

      const exercises: Exercise[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<Exercise>) => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        })
      );

      const steps = data.steps.filter((step) => step.length > 0);
      const tips = data.tips.filter((tip) => tip.length > 0);

      const eid = _createExerciseId(data.name, exercises);
      const res = await fetch("/api/exercises/", {
        method: "POST",
        body: JSON.stringify({
          data: {
            eid,
            ...data,
            steps,
            tips,
            videoLink: videoData,
          },
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        return { success: true, message: "Successfully created exercise!" };
      }
      return {
        success: false,
        message: `Exercise could not be created. ${res.statusText}`,
      };
    },
    addVideo: async (
      file: File,
      uploadData: { id: string; url: string },
      updateProgress: (value: React.SetStateAction<number>) => void,
      formCallback: Function,
      errorCallback: Function
    ) => {
      let status = "";

      // Start uploading file to MUX
      const upload = UpChunk.createUpload({
        endpoint: uploadData.url,
        file,
      });

      // Event listeners
      upload.on("error", (err) => {
        status = "error";
        console.log("Error ", err);
        errorCallback(err);
      });

      upload.on("progress", (progress) => {
        if (status !== "success" && status !== "error") {
          status = "progress";
          if (progress.detail <= 50) {
            updateProgress(Math.floor(progress.detail * 2));
          } else {
            updateProgress((p: number) =>
              p < progress.detail ? Math.floor(progress.detail) : p
            );
          }
        }
        console.log("progress", progress);
      });

      upload.on("success", async () => {
        // Get video displayID and assetID
        const data = await fetch("/api/video", {
          method: "POST",
          body: JSON.stringify({
            uploadID: uploadData.id,
          }),
        });
        if (data.ok) {
          const videoData = await data.json();

          // TODO: save to firestore
          console.log(videoData);
          formCallback(videoData);
        }
      });
    },
  };
};
export default firestoreWriteService();
