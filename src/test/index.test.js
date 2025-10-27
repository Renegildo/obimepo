import { QuestionParser } from "../domain/questions/questionParser";

describe('QuestionParser.inputToImageUrl', () => {
    const baseUrl = 'https://renegildo.github.io/obmep-questions/questions/';

    test('should generate correct URL for a complete input with f', () => {
        const input = '2024n2f2q1';
        const url = QuestionParser.inputToImageUrl(input);
        expect(url).toBe(`${baseUrl}2024n2f2q1.png`);
    });

    test('should ignore hyphens in the input', () => {
        const input = '2023-n3-f2-q4';
        const url = QuestionParser.inputToImageUrl(input);
        expect(url).toBe(`${baseUrl}2023n3f2q4.png`);
    });

    test('should use default phase (f=2) when not provided', () => {
        const input = '2024n1q3';
        const url = QuestionParser.inputToImageUrl(input);
        expect(url).toBe(`${baseUrl}2024n1f2q3.png`);
    });

    test('should throw an error when level (n) is missing', () => {
        expect(() => QuestionParser.inputToImageUrl('2024f2q1')).toThrow('Falta o nível');
    });

    test('should throw an error when question (q) is missing', () => {
        expect(() => QuestionParser.inputToImageUrl('2024n1f2')).toThrow('Falta a questão');
    });

    test('should throw an error when year is missing', () => {
        expect(() => QuestionParser.inputToImageUrl('n1f2q3')).toThrow('Falta o ano');
    });

    test('should throw an error when phase is invalid (>2)', () => {
        expect(() => QuestionParser.inputToImageUrl('2024n1f3q2')).toThrow('fase 3');
    });

    test('should throw an error when phase is 1 (only second phase available)', () => {
        expect(() => QuestionParser.inputToImageUrl('2024n1f1q2')).toThrow('Somente as questões da **segunda fase**');
    });

    test('should throw an error when year is before 2005', () => {
        expect(() => QuestionParser.inputToImageUrl('2004n1f2q1')).toThrow('OBMEP do ano 2004');
    });

    test('should throw an error when year is 2020', () => {
        expect(() => QuestionParser.inputToImageUrl('2020n1f2q1')).toThrow('OBMEP do ano 2020');
    });

    test('should throw an error when year is after 2024', () => {
        expect(() => QuestionParser.inputToImageUrl('2025n1f2q1')).toThrow('OBMEP do ano 2025');
    });

    test('should throw an error when level is invalid (>3)', () => {
        expect(() => QuestionParser.inputToImageUrl('2024n4f2q1')).toThrow('nível 4');
    });

    test('should throw an error when question number is invalid (>6)', () => {
        expect(() => QuestionParser.inputToImageUrl('2024n1f2q7')).toThrow('questão de número 7');
    });
});