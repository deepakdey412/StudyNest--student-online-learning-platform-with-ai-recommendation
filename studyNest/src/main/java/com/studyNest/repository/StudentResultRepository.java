package com.studyNest.repository;

import com.studyNest.model.Student;
import com.studyNest.model.StudentResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentResultRepository extends JpaRepository<StudentResult, Long> {

    // Fetch all results for a specific student and semester
    List<StudentResult> findByStudentAndModuleSemester(Student student, Integer moduleSemester);

    // Fetch single result by student PRN and semester
    Optional<StudentResult> findByStudent_PrnAndModuleSemester(String prn, Integer moduleSemester);


    // For progress bar
    StudentResult findByStudent(Student student);

    // for admin
    List<StudentResult> findByModuleSemesterAndStatus(Integer moduleSemester, String status);

    public StudentResult findByStudentNameAndRollNumber(String name, String rollNumber);

}
