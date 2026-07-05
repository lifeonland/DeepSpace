package com.deepspace.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class QuizResultDTO {
    private int score;
    private int total;
    private double percentage;
    private List<Feedback> feedback;

    @Data
    @Builder
    public static class Feedback {
        private Long quizId;
        private String question;
        private String userAnswer;
        private String correctAnswer;
        private boolean correct;
        private String explanation;
    }
}
