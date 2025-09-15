package com.deepak.Study_Nest.dao;

import com.deepak.Study_Nest.entity.TutorDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TutorDetailsRepository extends JpaRepository<TutorDetails, Long> {
    Optional<TutorDetails> findByEmail(String email);
}
