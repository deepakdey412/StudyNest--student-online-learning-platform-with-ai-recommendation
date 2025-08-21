package com.studyNest.controller;

import com.studyNest.model.Student;
import com.studyNest.repository.StudentRepository;
import com.studyNest.repository.ModuleRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class AuthController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private ModuleRepository moduleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Display the Sign-Up form
    // One blank Student object will be send in model
    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        model.addAttribute("student", new Student());
        return "signup";
    }

    // Process Sign-Up
    @PostMapping("/signup")
    public String processSignup(@Valid @ModelAttribute("student") Student student, BindingResult result) {
        if (result.hasErrors()) return "signup";

        if (studentRepo.findByPrn(student.getPrn()) != null) {
            result.rejectValue("prn", "error.student", "PRN number already exists");
            return "signup";
        }

        student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepo.save(student);
        return "redirect:/login";
    }

    // Display the Login form button
    @GetMapping("/login")// button
    public String showLoginForm() {
        return "login";
    }

    // Show Dashboard after login
    @GetMapping("/dashboard")
    public String showDashboard(@AuthenticationPrincipal User user, Model model) {
        if (user == null) {
            return "redirect:/login";
        }

        Student student = studentRepo.findByPrn(user.getUsername());
        if (student != null) {
            model.addAttribute("student", student);
            model.addAttribute("semester", student.getSemester());
            model.addAttribute("modules", moduleRepo.findBySemester(student.getSemester()));
        }

        return "dashboard";
    }

    // Optional: Dynamic semester route if needed
    @GetMapping("/dashboard/sem{sem}")
    public String showSemesterDashboard(@PathVariable int sem, Model model, @AuthenticationPrincipal User user) {
        if (user == null) {
            return "redirect:/login";
        }

        Student student = studentRepo.findByPrn(user.getUsername());
        if (student == null || student.getSemester() != sem) {
            return "redirect:/dashboard";
        }

        model.addAttribute("student", student);
        model.addAttribute("semester", sem);
        model.addAttribute("modules", moduleRepo.findBySemester(sem));
        return "dashboard";
    }
}
