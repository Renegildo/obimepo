export class QuestionRandomizer {
    static randomYear() {
        const years = [];
        for (let y = 2005; y < 2025; y++) {
            if (y !== 2020) years.push(y);
        }

        return years[Math.floor(Math.random() * years.length)];
    }

    static randomLevel() {
        return 1 + Math.floor(Math.random() * 3);
    }

    static randomPhase() {
        return 2;
    }

    static randomQuestion() {
        return 1 + Math.floor(Math.random() * 6);
    }
}