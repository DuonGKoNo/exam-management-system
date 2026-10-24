package com.university.repository;

import com.university.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findBySubject_SubjectId(Long subjectId);
    List<Question> findByDifficulty(String difficulty);
}
