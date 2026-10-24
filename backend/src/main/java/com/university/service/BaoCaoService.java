package com.university.service;

import org.springframework.stereotype.Service;

@Service
public class BaoCaoService {

    // BR06: Chuẩn hóa tỉ lệ theo môn, tổng đạt 100%
    public double tinhTiLe(long count, long total) {
        if (total == 0) return 0.0;
        return Math.round(((double) count / total) * 10000.0) / 100.0;
    }
}
