package com.studyNest.repository;

import com.studyNest.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
    public Student findByPrn(String prn);
}
