import React, { useState } from "react";
import api from "../services/api";

export default function ExamCreation() {
  const [examCode, setExamCode] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [semester, setSemester] = useState(1);
  const [schoolYear, setSchoolYear] = useState("2026-2027");
  const [examDate, setExamDate] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateExam = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Client-side validation theo QĐ2: 1 đến 5 câu hỏi, 30 đến 180 phút
    if (selectedQuestions.length < 1 || selectedQuestions.length > 5) {
      setError("Đề thi phải có từ 1 đến 5 câu hỏi (QĐ2)");
      return;
    }

    if (durationMinutes < 30 || durationMinutes > 180) {
      setError("Thời lượng làm bài phải trong khoảng 30 - 180 phút (QĐ2)");
      return;
    }

    try {
      const payload = {
        examCode,
        subjectId: Number(subjectId),
        lecturerId: 1, // Demo ID
        semester: Number(semester),
        schoolYear,
        durationMinutes: Number(durationMinutes),
        examDate,
        questionIds: selectedQuestions
      };
      await api.post("/de-thi", payload);
      setMessage("Tạo đề thi thành công!");
    } catch (err) {
      setError(err.response?.data?.message || "Tạo đề thi thất bại");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>SOẠN ĐỀ THI (BM2)</h2>
      {message && <div style={{ color: "green", marginBottom: 12 }}>{message}</div>}
      {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}

      <form onSubmit={handleCreateExam}>
        <div style={{ marginBottom: 12 }}>
          <label>Mã đề thi: </label>
          <input type="text" required value={examCode} onChange={(e) => setExamCode(e.target.value)} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Thời lượng (30-180 phút): </label>
          <input
            type="number"
            min="30"
            max="180"
            required
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Số lượng câu hỏi đã chọn: {selectedQuestions.length}/5 (QĐ2)</label>
        </div>
        <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#28a745", color: "#fff", border: "none" }}>
          Lưu đề thi
        </button>
      </form>
    </div>
  );
}
