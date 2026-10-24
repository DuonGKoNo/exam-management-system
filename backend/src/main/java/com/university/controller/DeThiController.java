package com.university.controller;

import com.university.dto.ExamDto;
import com.university.model.Exam;
import com.university.service.DeThiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/de-thi")
@CrossOrigin(origins = "*")
public class DeThiController {

    @Autowired
    private DeThiService deThiService;

    @PostMapping
    public ResponseEntity<?> createExam(@RequestBody ExamDto dto) {
        try {
            Exam createdExam = deThiService.createExam(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExam);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi máy chủ nội bộ: " + e.getMessage()));
        }
    }
}
