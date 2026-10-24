package com.university.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "exams")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    private Long examId;

    @Column(name = "exam_code", nullable = false, unique = true, length = 30)
    private String examCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "lecturer_id", nullable = false)
    private Long lecturerId;

    @Column(nullable = false)
    private Integer semester;

    @Column(name = "school_year", nullable = false, length = 9)
    private String schoolYear;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes; // 30 - 180 (QĐ2)

    @Column(name = "exam_date", nullable = false)
    private LocalDate examDate;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
