# HỆ THỐNG QUẢN LÝ VIỆC RA ĐỀ VÀ CHẤM THI CỦA GIẢNG VIÊN
> **Môn học:** Công nghệ phần mềm / Thực hành Lab 07 (Software Implementation & Version Control)  
> **Lớp:** N2T2 – **Nhóm:** 3  
> **Giảng viên hướng dẫn:** ThS. Nguyễn Thanh Phong  

---

## 👥 Danh sách thành viên nhóm

| STT | Họ và tên | MSSV | Vai trò dự án | Email TDTU | Nhánh Git Flow phụ trách |
|:---:|---|:---:|---|---|---|
| 1 | **Bùi Đức Huy** | 52400196 | Nhóm trưởng / BA | `xbac7300@gmail.com` | `feature/report-admin` |
| 2 | **Ngô Hoàng Khải** | 52400050 | Phân tích hệ thống (SA) | `52400050@student.tdtu.edu.vn` | `feature/question-bank` |
| 3 | **Nguyễn Phú Long** | 52400213 | Thiết kế UI/UX | `52400213@student.tdtu.edu.vn` | `feature/exam-lookup-ui` |
| 4 | **Lê Đông Dương** | 52400045 | Quản lý chất lượng (QA/Tester) | `52400045@student.tdtu.edu.vn` | `feature/exam-grading` |
| 5 | **Vũ Hoàng Anh Khoa** | 52400204 | Scrum Master / Lập trình viên | `52400204@student.tdtu.edu.vn` | `feature/exam-creation` |

---

## 📌 Tổng quan dự án

Hệ thống hỗ trợ toàn bộ chu trình nghiệp vụ quản lý khảo thí của giảng viên:
- **Ngân hàng câu hỏi:** Quản lý câu hỏi theo môn học và 4 mức độ khó (Dễ, Trung bình, Phức tạp, Khó).
- **Soạn đề thi:** Tạo đề thi chuẩn hóa (1 đến 5 câu hỏi, thời lượng 30 – 180 phút, kiểm tra trùng mã đề).
- **Ghi nhận chấm thi & phúc khảo:** Nhập điểm thang 10 theo lớp học phần, tự động quy đổi điểm chữ, lưu vết lịch sử sửa điểm (Audit Log).
- **Tra cứu & Báo cáo:** Tra cứu đề thi toàn trường, tổng hợp báo cáo năm, tính toán tỉ lệ và xuất file Excel/PDF.
- **Quản trị hệ thống:** Phân quyền vai trò (Giảng viên, Phòng Đào tạo, Admin), phân công môn học (tối đa 4 môn/GV), sao lưu cơ sở dữ liệu định kỳ.

---

## 🛠 Công nghệ sử dụng (Tech Stack)

- **Backend:** Java 17, Spring Boot 3.2.x (Spring Web, Spring Data JPA, Hibernate, Validation)
- **Database:** MySQL 8.0 (14 bảng quan hệ, ràng buộc toàn vẹn CHECK/UNIQUE/FK, View báo cáo)
- **Frontend:** ReactJS 18, Vite, Axios
- **Quản lý mã nguồn:** Git & GitHub theo mô hình **Git Flow**

---

## 📂 Cấu trúc thư mục dự án

```text
exam-management-system/
├── backend/                                # Mã nguồn Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/university/        # Các package mã nguồn Java
│   │   │   │   ├── config/                 # Cấu hình ứng dụng, bảo mật, CORS
│   │   │   │   ├── controller/             # REST API Controllers
│   │   │   │   ├── dto/                    # Data Transfer Objects
│   │   │   │   ├── model/                  # JPA Entities (14 bảng)
│   │   │   │   ├── repository/             # Spring Data JPA Repositories
│   │   │   │   ├── service/                # Business Logic & Validation
│   │   │   │   └── Application.java        # Main Application Class
│   │   │   └── resources/
│   │   │       └── application.properties  # Cấu hình kết nối CSDL, cổng server
│   │   └── test/                           # Unit tests & Integration tests
│   ├── pom.xml                             # Cấu hình Maven dependencies
│   └── .gitignore
├── frontend/                               # Mã nguồn ReactJS Frontend
│   ├── src/
│   │   ├── components/                     # Components dùng chung (Header, Sidebar...)
│   │   ├── pages/                          # Các màn hình chính (Login, Exam, Grading...)
│   │   ├── services/                       # Cấu hình API client (Axios)
│   │   ├── App.jsx                         # Main Routing Component
│   │   └── main.jsx                        # React Root Entry Point
│   ├── package.json                        # Cấu hình NPM dependencies
│   └── .gitignore
├── docs/                                   # Tài liệu thiết kế từ Lab 6
│   ├── architecture.md                     # Tài liệu kiến trúc 3 lớp
│   ├── database-design.md                  # Thiết kế 14 bảng CSDL và Script SQL
│   └── ui-design.md                        # Mô tả 7 màn hình Wireframes
├── .gitignore
└── README.md
```

---

## 🚀 Hướng dẫn cài đặt và khởi chạy

### 1. Chuẩn bị Cơ sở dữ liệu
- Mở MySQL Workbench hoặc CLI:
```sql
CREATE DATABASE exam_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
- Chạy script tạo bảng trong tệp `docs/database-design.md`.

### 2. Khởi chạy Backend (Spring Boot)
```bash
cd backend
# Cấu hình biến môi trường nếu cần: DB_URL, DB_USERNAME, DB_PASSWORD
mvn spring-boot:run
```
Backend lắng nghe tại: `http://localhost:8080`

### 3. Khởi chạy Frontend (ReactJS)
```bash
cd frontend
npm install
npm run dev
```
Giao diện chạy tại: `http://localhost:5173`

---

## 🌿 Quy định phát triển mã nguồn (Git Flow)

1. **`main`**: Nhánh lưu trữ phiên bản ổn định, sẵn sàng phát hành. Tuyệt đối không commit trực tiếp.
2. **`develop`**: Nhánh tích hợp các tính năng đang phát triển của nhóm.
3. **`feature/*`**: Nhánh phát triển tính năng riêng của từng thành viên:
   - Tạo nhánh mới từ `develop`: `git switch develop && git pull && git switch -c feature/<ten-tinh-nang>`
   - Hoàn thành chức năng, kiểm thử và commit rõ ràng.
   - Đẩy nhánh lên GitHub: `git push -u origin feature/<ten-tinh-nang>`
   - Tạo **Pull Request (PR)** từ `feature/*` vào `develop`.
   - Thành viên khác thực hiện **Code Review**, phê duyệt và tiến hành merge vào `develop`.
