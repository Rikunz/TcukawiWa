import {Client} from "./util/extend/Client.js";
import "dotenv/config";
import * as settings from "./util/settings.js";

const client = new Client({
  authTimeout: 0,
  qrTimeout: 0,
  multiDevice: true,
  popup: true,
  licenseKey: settings.Lisences,
  useChrome: settings.useChrome || false,
}, {
  mongoUrl: settings.MongoURL,
});

client.start().then((clientInstance)=>{
  clientInstance.onAnyMessage((msg)=>{
    client.handleCommand(client, msg);
  });
});
