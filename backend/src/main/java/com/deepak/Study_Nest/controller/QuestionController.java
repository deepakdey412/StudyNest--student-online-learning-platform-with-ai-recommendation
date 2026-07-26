package com.deepak.Study_Nest.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deepak.Study_Nest.dto.QuestionDto;
import com.deepak.Study_Nest.service.QuestionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @GetMapping("/module/{moduleId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<QuestionDto>> getQuestionsForStudent(@PathVariable Long moduleId) {
        return ResponseEntity.ok(questionService.getQuestionsByModuleId(moduleId, false));
    }

    @GetMapping("/module/{moduleId}/with-answers")
    @PreAuthorize("hasRole('TUTOR')")
    public ResponseEntity<List<QuestionDto>> getQuestionsForTutor(@PathVariable Long moduleId) {
        return ResponseEntity.ok(questionService.getQuestionsByModuleId(moduleId, true));
    }

    @PutMapping("/{questionId}")
    @PreAuthorize("hasRole('TUTOR')")
    public ResponseEntity<QuestionDto> updateQuestion(
            @PathVariable Long questionId,
            @Valid @RequestBody QuestionDto questionDto) {
        return ResponseEntity.ok(questionService.updateQuestion(questionId, questionDto));
    }
}
