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

        const fMatch = base.match(/f(\d)/i);
        const nMatch = base.match(/n(\d)/i);
        const qMatch = base.match(/q(\d)/i);
        const yMatch = base.match(/(\d{4})/);

        if (!fMatch) throw new Error('ERRO: Falta a fase.');
        if (!nMatch) throw new Error('ERRO: Falta o nível.');
        if (!qMatch) throw new Error('ERRO: Falta a questão.');
        if (!yMatch) throw new Error('ERRO: Falta o ano.');

        const imagePath = `${yMatch[1]}n${nMatch[1]}f${fMatch[1]}q${qMatch[1]}.png`;
        const result = imageUrlBase + imagePath;
        return result;
    }
};