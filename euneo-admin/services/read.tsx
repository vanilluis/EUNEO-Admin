// Firebase imports
import { db } from "../firebase/initFirebase";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
// Types
import { Exercise } from "../types/types";

const firestoreReadService = () => {
  return {
    getExercises: async () => {
      const querySnapshot = await getDocs(collection(db, "exercises"));

      const exercises: Exercise[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<Exercise>) => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        })
      );

      return exercises;
    },
    getUploadURL: async () => {
      try {
        return fetch("/api/video/upload", {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data: { id: string; url: string }) => {
            return data;
          });
      } catch (e) {
        console.error("Error in createUpload", e);
        return null;
      }
    },
  };
};
export default firestoreReadService();
