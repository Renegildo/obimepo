import { SlashCommandBuilder } from 'discord.js';
import db from '../../db/index.js';
import { isValidQuestion, parseQuestion } from '../../functions.js';

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
    const question = interaction.options.getString('questao');
    const userId = interaction.user.id;
    const username = interaction.user.username;

    if (!((difficulty >= 1) && (difficulty <= 5))) {
        return await interaction.reply('Dificuldade inválida. Insira uma dificuldade de 1 a 5.');
    }

    if (!isValidQuestion(question)) {
        return await interaction.reply('Questão inválida. Verifique os dados e tente novamente.');
    }

    await interaction.reply(`Questão avaliada com dificuldade ${difficulty} com sucesso. Obrigado pela contribuição!`);

    const parsed = parseQuestion(question);

    try {
        await db.query(`
            INSERT INTO ratings (
                user_id,
                username,
                question_phase,
                question_level,
                question_year,
                question_number,
                difficulty
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (user_id, question_phase, question_level, question_year, question_number)
            DO UPDATE SET difficulty = EXCLUDED.difficulty;
        `, [userId, username, parsed.phase, parsed.level, parsed.year, parsed.number, difficulty]);
    } catch (error) {
        console.error('[ERROR] Error while creating rating in database:')
        console.error(error);
        await interaction.editReply({ content: 'Ocorreu um erro ao salvar a sua avaliação ao banco de dados, por favor tente novamente.' });
    }
}
