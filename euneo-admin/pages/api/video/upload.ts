import Mux from "@mux/mux-node";
import { NextApiRequest, NextApiResponse } from "next";
const { Video } = new Mux(
  process.env.MUX_ACCESS_TOKEN_ID,
  process.env.MUX_SECRET_KEY
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const upload = await Video.Uploads.create({
      cors_origin: "*",
      new_asset_settings: {
        playback_policy: "public",
      },
    }).catch((err) => {
      console.error(err);
    });

    if (upload) return res.send({ id: upload.id, url: upload.url });
    else return res.status(500).send("Something went wrong mister");
  } else {
    return res.status(400).send("API route does not exist!");
  }
};
