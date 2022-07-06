import { Collection } from "@discordjs/collection";
import { Message } from "@open-wa/wa-automate";
import { Client } from "./extend/Client";
export declare function LoadCommands(): Promise<Collection<string, commandInterface>>;
export interface commandInterface {
    name: string;
    alias: string[];
    category: string;
    filepath: string;
    description: string;
    run: (Client: Client, Message: Message) => void;
}
