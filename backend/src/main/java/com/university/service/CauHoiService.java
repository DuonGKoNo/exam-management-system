package com.university.service;

import com.university.model.Question;
import com.university.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CauHoiService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getQuestionsBySubject(Long subjectId) {
        return questionRepository.findBySubject_SubjectId(subjectId);
    }

    public Question createQuestion(Question question) {
        // QĐ1: 4 mức độ khó: EASY, MEDIUM, COMPLEX, HARD
        if (question.getDifficulty() == null ||
            !List.of("EASY", "MEDIUM", "COMPLEX", "HARD").contains(question.getDifficulty())) {
            throw new IllegalArgumentException("Độ khó không hợp lệ. Phải thuộc: EASY, MEDIUM, COMPLEX, HARD (QĐ1)");
        }
        return questionRepository.save(question);
    }
}
