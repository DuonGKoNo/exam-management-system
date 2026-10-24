# THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE DESIGN)

**Hệ quản trị CSDL:** MySQL 8.0  
**Tên Database:** `exam_management_db`  
**Quy mô:** 14 bảng quan hệ + 1 View báo cáo tổng hợp  

---

## 1. Danh sách 14 bảng dữ liệu

1. `users`: Lưu thông tin tài khoản người dùng và vai trò truy cập (`LECTURER`, `TRAINING_OFFICE`, `ADMIN`).
2. `lecturers`: Mở rộng thông tin riêng cho giảng viên (liên kết 1-1 với `users`).
3. `subjects`: Danh mục môn học và số tín chỉ.
4. `lecturer_subjects`: Phân công môn học cho giảng viên (tối đa 4 môn/GV theo QĐ1).
5. `questions`: Ngân hàng câu hỏi theo môn học, người tạo và mức độ khó (QĐ1).
6. `exams`: Thông tin đề thi (học kỳ, năm học, thời lượng 30-180 phút theo QĐ2, ngày thi).
7. `exam_questions`: Chi tiết các câu hỏi trong đề thi (1 đến 5 câu theo QĐ2).
8. `students`: Danh mục sinh viên trong trường.
9. `class_sections`: Danh mục lớp học phần.
10. `section_students`: Danh sách sinh viên thuộc lớp học phần.
11. `grade_sheets`: Bảng điểm của từng lớp học phần gắn với đề thi sử dụng.
12. `exam_results`: Kết quả thi của từng sinh viên (điểm số, điểm chữ, vắng thi).
13. `grade_change_logs`: Lịch sử lưu vết chỉnh sửa điểm phục vụ kiểm toán và phúc khảo (BR04).
14. `backup_logs`: Nhật ký theo dõi kết quả sao lưu tự động hàng ngày (UC15).

---

## 2. Script tạo Database và Bảng (MySQL 8 DDL)

```sql
CREATE DATABASE IF NOT EXISTS exam_management_db
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE exam_management_db;

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('LECTURER','TRAINING_OFFICE','ADMIN')),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE','LOCKED')),
    failed_login_count INT NOT NULL DEFAULT 0,
    locked_until DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lecturers (
    lecturer_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL UNIQUE,
    lecturer_code VARCHAR(20) NOT NULL UNIQUE,
    academic_title VARCHAR(50) NULL,
    home_district VARCHAR(100) NULL,
    home_province VARCHAR(100) NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE subjects (
    subject_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    subject_code VARCHAR(20) NOT NULL UNIQUE,
    subject_name VARCHAR(150) NOT NULL,
    credits INT NOT NULL CHECK (credits > 0)
);

CREATE TABLE lecturer_subjects (
    lecturer_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (lecturer_id, subject_id),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(lecturer_id),
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
);

CREATE TABLE questions (
    question_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    question_code VARCHAR(30) NOT NULL UNIQUE,
    subject_id BIGINT NOT NULL,
    author_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('EASY','MEDIUM','COMPLEX','HARD')),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (author_id) REFERENCES lecturers(lecturer_id)
);

CREATE TABLE exams (
    exam_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    exam_code VARCHAR(30) NOT NULL UNIQUE,
    subject_id BIGINT NOT NULL,
    lecturer_id BIGINT NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 3),
    school_year VARCHAR(9) NOT NULL,
    duration_minutes INT NOT NULL CHECK (duration_minutes BETWEEN 30 AND 180),
    exam_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(lecturer_id)
);

CREATE TABLE exam_questions (
    exam_id BIGINT NOT NULL,
    question_order INT NOT NULL CHECK (question_order BETWEEN 1 AND 5),
    question_id BIGINT NOT NULL,
    max_score DECIMAL(4,2) NULL CHECK (max_score BETWEEN 0 AND 10),
    PRIMARY KEY (exam_id, question_order),
    UNIQUE (exam_id, question_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE students (
    student_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_code VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NULL
);

CREATE TABLE class_sections (
    section_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    section_code VARCHAR(30) NOT NULL UNIQUE,
    section_name VARCHAR(100) NOT NULL,
    subject_id BIGINT NOT NULL,
    lecturer_id BIGINT NOT NULL,
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 3),
    school_year VARCHAR(9) NOT NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    FOREIGN KEY (lecturer_id) REFERENCES lecturers(lecturer_id)
);

CREATE TABLE section_students (
    section_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    PRIMARY KEY (section_id, student_id),
    FOREIGN KEY (section_id) REFERENCES class_sections(section_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE grade_sheets (
    grade_sheet_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    section_id BIGINT NOT NULL UNIQUE,
    exam_id BIGINT NOT NULL,
    graded_date DATE NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','SAVED')),
    FOREIGN KEY (section_id) REFERENCES class_sections(section_id),
    FOREIGN KEY (exam_id) REFERENCES exams(exam_id)
);

CREATE TABLE exam_results (
    result_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    grade_sheet_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    score DECIMAL(4,2) NULL CHECK (score BETWEEN 0 AND 10),
    letter_grade VARCHAR(2) NULL,
    is_absent BOOLEAN NOT NULL DEFAULT FALSE,
    note VARCHAR(255) NULL,
    UNIQUE (grade_sheet_id, student_id),
    FOREIGN KEY (grade_sheet_id) REFERENCES grade_sheets(grade_sheet_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE grade_change_logs (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    result_id BIGINT NOT NULL,
    changed_by BIGINT NOT NULL,
    changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    old_score DECIMAL(4,2) NULL,
    new_score DECIMAL(4,2) NOT NULL CHECK (new_score BETWEEN 0 AND 10),
    reason VARCHAR(255) NOT NULL,
    FOREIGN KEY (result_id) REFERENCES exam_results(result_id),
    FOREIGN KEY (changed_by) REFERENCES users(user_id)
);

CREATE TABLE backup_logs (
    backup_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    started_at DATETIME NOT NULL,
    finished_at DATETIME NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('RUNNING','SUCCESS','FAILED')),
    file_path VARCHAR(255) NULL,
    triggered_by BIGINT NULL,
    FOREIGN KEY (triggered_by) REFERENCES users(user_id)
);

-- View Báo cáo năm
CREATE OR REPLACE VIEW v_annual_report AS
SELECT s.subject_id, s.subject_name, e.school_year,
       COUNT(DISTINCT e.exam_id) AS exam_count,
       COUNT(r.result_id) AS graded_count
FROM subjects s
JOIN exams e ON e.subject_id = s.subject_id
LEFT JOIN grade_sheets g ON g.exam_id = e.exam_id
LEFT JOIN exam_results r ON r.grade_sheet_id = g.grade_sheet_id AND r.is_absent = FALSE
GROUP BY s.subject_id, s.subject_name, e.school_year;
```
