package com.deepspace.controller;

import com.deepspace.dto.QuizDTO;
import com.deepspace.dto.QuizResultDTO;
import com.deepspace.dto.QuizSubmissionDTO;
import com.deepspace.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/quizzes")
@CrossOrigin(origins = "*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public List<QuizDTO> getAllQuizzes() {
        return quizService.getAllPublishedQuizzes();
    }

    @PostMapping("/submit")
    public QuizResultDTO submitQuiz(@RequestBody QuizSubmissionDTO submission) {
        return quizService.calculateResults(submission.getAnswers());
    }
}
