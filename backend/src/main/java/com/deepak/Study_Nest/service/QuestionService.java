package com.deepak.Study_Nest.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.deepak.Study_Nest.dao.QuestionRepository;
import com.deepak.Study_Nest.dto.QuestionDto;
import com.deepak.Study_Nest.entity.Question;
import com.deepak.Study_Nest.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuestionService {

    private final QuestionRepository questionRepository;

    @Transactional(readOnly = true)
    public List<QuestionDto> getQuestionsByModuleId(Long moduleId, boolean includeAnswers) {
        List<Question> questions = questionRepository.findByModuleId(moduleId);
        
        if (questions.isEmpty()) {
            throw new ResourceNotFoundException("No questions found for module id: " + moduleId);
        }

        return questions.stream()
                .map(q -> convertToDto(q, includeAnswers))
                .collect(Collectors.toList());
    }

    @Transactional
    public QuestionDto updateQuestion(Long questionId, QuestionDto questionDto) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionId));

        // Update question fields
        question.setQuestionText(questionDto.getQuestionText());
        question.setOption1(questionDto.getOption1());
        question.setOption2(questionDto.getOption2());
        question.setOption3(questionDto.getOption3());
        question.setOption4(questionDto.getOption4());
        question.setCorrectAnswer(questionDto.getCorrectAnswer());

        Question savedQuestion = questionRepository.save(question);
        log.info("Question updated: {}", savedQuestion.getId());

        return convertToDto(savedQuestion, true);
    }

    private QuestionDto convertToDto(Question question, boolean includeAnswers) {
        QuestionDto.QuestionDtoBuilder builder = QuestionDto.builder()
                .id(question.getId())
                .questionText(question.getQuestionText())
                .option1(question.getOption1())
                .option2(question.getOption2())
                .option3(question.getOption3())
                .option4(question.getOption4());

        if (includeAnswers) {
            builder.correctAnswer(question.getCorrectAnswer());
        }

        return builder.build();
    }
}
