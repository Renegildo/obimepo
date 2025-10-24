import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import initDb from './db/init.js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { fileURLToPath } from 'node:url';
const token = process.env.BOT_TOKEN;

const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
] });

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);

		const commandModule = await import(`file://${filePath}`);
		const command = commandModule.default || commandModule;

		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = join(__dirname, './events');
const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = join(eventsPath, file);

	const eventModule = await import(`file://${filePath}`);
	const event = eventModule.default || eventModule;

	if (event.once) {
		client.once(event.name, async (...args) => await event.execute(...args));
	} else {
		client.on(event.name, async (...args) => await event.execute(...args));
	}
}

await initDb();

client.login(token);