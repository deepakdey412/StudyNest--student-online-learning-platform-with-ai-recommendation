package com.studyNest.repository;

import com.studyNest.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findBySemester(int semester);
}
