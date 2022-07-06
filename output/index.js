import { Client } from "./util/extend/Client";
const client = new Client({
    authTimeout: 0,
    qrTimeout: 0,
    multiDevice: true,
    popup: true,
});
client.start().then((clientInstance) => {
    clientInstance.onAnyMessage((msg) => {
        client.handleCommand(client, msg);
    });
});
