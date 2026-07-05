-- Seed quiz data

INSERT INTO quizzes (question, correct_answer, explanation, difficulty) 
VALUES ('Which planet is known as the Red Planet?', 'Mars', 'Mars appears red due to iron oxide (rust) on its surface.', 'easy');

INSERT INTO quiz_options (quiz_id, option_text) VALUES 
(1, 'Venus'), (1, 'Mars'), (1, 'Jupiter'), (1, 'Saturn');

INSERT INTO quizzes (question, correct_answer, explanation, difficulty) 
VALUES ('What is the largest planet in our solar system?', 'Jupiter', 'Jupiter is more than twice as massive as all other planets combined.', 'easy');

INSERT INTO quiz_options (quiz_id, option_text) VALUES 
(2, 'Saturn'), (2, 'Neptune'), (2, 'Jupiter'), (2, 'Uranus');

INSERT INTO quizzes (question, correct_answer, explanation, difficulty) 
VALUES ('Which planet has the most extensive ring system?', 'Saturn', 'Saturn is famous for its bright and complex ring system made of ice and rock.', 'easy');

INSERT INTO quiz_options (quiz_id, option_text) VALUES 
(3, 'Uranus'), (3, 'Jupiter'), (3, 'Neptune'), (3, 'Saturn');
