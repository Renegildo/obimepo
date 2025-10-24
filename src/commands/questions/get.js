import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { parseQuestionInput } from '../../functions.js';
import { join } from 'path';
import { existsSync } from 'fs';

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
    let pngFileName;
    try {
        pngFileName = parseQuestionInput(input);
    } catch (error) {
        console.error(error);
        return await interaction.reply({ content: error.message });
    }

    const filePath = join(__dirname, '../../../data/questions', pngFileName);

    if (!existsSync(filePath)) {
        return await interaction.reply({
            content: 'Questão não encontrada. Verifique os dados e tente novamente.',
        });
    }

    const attachment = new AttachmentBuilder(filePath);

    await interaction.reply({ files: [attachment] });
}
