# TÀI LIỆU THIẾT KẾ KIẾN TRÚC HỆ THỐNG (ARCHITECTURE DESIGN)

**Đề tài:** Hệ thống quản lý việc ra đề và chấm thi của giảng viên  
**Môn học:** Công nghệ phần mềm  
**Lớp:** N2T2 – Nhóm: 3  
**GVHD:** ThS. Nguyễn Thanh Phong  

---

## 1. Mô hình kiến trúc tổng thể (3-Tier Architecture)

Hệ thống được xây dựng theo kiến trúc 3 lớp:
1. **Lớp Giao diện (Presentation Layer - ReactJS):**
   - Cung cấp giao diện Web UI tương tác cho Giảng viên, Chuyên viên Phòng Đào tạo và Quản trị viên.
   - Xử lý xác thực đầu vào sơ bộ tại Client (trường bắt buộc, định dạng số, giới hạn 1–5 câu hỏi cho đề thi).
   - Giao tiếp với lớp Nghiệp vụ thông qua RESTful API chuẩn JSON qua giao thức HTTPS.

2. **Lớp Nghiệp vụ (Business Logic Layer - Spring Boot):**
   - Tổ chức theo mô hình Controller – Service – Repository tương ứng kiến trúc Boundary – Control – Entity:
     - **API Controllers:** Tiếp nhận và điều hướng HTTP Request (`AuthController`, `CauHoiController`, `DeThiController`, `ChamThiController`, `BaoCaoController`, `QuanTriController`).
     - **Services:** Chứa toàn bộ quy tắc nghiệp vụ cốt lõi (QĐ1, QĐ2, QĐ3, BR01–BR09), xử lý giao dịch dữ liệu `@Transactional`, chuyển đổi điểm chữ, lưu vết thay đổi (Audit Log), bảo mật và phân quyền vai trò (RBAC).
     - **Schedulers:** `BackupScheduler` tự động kích hoạt tiến trình sao lưu cơ sở dữ liệu định kỳ mỗi cuối ngày (23:59).

3. **Lớp Dữ liệu (Data Access Layer & Database - Spring Data JPA & MySQL 8):**
   - **Spring Data JPA:** Ánh xạ các thực thể (Entities) sang bảng cơ sở dữ liệu quan hệ, che giấu chi tiết SQL và tối ưu truy vấn.
   - **MySQL 8.0:** Lưu trữ dữ liệu an toàn gồm 14 bảng quan hệ và 1 View báo cáo tổng hợp `v_annual_report`. Ràng buộc toàn vẹn được thiết lập chặt chẽ ở cấp độ CSDL (PK, FK, UNIQUE, CHECK).

---

## 2. Quy tắc nghiệp vụ cốt lõi (Business Rules)

- **QĐ1 / BR01:** Mỗi giảng viên phụ trách tối đa 4 môn học cùng lúc.
- **QĐ1 / BR02:** Ngân hàng câu hỏi phân chia theo 4 mức độ khó: `EASY`, `MEDIUM`, `COMPLEX`, `HARD`.
- **QĐ2 / BR03:** Mỗi đề thi gồm từ 1 đến 5 câu hỏi; thời lượng thi từ 30 đến 180 phút; mã đề thi là duy nhất toàn hệ thống; tất cả câu hỏi trong một đề phải thuộc cùng một môn học.
- **QĐ3 / BR04:** Điểm thi chấm theo thang điểm 0 – 10. Khi chỉnh sửa điểm (phúc khảo/chấm lại) bắt buộc phải lưu vết vào bảng `grade_change_logs` (thời gian, người sửa, điểm cũ, điểm mới, lý do).
- **BR06:** Báo cáo tổng hợp số liệu hàng năm tính toán tỉ lệ theo môn, đảm bảo tổng tỉ lệ chuẩn hóa 100%.
- **BR07:** Xác thực bắt buộc cho mọi người dùng, phân quyền theo vai trò (`LECTURER`, `TRAINING_OFFICE`, `ADMIN`).
- **BR08:** Quy đổi điểm hệ số 10 sang thang điểm chữ tự động (A, B+, B, C+, C, D+, D, F).
- **BR09:** Cơ chế khóa tài khoản tạm thời 15 phút nếu người dùng nhập sai mật khẩu liên tiếp 5 lần.
