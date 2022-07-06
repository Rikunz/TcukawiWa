import { readdirSync } from "fs";
import { Collection } from "@discordjs/collection";
export async function LoadCommands() {
    const commands = new Collection();
    const dirs = readdirSync("./src/commands/", {
        withFileTypes: true,
    }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    for (const folder of dirs) {
        for (const file of readdirSync("./src/commands/" + folder).filter((file) => file.endsWith(".ts"))) {
            const command = await import(`../commands/${folder}/${file}`);
            commands.set(command.name.toLowerCase(), {
                name: command.name.toLowerCase(),
                alias: command.alias || [],
                category: folder,
                filepath: file,
                description: command.description || "",
                run: command.run,
            });
        }
    }
    return commands;
}
