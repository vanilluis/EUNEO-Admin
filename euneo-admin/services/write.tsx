// Firebase imports
import { db } from "../firebase/initFirebase";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
// Types
import { ExerciseFormData } from "../types/formTypes";
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

const firestoreWriteService = () => {
  return {
    addExercise: async (data: ExerciseFormData) => {
      const querySnapshot = await getDocs(collection(db, "exercises"));

      const exercises: Exercise[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<Exercise>) => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        })
      );

      const eid = _createExerciseId(data.name, exercises);
      const res = await fetch("/api/exercises/", {
        method: "POST",
        body: JSON.stringify({
          data: {
            eid,
            ...data,
          },
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log(eid);
    },
  };
};
export default firestoreWriteService();
