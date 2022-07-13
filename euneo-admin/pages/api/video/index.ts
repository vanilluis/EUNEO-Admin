import Mux from "@mux/mux-node";
import { NextApiRequest, NextApiResponse } from "next";
import { encode } from "js-base64";
const { Video } = new Mux(
  process.env.MUX_ACCESS_TOKEN_ID,
  process.env.MUX_SECRET_KEY
);

const _getDisplayID = (id: string) => {
  return new Promise(function (resolve) {
    const interval = setInterval(async function () {
      const resp = await Video.Assets.get(id);

      if (resp.status === "ready") {
        var myHeaders = new Headers();
        myHeaders.append("'Content-Type'", "application/json");
        myHeaders.append(
          "Authorization",

          `Basic ${encode(
            process.env.MUX_ACCESS_TOKEN_ID + ":" + process.env.MUX_SECRET_KEY
          )}`
        );
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("policy", "public");

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          //   redirect: 'follow'
        };

        const displayID = await fetch(
          `https://api.mux.com/video/v1/assets/${id}/playback-ids`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            return result.data.id;
          })
          .catch((error) => console.log("error", error));

        clearInterval(interval);
        resolve(`https://stream.mux.com/${displayID}.m3u8`);
      }
    }, 1000);
  });
};

const _getAssets = async () => {
  var myHeaders = new Headers();
  myHeaders.append("'Content-Type'", "application/json");
  myHeaders.append(
    "Authorization",
    `Basic ${encode(
      process.env.MUX_ACCESS_TOKEN_ID + ":" + process.env.MUX_SECRET_KEY
    )}`
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const assets = await fetch(
    "https://api.mux.com/video/v1/assets/?limit=50",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return [];
    });
  return assets;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const assets = await _getAssets();
      return res.send(assets);
    } else if (req.method === "POST") {
      // Fetch newly uploaded video
      const uploadID = JSON.parse(req.body).uploadID;

      const upload = await Video.Uploads.get(uploadID);

      // If video is found, wait for it to be ready to return its url and data
      if (upload && upload.asset_id) {
        const url = (await _getDisplayID(upload.asset_id)) as string;
        console.log("Sending back response!");

        return res
          .status(200)
          .json({ displayID: url, assetID: upload.asset_id });
      }
    } else if (req.method === "DELETE") {
      const assetID = JSON.parse(req.body).assetID;
      var myHeaders = new Headers();
      myHeaders.append("'Content-Type'", "application/json");
      myHeaders.append(
        "Authorization",
        `Basic ${encode(
          process.env.MUX_TOKEN_ID + ":" + process.env.MUX_TOKEN_SECRET
        )}`
      );
      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
      };

      const response = await fetch(
        `https://api.mux.com/video/v1/assets/${assetID}`,
        requestOptions
      );
      if (response.ok) {
        return res.status(204).send("");
      } else {
        return res.status(500).send("Something went wrong");
      }
    } else {
      return res.status(400).send("API route does not exist!");
    }
  } catch (error) {
    console.error("error", error);
    res.status(500).send("Something went wrong");
  }
};
