package com.university.controller;

import com.university.service.ChamThiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/cham-thi")
@CrossOrigin(origins = "*")
public class ChamThiController {

    @Autowired
    private ChamThiService chamThiService;

    @PostMapping("/validate-score")
    public ResponseEntity<?> validateScore(@RequestParam Double score) {
        try {
            chamThiService.kiemTraHopLeDiem(score);
            return ResponseEntity.ok(Map.of("valid", true, "message", "Điểm số hợp lệ (QĐ3)"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("valid", false, "message", e.getMessage()));
        }
    }

    @GetMapping("/convert-grade")
    public ResponseEntity<?> convertGrade(@RequestParam(required = false) Double score,
                                          @RequestParam(defaultValue = "false") Boolean isAbsent) {
        String letterGrade = chamThiService.quyDoiDiemChu(score, isAbsent);
        return ResponseEntity.ok(Map.of("letterGrade", letterGrade));
    }
}
