import { Events } from 'discord.js';

export const name = Events.InteractionCreate;
export async function execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    if (!interaction.isRepliable()) {
        console.log('Interaction is not repliable');
        return;
    }

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
}