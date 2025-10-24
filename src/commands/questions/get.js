import { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } from 'discord.js';
import { inputToImageUrl } from '../../functions.js';

export const data = new SlashCommandBuilder()
    .setName('get')
    .setDescription('Pega uma questão da OBMEP.')
    .addStringOption((option) => {
        return option.setName('input')
            .setDescription('Questão a ser buscada. Ex.: "2021n3f2q6"')
            .setRequired(true);
    });
export async function execute(interaction) {
    const input = interaction.options.getString('input');

    let imageUrl;
    try {
        imageUrl = inputToImageUrl(input);
    } catch (error) {
        return await interaction.reply({ content: error.message });
    }

    const attachment = new AttachmentBuilder()
        .setName('question.png')
        .setFile(imageUrl);

    await interaction.reply({ files: [attachment] });
}
