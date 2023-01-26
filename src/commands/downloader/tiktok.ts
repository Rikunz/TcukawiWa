import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
import axios from "axios";
import {tiktok} from "../../util/tiktok.js";
export async function run(client:Client, message:Message) {
  const {args} = client.parseMessage(message);
  const resTiktok = await tiktok(args[0]);
  if (typeof resTiktok === "string") {
    return client.clientInstances!.sendText(message.chatId, "Error has been found");
  }

  client.clientInstances?.sendFileFromUrl(message.chatId, resTiktok.noWM, "tiktok", resTiktok.caption);
  client.clientInstances?.sendImage(message.chatId, bufferToDataUrl("video/mp4", (await getVideo(resTiktok.noWM))), "tiktok.mp4", resTiktok.caption);
}

function bufferToDataUrl(mimetype: string, buffer: Buffer): string {
  return `data:${mimetype};base64,${buffer.toString("base64")}`;
}
async function getVideo(url:string) {
  try {
    const response = await axios({
      method: "get",
      url: url,
      responseType: "arraybuffer",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
}


export const name = "tiktok";
export const description = "download tiktok content";
export const alias = ["ttdl", "tikdl"];
