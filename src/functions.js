const parseQuestionInput = (input) => {
    const base = input.replace(/-/g, '');

    const fMatch = base.match(/f(\d)/i);
    const nMatch = base.match(/n(\d)/i);
    const qMatch = base.match(/q(\d)/i);
    const yMatch = base.match(/(\d{4})/);

    if (!fMatch) throw new Error('ERRO: Falta a fase.');
    if (!nMatch) throw new Error('ERRO: Falta o nível.');
    if (!qMatch) throw new Error('ERRO: Falta a questão.');
    if (!yMatch) throw new Error('ERRO: Falta o ano.');

    return `f${fMatch[1]}n${nMatch[1]}-${yMatch[1]}q${qMatch[1]}.png`;
};

export {
    parseQuestionInput,
};