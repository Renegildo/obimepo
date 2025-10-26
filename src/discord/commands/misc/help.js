import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('ajuda').setDescription('Obtenha informações sobre o bot.');
export async function execute(interaction) {
    await interaction.reply({ content: `
## Como usar o comando de pegar questões?
Use \`/get <questão>\`, onde \`<questão>\` representa uma questão da OBMEP.
O formato deve conter **ano**, **nível (n)**, **fase (f)** e **questão (q)** — sempre começando com o **ano**, mas o restante pode vir em qualquer ordem

### Exemplos válidos
- \`2021n3f2q3\` 
- \`2019f2n2q1\` 
- \`2005q3f2n2\`

### Exemplos inválidos
- \`n3f2q32021\` (ano não está no início)
- \`2019f2n3\` (falta o número da questão)
- \`2021n3q3\` (falta fase)
- \`2023f2q5\` (falta o nível)

Obs.: Por enquanto, o bot só possui questões da **segunda fase**.

## Classificação de dificuldade
Ainda estou trabalhando nessa funcionalidade, mas você já pode avaliar a dificuldade de uma questão com o comando \`/avaliar <questão> <nível-de-dificuldade>\`, onde o nível de dificuldade é um **número inteiro** de 1 a 5.
    ` });
}
