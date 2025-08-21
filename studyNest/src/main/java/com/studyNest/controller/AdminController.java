package com.studyNest.controller;

import com.studyNest.model.StudentResult;
import com.studyNest.repository.StudentResultRepository;
import com.studyNest.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private static final String ADMIN_NAME = "admin";
    private static final String ADMIN_PASSWORD = "secret123";

    @Autowired
    private StudentResultRepository studentResultRepository;

    @Autowired
    private ReportService reportService;

    @GetMapping("/login")
    public String showLoginForm() {
        return "admin_login";
    }

    @PostMapping("/login")
    public String handleLogin(
            @RequestParam String adminName,
            @RequestParam String adminPassword,
            Model model) {

        if (ADMIN_NAME.equals(adminName) && ADMIN_PASSWORD.equals(adminPassword)) {
            return "redirect:/admin/report";
        } else {
            model.addAttribute("error", "❌ Invalid credentials");
            return "admin_login";
        }
    }

    @GetMapping("/report")
    public String showReportForm() {
        return "admin_report";
    }

    @PostMapping("/report/download")
    public ResponseEntity<InputStreamResource> downloadReport(@RequestParam String semester) {

        List<StudentResult> passStudents = studentResultRepository
                .findByModuleSemesterAndStatus(Integer.valueOf(semester), "Pass");

        ByteArrayInputStream bis = reportService.generatePdfReport(passStudents, semester);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=pass_students_semester_" + semester + ".pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}
