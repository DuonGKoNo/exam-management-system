package com.university.repository;

import com.university.model.GradeSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GradeSheetRepository extends JpaRepository<GradeSheet, Long> {
    Optional<GradeSheet> findBySectionId(Long sectionId);
}
