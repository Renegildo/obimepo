CREATE TABLE IF NOT EXISTS ratings (
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    difficulty INTEGER CHECK (difficulty BETWEEN 1 and 5),

    question_phase INT NOT NULL,
    question_level INT NOT NULL,
    question_year INT NOT NULL,
    question_number INT NOT NULL,
    PRIMARY KEY (user_id, question_level, question_phase, question_year, question_number)
);