import {Message, decryptMedia} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";

export async function run(client:Client, message:Message) {
  if ((message.isMedia && message.type === "image") || (message.quotedMsg && message.quotedMsg.type === "image")) {
    let msg = message;
    let mediaData;
    if (message.isMedia) {
      mediaData = await decryptMedia(message, "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36");
    } else {
      msg = (message.quotedMsg as Message);
      mediaData = await decryptMedia(message.quotedMsg as Message, "WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36");
    }
    console.log(mediaData.byteLength);
    // const imgBS4 = `data:${msg.mimetype};base64,${mediaData.toString('base64')}`
    client.clientInstances!.sendText(msg.chatId, "Searching....");
    try {
      fetch("https://api.trace.moe/search", {
        method: "POST",
        body: mediaData,
        headers: {"Content-Type": "image/jpeg"},
      }).then((res) => res.json())
          .then(async (resolt) => {
            if (!resolt.result || (resolt.result && resolt.result.length <= 0)) {
              console.log(resolt);
              return client.clientInstances!.sendText(msg.chatId, "Sorry, could not find the similar anime");
            }

            const searchResult = resolt;
            if (!searchResult || !searchResult.result || !searchResult.result[0]) return client.clientInstances!.reply(message.chatId, "No Anime founded", message.id);
            const {
              anilist,
              similarity,
              filename,
              from,
              video,
            } = searchResult.result[0];
            const {
              title,
            } = (await getAnilistInfo(
                anilist,
            ) as Anime);

            const {
              chinese,
              english,
              native,
              romaji,
            } = title;

            let text = "";
            text += [native, chinese, romaji, english]
                .filter((e) => e)
                .reduce(
                    // deduplicate titles
                    (acc, cur) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              acc.map((e) => (e as string).toLowerCase()).includes(cur.toLowerCase()) ? acc : [...acc, cur] as any,
                    [],
                )
                .map((t) => `\`${t}\``)
                .join("\n");
            text += "\n";
            text += `\`${filename.replace(/`/g, "``")}\`\n`;
            text += `\`${formatTime(from)}\`\n`;
            text += `\`${(similarity * 100).toFixed(1)}% similarity\`\n`;
            client.clientInstances!.sendText(msg.chatId, text);
            client.clientInstances!.sendFileFromUrl(msg.chatId, video, `${filename}.mp4`, text, msg.id);
          }).catch( (err) => {
            console.log(err);
            client.clientInstances!.sendText(message.chatId, "Error, image to beeg");
          });
    } catch (e) {
      client.clientInstances!.sendText(message.chatId, "Error, Image to beeg");
    }
  } else {
    client.clientInstances!.sendText(message.chatId, "Gimmie some pic stupid");
  }
}


const formatTime = (timeInSeconds:string) => {
  const sec_num = Number(timeInSeconds);
  const hours = Math.floor(sec_num / 3600)
      .toString()
      .padStart(2, "0");
  const minutes = Math.floor((sec_num - (hours as unknown as number) * 3600) / 60)
      .toString()
      .padStart(2, "0");
  const seconds = (sec_num - (hours as unknown as number) * 3600 - (minutes as unknown as number) * 60).toFixed(0).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

  interface Anime {
      isAdult: boolean,
      title: {
          english: string,
          native: string,
          romaji: string,
          chinese: string,
      }
      episode: number,
      similarity: number,
      filename: string,
      at: string,
      tokenthumb: string,
      anilist_id: string
  }


const getAnilistInfo = (id:string) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const response = await fetch("https://graphql.anilist.co/", {
      method: "POST",
      body: JSON.stringify({
        query: `query($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              idMal
              title {
                native
                romaji
                english
              }
              synonyms
              isAdult
            }
          }
          `,
        variables: {
          id,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status >= 400) {
      console.error(1070, response.status, await response.text());
      return resolve({
        text: "`Anilist API error, please try again later.`",
      });
    }
    return resolve((await response.json()).data.Media);
  });

export const name = "whatanime";
export const alias = ["wait", "whatisthisanime"];
