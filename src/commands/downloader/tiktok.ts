import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
import {tiktok} from "../../util/tiktok.js";
export async function run(client:Client, message:Message) {
  const {args} = client.parseMessage(message);
  const resTiktok = await tiktok(args[0]);
  if (typeof resTiktok === "string") {
    return client.clientInstances!.sendText(message.chatId, "Error has been found");
  }

  client.clientInstances?.sendFileFromUrl(message.chatId, resTiktok.noWM, "tiktok", resTiktok.caption);
}

export const name = "tiktok";
export const description = "download tiktok content";
export const alias = ["ttdl", "tikdl"];
