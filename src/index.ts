import {Client} from "./util/extend/Client.js";
import "dotenv/config";

const client = new Client({
  authTimeout: 0,
  qrTimeout: 0,
  multiDevice: true,
  popup: true,
  licenseKey: process.env.Lisences,
});

client.start().then((clientInstance)=>{
  clientInstance.onAnyMessage((msg)=>{
    client.handleCommand(client, msg);
  });
});
