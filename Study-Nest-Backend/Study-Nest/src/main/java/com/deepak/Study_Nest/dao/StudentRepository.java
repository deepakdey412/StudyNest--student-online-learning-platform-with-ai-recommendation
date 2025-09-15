package com.deepak.Study_Nest.dao;

import com.deepak.Study_Nest.entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentDetails, Long> {
    Optional<StudentDetails> findByEmail(String email);
}
