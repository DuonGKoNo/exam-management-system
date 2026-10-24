package com.university.controller;

import com.university.model.Question;
import com.university.service.CauHoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cau-hoi")
@CrossOrigin(origins = "*")
public class CauHoiController {

    @Autowired
    private CauHoiService cauHoiService;

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions(@RequestParam(required = false) Long subjectId) {
        if (subjectId != null) {
            return ResponseEntity.ok(cauHoiService.getQuestionsBySubject(subjectId));
        }
        return ResponseEntity.ok(cauHoiService.getAllQuestions());
    }

    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody Question question) {
        try {
            Question saved = cauHoiService.createQuestion(question);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
