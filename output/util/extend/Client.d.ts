import Collection from "@discordjs/collection";
import { ConfigObject, AdvancedConfig, Client as WaClient, Message } from "@open-wa/wa-automate";
import { commandInterface } from "../handle";
export declare class Client {
    options: ConfigObject | AdvancedConfig | undefined;
    clientInstances?: WaClient;
    commands?: Collection<string, commandInterface>;
    constructor(options?: ConfigObject | AdvancedConfig);
    start(): Promise<WaClient>;
    private assignProperty;
    get client(): WaClient;
    parseMessage(msg: Message): {
        text: string;
        isCommand: boolean;
        args: string[];
        first: string | undefined;
    };
    handleCommand(client: this, msg: Message): void;
}
