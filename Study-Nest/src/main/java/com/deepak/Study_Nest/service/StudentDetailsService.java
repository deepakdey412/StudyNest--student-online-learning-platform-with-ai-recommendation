package com.deepak.Study_Nest.service;

import com.deepak.Study_Nest.dao.StudentDetailsRepository;
import com.deepak.Study_Nest.entity.StudentDetails;
import org.springframework.stereotype.Service;

@Service
public class StudentDetailsService  {

    private final StudentDetailsRepository studentDetailsRepo;

    public StudentDetailsService(StudentDetailsRepository studentDetailsRepo) {
        this.studentDetailsRepo = studentDetailsRepo;
    }
//Add Student
    public  void addStudent(StudentDetails studentDetails) {
        studentDetailsRepo.save(studentDetails);
    }
    //find Student by id
    public  StudentDetails addStudent(Long studentID) {
        return studentDetailsRepo.findAllById(studentID);
    }


    public  void addStudent(StudentDetails studentDetails) {
        studentDetailsRepo.save(studentDetails);
    }


}
