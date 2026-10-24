import React, { useState } from "react";
import Login from "./pages/Login";
import QuestionBank from "./pages/QuestionBank";
import ExamCreation from "./pages/ExamCreation";
import Grading from "./pages/Grading";
import ExamLookup from "./pages/ExamLookup";
import AnnualReport from "./pages/AnnualReport";

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    fullName: "Lê Đông Dương (Demo)",
    role: "LECTURER"
  });
  const [activeTab, setActiveTab] = useState("question-bank");

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      {/* Top Header */}
      <header style={{ backgroundColor: "#003366", color: "#fff", padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20 }}>HỆ THỐNG QUẢN LÝ VIỆC RA ĐỀ & CHẤM THI CỦA GIẢNG VIÊN</h2>
          <small style={{ color: "#b0c4de" }}>Nhóm 3 - N2T2 | Môn: Công nghệ phần mềm (Lab 07)</small>
        </div>
        <div>
          {currentUser ? (
            <span>
              Xin chào, <b>{currentUser.fullName}</b> ({currentUser.role}) |{" "}
              <button onClick={() => setCurrentUser(null)} style={{ cursor: "pointer", background: "none", border: "none", color: "#ffcc00", fontWeight: "bold" }}>
                Đăng xuất
              </button>
            </span>
          ) : (
            <span>Chưa đăng nhập</span>
          )}
        </div>
      </header>

      {/* Navigation Bar */}
      <nav style={{ backgroundColor: "#e2e6ea", padding: "10px 28px", display: "flex", gap: 10, flexWrap: "wrap", borderBottom: "1px solid #ced4da" }}>
        <button
          onClick={() => setActiveTab("login")}
          style={{ padding: "8px 14px", cursor: "pointer", fontWeight: activeTab === "login" ? "bold" : "normal" }}
        >
          MH01: Đăng nhập
        </button>
        <button
          onClick={() => setActiveTab("question-bank")}
          style={{ padding: "8px 14px", cursor: "pointer", fontWeight: activeTab === "question-bank" ? "bold" : "normal" }}
        >
          MH02: Ngân hàng câu hỏi
        </button>
        <button
          onClick={() => setActiveTab("exam-creation")}
          style={{ padding: "8px 14px", cursor: "pointer", fontWeight: activeTab === "exam-creation" ? "bold" : "normal" }}
        >
          MH03: Soạn đề thi
        </button>
        <button
          onClick={() => setActiveTab("grading")}
          style={{ padding: "8px 14px", cursor: "pointer", fontWeight: activeTab === "grading" ? "bold" : "normal" }}
        >
          MH04: Chấm thi & Phúc khảo
        </button>
        <button
          onClick={() => setActiveTab("exam-lookup")}
          style={{ padding: "8px 14px", cursor: "pointer", fontWeight: activeTab === "exam-lookup" ? "bold" : "normal" }}
        >
          MH05: Tra cứu đề thi
        </button>
        <button
          onClick={() => setActiveTab("annual-report")}
          style={{ padding: "8px 14px", cursor: "pointer", fontWeight: activeTab === "annual-report" ? "bold" : "normal" }}
        >
          MH06: Báo cáo năm
        </button>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
        {activeTab === "login" && <Login onLoginSuccess={(user) => { setCurrentUser(user); setActiveTab("question-bank"); }} />}
        {activeTab === "question-bank" && <QuestionBank />}
        {activeTab === "exam-creation" && <ExamCreation />}
        {activeTab === "grading" && <Grading />}
        {activeTab === "exam-lookup" && <ExamLookup />}
        {activeTab === "annual-report" && <AnnualReport />}
      </main>
    </div>
  );
}
