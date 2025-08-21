package com.studyNest.controller;

import com.studyNest.model.StudentResult;
import com.studyNest.repository.StudentResultRepository;
import com.studyNest.service.CohereService;  // ✅ CohereService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ChatbotController {

    @Autowired
    private StudentResultRepository studentResultRepository;

    @Autowired
    private CohereService cohereService;  // ✅ OpenAIService ki jagah CohereService

    @PostMapping("/chatbot")
    public String handleChat(
            @RequestParam String name,
            @RequestParam String rollNumber,
            Model model) {

        // 🔹 Fetch student from DB
        StudentResult student = studentResultRepository.findByStudentNameAndRollNumber(name, rollNumber);

        if (student == null) {
            model.addAttribute("message", "❌ Student not found. Please check your details.");
            return "chatbot";
        }

        // 🔹 Marks array
        int[] marks = {
                student.getModule1Marks(),
                student.getModule2Marks(),
                student.getModule3Marks(),
                student.getModule4Marks(),
                student.getModule5Marks()
        };

        // 🔹 Find lowest scoring module index
        int minIndex = 0;
        for (int i = 1; i < marks.length; i++) {
            if (marks[i] < marks[minIndex]) {
                minIndex = i;
            }
        }

        // 🔹 Module number (1-based index)
        String weakModule = "Module " + (minIndex + 1);

        // 🔹 Get AI recommendation
        String aiAdvice = cohereService.getRecommendation(weakModule);  // ✅ OpenAIService ki jagah CohereService call

        // 🔹 Send to UI
        model.addAttribute("studentName", name);
        model.addAttribute("rollNumber", rollNumber);
        model.addAttribute("weakModule", weakModule);
        model.addAttribute("advice", aiAdvice);

        return "chatbot";
    }
}
