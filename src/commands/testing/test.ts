import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";

export function run(client:Client, message:Message) {
  return client.clientInstances!.sendText(message.chatId, "Pong!");
}

export const name = "test";
