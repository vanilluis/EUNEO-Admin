import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../admin";
const db = admin.firestore();
const storage = admin.storage();

const createSubcollections = async (pid: string, days, phases) => {
  const progDoc = db.collection("programs").doc(pid);
  const daysRes = await Promise.all(
    Object.keys(days).map((dayId) => {
      try {
        const exercises = days[dayId].exercises.map((e) => {
          const exRef = db.collection("exercises").doc(e.id);
          return {
            reference: exRef,
            reps: e.reps,
            sets: e.sets,
            quantity: e.quantity,
          };
        });
        progDoc.collection("days").doc(dayId).set({
          exercises: exercises,
        });
        return true;
      } catch (error) {
        return false;
      }
    })
  );

  const phasesRes = await Promise.all(
    Object.keys(phases).map(async (phaseId) => {
      try {
        const days = phases[phaseId].days.map((d) => {
          const dayRef = progDoc.collection("days").doc(d);
          return dayRef;
        });
        const nextPhases = phases[phaseId]["next-phase"].map((np) => {
          const npRef = progDoc.collection("phases").doc(np.reference);
          return { ...np, reference: npRef || null };
        });
        const phaseDoc = await progDoc.collection("phases").doc(phaseId).set({
          days: days,
          length: phases[phaseId].length,
          "next-phase": nextPhases,
        });

        return true;
      } catch (error) {
        console.log(error);

        return false;
      }
    })
  );

  const daySubSuccess = daysRes.filter((daySuccess) => daySuccess);
  const phaseSubSuccess = phasesRes.filter((phaseSuccess) => phaseSuccess);

  return (
    daySubSuccess.length === daysRes.length &&
    phaseSubSuccess.length === phasesRes.length
  );
};

export default async function previewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { pid, data, days, phases } = req.body;
    console.log(pid, data, days, phases);

    const programDocSuccess = await db
      .collection("programs")
      .doc(pid)
      .set({
        name: data.name,
      })
      .then(() => {
        console.log("Document successfully written!");
        return true;
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        return false;
      });

    if (programDocSuccess) {
      const subCollectionSuccess = await createSubcollections(
        pid,
        days,
        phases
      );
      if (subCollectionSuccess) {
        return res.status(201).send({ msg: "Document successfully created." });
      }
      return res.status(500).send({ msg: "Error creating subcollection." });
    } else {
      return res.status(500).send({ msg: "Error writing document." });
    }
  }
}
