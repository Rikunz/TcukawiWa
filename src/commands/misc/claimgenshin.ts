import {Message} from "@open-wa/wa-automate";
import {Client} from "../../util/extend/Client";
import axios from "axios";
export async function run(client:Client, message:Message) {
  const {args} = client.parseMessage(message);
  client.clientInstances!.sendText(message.chatId, (await login(args[0], client)));
  return;
}

async function login(code:string, client:Client) {
  const cookie = {
    cookie_token: client.secret.env.token,
    account_id: client.secret.env.account_id,
    uid: client.secret.env.uid,
  };

  const url = `https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?uid=${cookie.uid}&region=os_asia&lang=en&cdkey=${code}&game_biz=hk4e_global`;
  const data = await axios.get(url, {
    headers: {
      "Cookie": `cookie_token=${cookie.cookie_token}; account_id=${cookie.account_id}`,
    },
  });
  return JSON.stringify(data.data);
}

export const name = "claimgenshin";
