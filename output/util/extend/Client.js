import { create } from "@open-wa/wa-automate";
import { prefix } from "../settings";
import { LoadCommands } from "../handle";
export class Client {
    constructor(options) {
        this.options = options;
    }
    async start() {
        const Client = await create(this.options);
        await this.assignProperty();
        this.clientInstances = Client;
        return this.clientInstances;
    }
    async assignProperty() {
        this.commands = await LoadCommands();
        return;
    }
    get client() {
        if (!this.clientInstances)
            throw Error("No client initializedf");
        return this.clientInstances;
    }
    parseMessage(msg) {
        let text = msg.body;
        if (msg.type !== "chat") {
            text = "";
            if (msg.isMedia) {
                text = msg.caption;
                if (!msg.caption) {
                    text = "";
                }
            }
        }
        const isPrefixed = text.startsWith(prefix) ? true : false;
        const args = isPrefixed ? text.slice(prefix.length).split(" ") : text.split(" ");
        const first = args.shift()?.toLowerCase();
        let isCommand = false;
        if (isPrefixed) {
            if (this.commands.find((o) => o.name === first)) {
                isCommand = true;
            }
        }
        return { text, isCommand, args, first };
    }
    handleCommand(client, msg) {
        const parsedMessage = client.parseMessage(msg);
        if (parsedMessage.isCommand) {
            const commands = client.commands?.find((o) => o.name === parsedMessage.first);
            commands?.run(client, msg);
        }
    }
}
