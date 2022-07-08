import Collection from "@discordjs/collection";
import {ConfigObject, AdvancedConfig, create, Client as WaClient, Message} from "@open-wa/wa-automate";
import {prefix} from "../settings.js";
import {LoadCommands, commandInterface} from "../handle.js";

export class Client {
  options: ConfigObject | AdvancedConfig | undefined;
  clientInstances?: WaClient;
  commands?: Collection<string, commandInterface>;
  constructor(options?:ConfigObject|AdvancedConfig) {
    this.options = options;
  }

  async start() {
    const Client = await create(this.options);
    await this.assignProperty();
    this.clientInstances = Client;
    return this.clientInstances;
  }

  private async assignProperty() {
    this.commands = await LoadCommands();
    return;
  }

  get client() {
    if (!this.clientInstances) throw Error("No client initializedf");
    return this.clientInstances;
  }

  parseMessage(msg:Message) {
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

    const isPrefixed= text.startsWith(prefix) ? true : false;

    const args = isPrefixed ? text.slice(prefix.length).split(" ") : text.split(" ");
    const first = args.shift()?.toLowerCase();
    let isCommand = false;
    if (isPrefixed) {
      if (this.commands!.find((o)=>o.name === first)) {
        isCommand = true;
      }
    }
    return {text, isCommand, args, first};
  }

  handleCommand(client:this, msg:Message) {
    const parsedMessage = client.parseMessage(msg);
    if (parsedMessage.isCommand) {
      const commands = client.commands?.find((o)=> o.name === parsedMessage.first);
      commands?.run(client, msg);
    }
  }
}
