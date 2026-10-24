import React, { useState } from "react";
import Login from "./pages/Login";
import ExamCreation from "./pages/ExamCreation";
import Grading from "./pages/Grading";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Top Header */}
      <header style={{ backgroundColor: "#003366", color: "#fff", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>HỆ THỐNG QUẢN LÝ VIỆC RA ĐỀ & CHẤM THI CỦA GIẢNG VIÊN</h2>
        <div>
          {currentUser ? (
            <span>
              Xin chào, <b>{currentUser.fullName}</b> |{" "}
              <button onClick={() => setCurrentUser(null)} style={{ cursor: "pointer", background: "none", border: "none", color: "#ffcc00" }}>
                Đăng xuất
              </button>
            </span>
          ) : (
            <span>Chưa đăng nhập</span>
          )}
        </div>
      </header>

      {/* Navigation Bar */}
      <nav style={{ backgroundColor: "#e9ecef", padding: "10px 24px", display: "flex", gap: 12 }}>
        <button onClick={() => setActiveTab("login")} style={{ padding: "6px 12px", cursor: "pointer" }}>
          MH01: Đăng nhập
        </button>
        <button onClick={() => setActiveTab("exam-creation")} style={{ padding: "6px 12px", cursor: "pointer" }}>
          MH03: Soạn đề thi
        </button>
        <button onClick={() => setActiveTab("grading")} style={{ padding: "6px 12px", cursor: "pointer" }}>
          MH04: Chấm thi
        </button>
      </nav>

      {/* Main Content Area */}
      <main style={{ padding: "20px 24px" }}>
        {activeTab === "login" && <Login onLoginSuccess={(user) => { setCurrentUser(user); setActiveTab("exam-creation"); }} />}
        {activeTab === "exam-creation" && <ExamCreation />}
        {activeTab === "grading" && <Grading />}
      </main>
    </div>
  );
}
