import React, { useState } from "react";

export default function ExamLookup() {
  const [examCodeSearch, setExamCodeSearch] = useState("");
  const [examDateSearch, setExamDateSearch] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>TRA CỨU ĐỀ THI (MH05 / BM4)</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div>
          <label>Mã số đề thi: </label>
          <input
            type="text"
            placeholder="VD: DT-CTDL-001"
            value={examCodeSearch}
            onChange={(e) => setExamCodeSearch(e.target.value)}
          />
        </div>
        <div>
          <label>Ngày thi: </label>
          <input
            type="date"
            value={examDateSearch}
            onChange={(e) => setExamDateSearch(e.target.value)}
          />
        </div>
        <button style={{ padding: "4px 12px", backgroundColor: "#0066cc", color: "#fff", border: "none" }}>
          Tra cứu
        </button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>STT</th>
            <th>Mã số đề thi</th>
            <th>Môn thi</th>
            <th>Thời lượng</th>
            <th>Ngày thi</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>DT-CTDL-001</td>
            <td>Cấu trúc dữ liệu</td>
            <td>90 phút</td>
            <td>15/01/2027</td>
            <td>
              <button style={{ cursor: "pointer" }}>Xem chi tiết</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
