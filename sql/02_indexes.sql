CREATE INDEX IF NOT EXISTS idx_rates_question ON ratings (question_year, question_phase, question_item, question_number);
CREATE INDEX IF NOT EXISTS idx_rates_user ON ratings (user_id);
