package com.university.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GradeUpdateRequest {
    private Long resultId;
    private Long changedBy; // ID người sửa (Giảng viên / Ban phúc khảo)
    private Double oldScore;
    private Double newScore; // 0 - 10 (QĐ3)
    private String reason;   // Bắt buộc nhập lý do sửa (BR04)
}
