import React, { useState } from "react";

export default function Grading() {
  const [selectedClass, setSelectedClass] = useState("");
  const [scoreInput, setScoreInput] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>GHI NHẬN KẾT QUẢ CHẤM THI (BM3)</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Chọn Lớp học phần: </label>
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">-- Chọn lớp học phần --</option>
          <option value="CTDL_N02">CTDL_N02 - Cấu trúc dữ liệu</option>
        </select>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>STT</th>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Điểm số (0-10)</th>
            <th>Điểm chữ</th>
            <th>Vắng thi</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>52400001</td>
            <td>Trần Thị B</td>
            <td>8.5</td>
            <td>A</td>
            <td>Không</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
