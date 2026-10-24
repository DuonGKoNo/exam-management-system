package com.university.service;

import com.university.dto.ExamDto;
import com.university.model.Exam;
import com.university.model.Subject;
import com.university.repository.ExamRepository;
import com.university.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeThiService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Transactional
    public Exam createExam(ExamDto dto) {
        // QĐ2: Ràng buộc số câu hỏi từ 1 đến 5
        if (dto.getQuestionIds() == null || dto.getQuestionIds().isEmpty() || dto.getQuestionIds().size() > 5) {
            throw new IllegalArgumentException("Đề thi phải có từ 1 đến 5 câu hỏi (QĐ2)");
        }

        // QĐ2: Ràng buộc thời lượng từ 30 đến 180 phút
        if (dto.getDurationMinutes() == null || dto.getDurationMinutes() < 30 || dto.getDurationMinutes() > 180) {
            throw new IllegalArgumentException("Thời lượng làm bài phải trong khoảng 30 - 180 phút (QĐ2)");
        }

        // QĐ2: Mã đề thi duy nhất
        if (examRepository.findByExamCode(dto.getExamCode()).isPresent()) {
            throw new IllegalArgumentException("Mã đề thi đã tồn tại trên hệ thống");
        }

        Subject subject = subjectRepository.findById(dto.getSubjectId())
                .orElseThrow(() -> new IllegalArgumentException("Môn học không tồn tại"));

        Exam exam = Exam.builder()
                .examCode(dto.getExamCode())
                .subject(subject)
                .lecturerId(dto.getLecturerId())
                .semester(dto.getSemester())
                .schoolYear(dto.getSchoolYear())
                .durationMinutes(dto.getDurationMinutes())
                .examDate(dto.getExamDate())
                .build();

        return examRepository.save(exam);
    }
}
