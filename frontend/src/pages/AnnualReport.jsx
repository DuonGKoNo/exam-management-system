import React, { useState } from "react";

export default function AnnualReport() {
  const [schoolYear, setSchoolYear] = useState("2026-2027");

  return (
    <div style={{ padding: 20 }}>
      <h2>BÁO CÁO NĂM HỌC (MH06 / BM5)</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Năm học: </label>
        <select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)}>
          <option value="2026-2027">2026-2027</option>
          <option value="2025-2026">2025-2026</option>
        </select>
        <button style={{ marginLeft: 12, padding: "4px 12px" }}>Lập báo cáo</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>STT</th>
            <th>Tên môn</th>
            <th>Số lượng đề thi</th>
            <th>Số lượng bài chấm</th>
            <th>Tỉ lệ đề thi</th>
            <th>Tỉ lệ bài chấm</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cấu trúc dữ liệu</td>
            <td>12</td>
            <td>540</td>
            <td>30.0%</td>
            <td>30.0%</td>
          </tr>
          <tr style={{ fontWeight: "bold", backgroundColor: "#fafafa" }}>
            <td colSpan="2">Tổng cộng</td>
            <td>40</td>
            <td>1800</td>
            <td>100.0%</td>
            <td>100.0%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
