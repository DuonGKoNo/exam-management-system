package com.university.service;

import org.springframework.stereotype.Service;

@Service
public class ChamThiService {

    // BR08: Quy đổi thang điểm số 0-10 sang thang điểm chữ
    public String quyDoiDiemChu(Double score, Boolean isAbsent) {
        if (Boolean.TRUE.equals(isAbsent) || score == null) {
            return "F";
        }
        if (score >= 8.5) return "A";
        if (score >= 8.0) return "B+";
        if (score >= 7.0) return "B";
        if (score >= 6.5) return "C+";
        if (score >= 5.5) return "C";
        if (score >= 5.0) return "D+";
        if (score >= 4.0) return "D";
        return "F";
    }

    // QĐ3: Kiểm tra tính hợp lệ điểm số
    public void kiemTraHopLeDiem(Double score) {
        if (score != null && (score < 0.0 || score > 10.0)) {
            throw new IllegalArgumentException("Điểm số phải nằm trong khoảng từ 0.0 đến 10.0 (QĐ3)");
        }
    }
}
