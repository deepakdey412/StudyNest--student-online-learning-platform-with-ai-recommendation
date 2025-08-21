package com.studyNest.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WelcomeController {

    @GetMapping("/welcome")
    public String welcomePage() {
        return "welcome"; // This returns welcome.html view
    }
    @GetMapping("/admin")
    public String showAdminLoginPage() {
        return "admin_login";  // admin-login.html return
    }
}
