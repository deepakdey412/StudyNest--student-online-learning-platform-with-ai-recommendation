package com.studyNest.repository;

import com.studyNest.model.Module;
import com.studyNest.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    // Existing method
    List<Question> findByModule(Module module);
}
