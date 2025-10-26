import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import { QuestionParser } from '../../../domain/questions/questionParser.js';

export const data = new SlashCommandBuilder()
    .setName('question')
    .setDescription('Retorna uma questão da OBMEP.')
    .setNameLocalization('pt-BR', 'questao')
    .addStringOption((option) => {
        return option.setName('ano')
            .setDescription('Ano da prova da OBMEP.')
            .setRequired(true);
    })
    .addIntegerOption((option) =>{
        return option.setName('nivel')
            .setDescription('O nível da prova.')
            .setChoices(
                {name: '1', value: 1},
                {name: '2', value: 2},
                {name: '3', value: 3}
            )
            .setRequired(true)
    })
    .addIntegerOption((option) =>{
        return option.setName('fase')
            .setDescription('A fase da prova.')
            .setChoices({name: '2', value: 2})
            .setRequired(true)
    })
    .addIntegerOption((option) =>{
        return option.setName('questao')
            .setDescription('O problema que você quer.')
            .setChoices(
                {name: '1', value: 1},
                {name: '2', value: 2},
                {name: '3', value: 3},
                {name: '4', value: 4},
                {name: '5', value: 5},
                {name: '6', value: 6}
            )
            .setRequired(true)
    });
export async function execute(interaction) {
    const ano = interaction.options.getString('ano');
    const nivel = interaction.options.getInteger('nivel');
    const fase = interaction.options.getInteger('fase');
    const questao = interaction.options.getInteger('questao');

    const input = `${ano}n${nivel}f${fase}q${questao}`

    let imageUrl;
    try {
        imageUrl = QuestionParser.inputToImageUrl(input);
    } catch (error) {
        return await interaction.reply({ content: error.message });
    }

    const attachment = new AttachmentBuilder()
        .setName('question.png')
        .setFile(imageUrl);

    await interaction.reply({ files: [attachment] });
}
