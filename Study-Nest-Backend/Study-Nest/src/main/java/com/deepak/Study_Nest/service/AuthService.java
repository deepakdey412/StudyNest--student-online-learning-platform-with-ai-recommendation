package com.deepak.Study_Nest.service;

import com.deepak.Study_Nest.dao.StudentRepository;
import com.deepak.Study_Nest.dao.TutorRepository;
import com.deepak.Study_Nest.dto.LoginDto;
import com.deepak.Study_Nest.dto.StudentRegisterDto;
import com.deepak.Study_Nest.dto.TutorRegisterDto;
import com.deepak.Study_Nest.entity.StudentDetails;
import com.deepak.Study_Nest.entity.TutorDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final StudentRepository studentRepo;
    private final TutorRepository tutorRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(StudentRepository studentRepo, TutorRepository tutorRepo,
                       PasswordEncoder passwordEncoder){
        this.studentRepo = studentRepo;
        this.tutorRepo = tutorRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // Register student
    public StudentDetails registerStudent(StudentRegisterDto dto){
        if(studentRepo.findByEmail(dto.email()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        StudentDetails student = new StudentDetails();
        student.setName(dto.name());
        student.setRollNo(dto.rollNo());
        student.setPrn(dto.prn());
        student.setSemester(dto.semester());
        student.setEmail(dto.email());
        student.setPassword(passwordEncoder.encode(dto.password()));
        return studentRepo.save(student);
    }

    // Register tutor
    public TutorDetails registerTutor(TutorRegisterDto dto){
        if(tutorRepo.findByEmail(dto.email()).isPresent()){
            throw new RuntimeException("Email already exists");
        }
        TutorDetails tutor = new TutorDetails();
        tutor.setName(dto.name());
        tutor.setMobileNo(dto.mobileNo());
        tutor.setEmail(dto.email());
        tutor.setPassword(passwordEncoder.encode(dto.password()));
        return tutorRepo.save(tutor);
    }

    // Login (checks both student and tutor)
    public Object login(LoginDto dto){
        // Check student
        var studentOpt = studentRepo.findByEmail(dto.email());
        if(studentOpt.isPresent() && passwordEncoder.matches(dto.password(), studentOpt.get().getPassword())){
            return studentOpt.get(); // return student object (or token)
        }
        // Check tutor
        var tutorOpt = tutorRepo.findByEmail(dto.email());
        if(tutorOpt.isPresent() && passwordEncoder.matches(dto.password(), tutorOpt.get().getPassword())){
            return tutorOpt.get(); // return tutor object (or token)
        }

        throw new RuntimeException("Invalid credentials");
    }
}
