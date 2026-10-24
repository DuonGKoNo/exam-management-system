package com.university.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExamDto {
    private String examCode;
    private Long subjectId;
    private Long lecturerId;
    private Integer semester;
    private String schoolYear;
    private Integer durationMinutes; // 30 - 180 (QĐ2)
    private LocalDate examDate;
    private List<Long> questionIds;  // 1 - 5 câu hỏi (QĐ2)
}
