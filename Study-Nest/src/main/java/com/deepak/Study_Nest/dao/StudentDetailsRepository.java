package com.deepak.Study_Nest.dao;

import com.deepak.Study_Nest.entity.StudentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDetailsRepository extends JpaRepository<StudentDetails , Long> {
}
