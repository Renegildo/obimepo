import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');
export async function execute(interaction) {
    console.log('ping command evoked');

    await interaction.reply({ content: 'Pong!' });
}
