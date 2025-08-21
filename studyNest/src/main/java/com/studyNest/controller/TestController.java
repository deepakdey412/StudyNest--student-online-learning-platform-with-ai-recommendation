package com.studyNest.controller;

import com.studyNest.model.*;
import com.studyNest.model.Module;
import com.studyNest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@Controller
public class TestController {

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private QuestionRepository questionRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private StudentResultRepository resultRepo;

    // Show test page for the selected module
    @GetMapping("/module/{moduleId}/test")
    public String showTestPage(@PathVariable Long moduleId, @AuthenticationPrincipal User user, Model model) {
        Student student = studentRepo.findByPrn(user.getUsername());
        if (student == null) return "redirect:/dashboard"; // Handle if student not found

        Integer studentSemester = student.getSemester();

        Optional<Module> moduleOpt = moduleRepo.findById(moduleId);
        if (moduleOpt.isEmpty()) return "redirect:/dashboard"; // Handle if module not found

        Module module = moduleOpt.get();

        if (module.getSemester().equals(studentSemester)) {
            List<Question> questions = questionRepo.findByModule(module);
            model.addAttribute("module", module);
            model.addAttribute("questions", questions);
            model.addAttribute("resultShown", false);
            return "test";
        }

        return "redirect:/dashboard";
    }

    // Handle submission of the test
    @PostMapping("/submitTest/{moduleId}")
    public String submitTest(@PathVariable Long moduleId,
                             @RequestParam Map<String, String> allParams,
                             @AuthenticationPrincipal User user,
                             Model model) {

        // Retrieve the student object
        Student student = studentRepo.findByPrn(user.getUsername());
        if (student == null) return "redirect:/dashboard"; // Handle if student not found

        Integer studentSemester = student.getSemester();

        Optional<Module> moduleOpt = moduleRepo.findById(moduleId);
        if (moduleOpt.isEmpty()) return "redirect:/dashboard"; // Handle if module not found

        Module module = moduleOpt.get();

        // Check if the module is for the student's semester
        if (!module.getSemester().equals(studentSemester)) {
            return "redirect:/dashboard";
        }

        // Retrieve the questions for the module
        List<Question> questions = questionRepo.findByModule(module);

        int score = 0;

        // Calculate score based on user answers
        for (Question q : questions) {
            String userAnswer = allParams.get("answers[" + q.getId() + "]");
            if (userAnswer != null && userAnswer.equalsIgnoreCase(q.getCorrectAnswer())) {
                score++;
            }
        }

//         Find or create a new result entry for the student
        StudentResult result = resultRepo.findByStudent_PrnAndModuleSemester(student.getPrn(), studentSemester)
                .orElse(new StudentResult());


        // Set the PRN and other student details
        result.setStudent(student);
        // ➕ ADD THIS:
        result.setStudentName(student.getName());
        result.setRollNumber(student.getRollNo());

        // Update marks based on the module
        updateModuleMarks(result, module, score);

        // Recalculate total and average marks across all modules
        recalculateTotalAndAverage(result);

        // Save the result
        resultRepo.save(result);

        // Add model attributes for display on the test page
        model.addAttribute("module", module);
        model.addAttribute("score", score);
        model.addAttribute("passed", score >= 6);
        model.addAttribute("resultShown", true);
        model.addAttribute("student", student);
        model.addAttribute("questions", questions);

        return "test";
    }

