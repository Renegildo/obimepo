export class QuestionParser {
    static isValid(input) {
        const base = input.replace(/-/g, '');

        const fMatch = base.match(/f(\d)/i);
        const nMatch = base.match(/n(\d)/i);
        const qMatch = base.match(/q(\d)/i);
        const yMatch = base.match(/(\d{4})/);

        return !!fMatch && !!nMatch && !!qMatch && !!yMatch;
    }
    
    static parseQuestion(input) {
        const yearMatch = input.match(/(\d{4})/i);
        const year = parseInt(yearMatch[1], 10);

        const phaseMatch = input.match(/f(\d)/i);
        const phase = parseInt(phaseMatch[1], 10);

        const levelMatch = input.match(/n(\d)/i);
        const level = parseInt(levelMatch[1], 10);

        const numberMatch = input.match(/q(\d+)/i);
        const number = parseInt(numberMatch[1], 10);

        return { year, phase, level, number };
    }

    static inputToImageUrl(input) {
        const imageUrlBase = 'https://renegildo.github.io/obmep-questions/questions/';
        const base = input.replace(/-/g, '');
        const defaultFMatch = '2';

        const fMatch = base.match(/f(\d)/i)?.[1] ?? defaultFMatch;
        const nMatch = base.match(/n(\d)/i)[1];
        const qMatch = base.match(/q(\d)/i)[1];
        const yMatch = base.match(/(\d{4})/)[1];

        if (!nMatch) throw new Error('ERRO: Falta o nível.');
        if (!qMatch) throw new Error('ERRO: Falta a questão.');
        if (!yMatch) throw new Error('ERRO: Falta o ano.');

        const phase = Number(fMatch);
        const year = Number(yMatch);
        const level = Number(nMatch);
        const question = Number(qMatch);

        if (phase > 2 || phase < 1) throw new Error(`ERRO: Não existe a fase ${phase} na OBMEP.`)
        if (phase == 1) throw new Error('ERRO: Somente as questões da **segunda fase** estão disponíveis.')
        if (year < 2005 || year == 2020 || year > 2024) throw new Error(`ERRO: Não existe OBMEP do ano ${year}.`);
        if (level > 3 || level < 1) throw new Error(`ERRO: O nível ${level} não existe na OBMEP.`);
        if (question > 6 || question < 1) throw new Error(`ERROR: Não existe questão de número ${question}.`)

        const imagePath = `${yMatch}n${nMatch}f${fMatch}q${qMatch}.png`;
        const result = imageUrlBase + imagePath;
        return result;
    }
};