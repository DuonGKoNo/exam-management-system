package com.university.service;

import org.springframework.stereotype.Service;

@Service
public class QuanTriService {

    // QĐ1: Mỗi giảng viên phụ trách tối đa 4 môn
    public void kiemTraPhanCongMon(int currentSubjectCount) {
        if (currentSubjectCount >= 4) {
            throw new IllegalStateException("Giảng viên đã phụ trách tối đa 4 môn học (QĐ1)");
        }
    }
}
