import React, { useState } from "react";

export default function AdminManagement() {
  const [selectedLecturer, setSelectedLecturer] = useState("GV001");
  const [assignedSubjects, setAssignedSubjects] = useState([
    { code: "CTDL", name: "Cấu trúc dữ liệu", credits: 3 },
    { code: "CSDL", name: "Cơ sở dữ liệu", credits: 3 },
    { code: "JAVA", name: "Lập trình Java", credits: 4 }
  ]);

  return (
    <div style={{ padding: 20 }}>
      <h2>QUẢN LÝ MÔN HỌC & PHÂN CÔNG GIẢNG VIÊN (MH07)</h2>
      <div style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd", borderRadius: 6, backgroundColor: "#fff" }}>
        <p><b>Đang phân công:</b> {assignedSubjects.length}/4 môn (Quy định QĐ1: Tối đa 4 môn/GV)</p>
        {assignedSubjects.length >= 4 && (
          <p style={{ color: "red" }}>⚠️ Giảng viên đã đạt giới hạn tối đa 4 môn phụ trách (QĐ1).</p>
        )}
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Mã môn</th>
            <th>Tên môn học</th>
            <th>Số tín chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {assignedSubjects.map((sub) => (
            <tr key={sub.code}>
              <td>{sub.code}</td>
              <td>{sub.name}</td>
              <td>{sub.credits}</td>
              <td>
                <button style={{ color: "red", cursor: "pointer" }}>Gỡ phân công</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
