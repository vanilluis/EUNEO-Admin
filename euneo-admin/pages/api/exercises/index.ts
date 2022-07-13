import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../admin";
const db = admin.firestore();
const storage = admin.storage();

export default async function previewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data } = req.body;
    const eid = data.eid;

    delete data.eid;

    const success = await db
      .collection("exercises")
      .doc(eid)
      .set(data)
      .then(() => {
        console.log("Document successfully written!");
        return true;
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        return false;
      });

    if (success) {
      return res.status(201).send({ msg: "Document successfully created." });
    } else {
      return res.status(500).send({ msg: "Error writing document." });
    }
  }
}
