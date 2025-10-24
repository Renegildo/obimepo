import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('avaliar')
    .setDescription('Avalia a dificuldade de uma questão')
    .addStringOption((option) => {
        return option.setName('questao')
            .setDescription('Questão a ser avaliada')
            .setRequired(true);
    })
    .addIntegerOption((option) => {
        return option.setName('dificuldade')
            .setDescription('Nível de dificuldade da questão (de 1 a 5)')
            .setRequired(true);
    });
export async function execute(interaction) {
    const difficulty = interaction.options.getInteger('dificuldade');

    if (!((difficulty >= 1) && (difficulty <= 5))) {
        return await interaction.reply('Dificuldade inválida. Insira uma dificuldade de 1 a 5.');
    }

    await interaction.reply(`Questão avaliada com dificuldade ${difficulty} com sucesso. Obrigado pela contribuição!`);
}