package com.university.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "grade_sheets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeSheet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_sheet_id")
    private Long gradeSheetId;

    @Column(name = "section_id", nullable = false, unique = true)
    private Long sectionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @Column(name = "graded_date")
    private LocalDate gradedDate;

    @Column(nullable = false, length = 20)
    private String status = "DRAFT"; // 'DRAFT', 'SAVED'
}
