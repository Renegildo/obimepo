import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');
export async function execute(interaction) {
    await interaction.reply({ content: `
        ## Como usar o comando de pegar questões?
        Use \`/get <questão>\`, onde \`<questão>\q representa uma questão da OBMEP.
        O formato deve conter **ano**, **nível (n)**, **fase (f)** e **questão (q)** — sempre começando com o **ano**, mas o restante pode vir em qualquer ordem

        ### Exemplos válidos
        - \`2021n3f2q3\` 
        - \`2019f3n2q1\` 
        - \`2005q3f2n6\`

        ### Exemplos inválidos
        - \`n3f2q32021\` (ano não está no início)
        - \`2019f2n3\` (falta o número da questão)
        - \`2021n3q3\` (falta fase)
        - \`2023f2q5\` (falta o nível)

        Obs.: Por enquanto, o bot só possui questões da **segunda fase**. Se usar fase 1, o bot retornará coisas sem sentido — isso será corrigido em breve.
    ` });
}
