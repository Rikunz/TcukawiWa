import { Message } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";
import { daring } from "../../util/daring.js";

export async function run(client: Client, message: Message) {
    const { args } = client.parseMessage(message);
    const data = await daring(args[0]);
    client.clientInstances?.sendText(message.chatId, JSON.stringify(data));
}


export const name = "daring";
export const description = "informasi daring";
export const alias = ["daring"];