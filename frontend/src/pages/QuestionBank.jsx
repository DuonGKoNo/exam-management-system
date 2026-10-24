import React, { useState } from "react";

export default function QuestionBank() {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [content, setContent] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>NGÂN HÀNG CÂU HỎI (MH02 / BM1)</h2>
      <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 6, marginBottom: 20 }}>
        <h3>Soạn / Cập nhật câu hỏi</h3>
        <div style={{ marginBottom: 12 }}>
          <label>Môn học: </label>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">-- Chọn môn --</option>
            <option value="1">Cấu trúc dữ liệu</option>
            <option value="2">Cơ sở dữ liệu</option>
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Độ khó: </label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="EASY">Dễ (EASY)</option>
            <option value="MEDIUM">Trung bình (MEDIUM)</option>
            <option value="COMPLEX">Phức tạp (COMPLEX)</option>
            <option value="HARD">Khó (HARD)</option>
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block" }}>Nội dung câu hỏi:</label>
          <textarea
            rows="4"
            style={{ width: "100%" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button style={{ padding: "8px 16px", backgroundColor: "#0066cc", color: "#fff", border: "none" }}>
          Lưu câu hỏi
        </button>
      </div>
    </div>
  );
}
