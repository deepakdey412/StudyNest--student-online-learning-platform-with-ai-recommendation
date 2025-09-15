package com.deepak.Study_Nest.controller;

import com.deepak.Study_Nest.dto.LoginDto;
import com.deepak.Study_Nest.dto.TutorRegisterDto;
import com.deepak.Study_Nest.entity.StudentDetails;
import com.deepak.Study_Nest.entity.TutorDetails;
import com.deepak.Study_Nest.service.AuthService;
import com.deepak.Study_Nest.util.JwtUtil;
import com.deepak.Study_Nest.dto.StudentRegisterDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, JwtUtil jwtUtil){
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/student/register")
    public ResponseEntity<?> registerStudent(@RequestBody StudentRegisterDto dto){
        var student = authService.registerStudent(dto);
        String token = jwtUtil.generateToken(student.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "role", "STUDENT"));
    }

    @PostMapping("/tutor/register")
    public ResponseEntity<?> registerTutor(@RequestBody TutorRegisterDto dto){
        var tutor = authService.registerTutor(dto);
        String token = jwtUtil.generateToken(tutor.getEmail());
        return ResponseEntity.ok(Map.of("token", token, "role", "TUTOR"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto){
        var user = authService.login(dto);
        String role = user instanceof StudentDetails ? "STUDENT" : "TUTOR";
        String token = jwtUtil.generateToken(user instanceof StudentDetails ? ((StudentDetails)user).getEmail() : ((TutorDetails)user).getEmail());
        return ResponseEntity.ok(Map.of("token", token, "role", role));
    }
}