    // Helper method to update module marks based on module name and semester
    private void updateModuleMarks(StudentResult result, Module module, int score) {
        String moduleName = module.getName();
        Integer moduleSemester = module.getSemester(); // Get the semester of the module

        // Set the semester for the result
        result.setModuleSemester(moduleSemester);

        // Check both module name and semester to identify the correct module
        if (moduleSemester == 6) {
            // Semester 6 modules
            if (moduleName.equals("Computer Network")) {
                result.setModule1Marks(score);  // Module 1 for semester 6
            } else if (moduleName.equals("Compiler Design")) {
                result.setModule2Marks(score);  // Module 2 for semester 6
            } else if (moduleName.equals("IOT")) {
                result.setModule3Marks(score);  // Module 3 for semester 6
            } else if (moduleName.equals("Machine Learning")) {
                result.setModule4Marks(score);  // Module 4 for semester 6
            } else if (moduleName.equals("Consumer Behaviour")) {
                result.setModule5Marks(score);  // Module 5 for semester 6
            }
        } else if (moduleSemester == 3) {
            // Semester 3 modules
            if (moduleName.equals("Engineering Mathematics")) {
                result.setModule1Marks(score);  // Module 1 for semester 3
            } else if (moduleName.equals("Discrete Mathematics")) {
                result.setModule2Marks(score);  // Module 2 for semester 3
            } else if (moduleName.equals("Data Structure")) {
                result.setModule3Marks(score);  // Module 3 for semester 3
            } else if (moduleName.equals("Computer Architecture and Organization")) {
                result.setModule4Marks(score);  // Module 4 for semester 3
            } else if (moduleName.equals("OPP in Java")) {
                result.setModule5Marks(score);  // Module 5 for semester 3
            }
        } else if (moduleSemester == 4) {
            // Semester 4 modules
            if (moduleName.equals("Design & Analysis of Algorithm")) {
                result.setModule1Marks(score);  // Module 1 for semester 4
            } else if (moduleName.equals("Operating System")) {
                result.setModule2Marks(score);  // Module 2 for semester 4
            } else if (moduleName.equals("Basic Human Rights")) {
                result.setModule3Marks(score);  // Module 3 for semester 4
            } else if (moduleName.equals("Probability and Statistics")) {
                result.setModule4Marks(score);  // Module 4 for semester 4
            } else if (moduleName.equals("Digital Logic Design & Microprocessor")) {
                result.setModule5Marks(score);  // Module 5 for semester 4
            }
        } else if (moduleSemester == 5) {
            // Semester 5 modules
            if (moduleName.equals("Database System")) {
                result.setModule1Marks(score);  // Module 1 for semester 5
            } else if (moduleName.equals("Theory of Computation")) {
                result.setModule2Marks(score);  // Module 2 for semester 5
            } else if (moduleName.equals("Software Engineering")) {
                result.setModule3Marks(score);  // Module 3 for semester 5
            } else if (moduleName.equals("Human Computer Interaction")) {
                result.setModule4Marks(score);  // Module 4 for semester 5
            } else if (moduleName.equals("Business Communication")) {
                result.setModule5Marks(score);  // Module 5 for semester 5
            }
        } else if (moduleSemester == 7) {
            // Semester 7 modules
            if (moduleName.equals("Cloud Computing")) {
                result.setModule1Marks(score);  // Module 1 for semester 7
            } else if (moduleName.equals("Artificial Intelligence")) {
                result.setModule2Marks(score);  // Module 2 for semester 7
            } else if (moduleName.equals("Deep Learning")) {
                result.setModule3Marks(score);  // Module 3 for semester 7
            } else if (moduleName.equals("Big Data Analytics")) {
                result.setModule4Marks(score);  // Module 4 for semester 7
            } else if (moduleName.equals("Cryptography")) {
                result.setModule5Marks(score);  // Module 5 for semester 7
            }
        }
    }


    // Helper method to recalculate the total and average marks
    private void recalculateTotalAndAverage(StudentResult result) {
        int total = 0;
        int count = 0;

        // Dynamically calculate total and count based on non-null module marks
        if (result.getModule1Marks() != null) { total += result.getModule1Marks(); count++; }
        if (result.getModule2Marks() != null) { total += result.getModule2Marks(); count++; }
        if (result.getModule3Marks() != null) { total += result.getModule3Marks(); count++; }
        if (result.getModule4Marks() != null) { total += result.getModule4Marks(); count++; }
        if (result.getModule5Marks() != null) { total += result.getModule5Marks(); count++; }

        if (count > 0) {
            double average = (double) total / 5;
            result.setAverageMarks(BigDecimal.valueOf(average));
            result.setStatus(average >= 6 ? "Pass" : "Fail");
        }
    }
}
