import { Message } from "@open-wa/wa-automate";
import { Client } from "../../util/extend/Client";

export async function run(client: Client, message: Message) {
    client.clientInstances!.sendText(message.chatId, "Open AI-{Ask/Tanya/Bot/AI} \n What anime is this?-{Wait/whatanimeisthis} \n IG Downloader-{igdl/ig} \n Pinterest-{pindl} \n Tiktok-{ttdl/tikdl} \n Info Gempa-{infogempa} \n In development: \n Youtube Video-{ytdl} \n YT Music-{ytmp3/ytdlmp3}");
}

export const name = "menu";
export const description = "Commands Menu or redirecting to web";
export const alias = ["help"];
