package com.studyNest.controller;

import com.studyNest.model.Module;
import com.studyNest.model.Student;
import com.studyNest.repository.ModuleRepository;
import com.studyNest.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ModuleController {

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private StudentRepository studentRepo;

    // Show specific module content
    @GetMapping("/module/{moduleId}")
    public String showModuleContent(@PathVariable Long moduleId, @AuthenticationPrincipal User user, Model model) {
        if (user == null) {
            return "redirect:/login";
        }

        Student student = studentRepo.findByPrn(user.getUsername());
        if (student == null) {
            return "redirect:/login";
        }

        Module module = moduleRepo.findById(moduleId).orElse(null);

        if (module == null || module.getSemester() != student.getSemester()) {
            return "redirect:/dashboard";
        }

        model.addAttribute("student", student);
        model.addAttribute("module", module);
        return "module-content";
    }

    @GetMapping("/student-dashboard")
    public String showDashboard(@RequestParam("semester") int semester, @AuthenticationPrincipal User user, Model model) {
        if (user == null) {
            return "redirect:/login";
        }

        Student student = studentRepo.findByPrn(user.getUsername());
        if (student == null) {
            return "redirect:/login";
        }

        model.addAttribute("student", student);
        model.addAttribute("semester", semester);

        // Load all modules of the student's semester
        model.addAttribute("modules", moduleRepo.findBySemester(semester));

        return "dashboard"; // this should match your dashboard.html Thymeleaf file
    }


}
