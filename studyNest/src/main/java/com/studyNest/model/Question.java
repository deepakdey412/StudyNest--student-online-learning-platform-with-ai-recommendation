package com.studyNest.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String questionText;

    @NotBlank
    @Column(nullable = false)
    private String option1;

    @NotBlank
    @Column(nullable = false)
    private String option2;

    @NotBlank
    @Column(nullable = false)
    private String option3;

    @NotBlank
    @Column(nullable = false)
    private String option4;

    @NotBlank
    @Column(nullable = false)
    private String correctAnswer;

    // Relation to Module, which has a semester field
    @ManyToOne
    @JoinColumn(name = "module_id", nullable = false)
    private Module module;

    // Constructors
    public Question() {}

    public Question(String questionText, String option1, String option2, String option3, String option4, String correctAnswer, Module module) {
        this.questionText = questionText;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.correctAnswer = correctAnswer;
        this.module = module;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getOption1() {
        return option1;
    }

    public void setOption1(String option1) {
        this.option1 = option1;
    }

    public String getOption2() {
        return option2;
    }

    public void setOption2(String option2) {
        this.option2 = option2;
    }

    public String getOption3() {
        return option3;
    }

    public void setOption3(String option3) {
        this.option3 = option3;
    }

    public String getOption4() {
        return option4;
    }

    public void setOption4(String option4) {
        this.option4 = option4;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    // Helper method to retrieve the semester from the associated module
    public Integer getSemester() {
        return module != null ? module.getSemester() : null; // Get semester from associated module
    }
}
