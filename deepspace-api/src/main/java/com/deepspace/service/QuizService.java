package com.deepspace.service;

import com.deepspace.dto.QuizDTO;
import com.deepspace.dto.QuizResultDTO;
import com.deepspace.entity.Quiz;
import com.deepspace.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    public List<QuizDTO> getAllPublishedQuizzes() {
        return quizRepository.findByPublishedTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private QuizDTO convertToDTO(Quiz quiz) {
        return QuizDTO.builder()
                .id(quiz.getId())
                .question(quiz.getQuestion())
                .options(quiz.getOptions())
                .difficulty(quiz.getDifficulty())
                .build();
    }

    public QuizResultDTO calculateResults(Map<Long, String> answers) {
        List<Quiz> quizzes = quizRepository.findAllById(answers.keySet());
        int score = 0;
        List<QuizResultDTO.Feedback> feedbackList = new ArrayList<>();

        for (Quiz quiz : quizzes) {
            String userAnswer = answers.get(quiz.getId());
            boolean isCorrect = quiz.getCorrectAnswer().equalsIgnoreCase(userAnswer != null ? userAnswer.trim() : "");
            if (isCorrect) {
                score++;
            }

            feedbackList.add(QuizResultDTO.Feedback.builder()
                    .quizId(quiz.getId())
                    .question(quiz.getQuestion())
                    .userAnswer(userAnswer)
                    .correctAnswer(quiz.getCorrectAnswer())
                    .correct(isCorrect)
                    .explanation(quiz.getExplanation())
                    .build());
        }

        double percentage = quizzes.isEmpty() ? 0 : (double) score / quizzes.size() * 100;

        return QuizResultDTO.builder()
                .score(score)
                .total(quizzes.size())
                .percentage(percentage)
                .feedback(feedbackList)
                .build();
    }
}
