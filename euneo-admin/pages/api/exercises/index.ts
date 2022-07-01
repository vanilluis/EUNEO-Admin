import { NextApiRequest, NextApiResponse } from "next";

export default async function previewHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data } = req.body;

    console.log(data);

    return res.send(200);
  }
}
