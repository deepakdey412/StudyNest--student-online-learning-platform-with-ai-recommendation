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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class DashboardController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private ModuleRepository moduleRepo;

    @GetMapping("/dashboard/{semId}")
    public String showDashboard(@PathVariable Integer semId,
                                @AuthenticationPrincipal User user,
                                Model model) {
        // Find student based on PRN (username)
        Student student = studentRepo.findByPrn(user.getUsername());

        // Safety check
        if (student == null || student.getSemester() != semId) {
            return "redirect:/dashboard";
        }

        // Fetch modules for that semester
        List<Module> modules = moduleRepo.findBySemester(semId);

        // Add data to model
        model.addAttribute("modules", modules);
        model.addAttribute("student", student);
        model.addAttribute("semester", semId);

        return "dashboard";
    }
}
