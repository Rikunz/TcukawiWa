import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
import {enkashin} from "../../util/enka.js";
export async function run(client:Client, message:Message) {
const {args} = client.parseMessage(message);
const get_data_shin = await enkashin(Number(args[0]));
  const teks = `informasi tentang id genshin ini:\n\nickname: *${get_data_shin.nickname}*\nSignature: *${get_data_shin.signature}*\level: *${get_data_shin.level}*\nameCard: *${get_data_shin.nameCard}*\achievements: *${get_data_shin.achievements}*\abyssFloor: *${get_data_shin.abyssFloor}*\abyssLevel: *${get_data_shin.abyssLevel}*`.trim();

  client.clientInstances?.sendText(message.chatId, teks);
}

