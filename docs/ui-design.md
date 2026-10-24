# THIẾT KẾ GIAO DIỆN NGƯỜI DÙNG (UI DESIGN)

**Công nghệ:** ReactJS  
**Quy chuẩn thiết kế:** Layout 3 phần: Top Header (thông tin user, đăng xuất), Left Sidebar (menu theo vai trò), Right Main Content.

---

## 1. Danh mục các màn hình chính

| Mã MH | Tên màn hình | Đối tượng sử dụng | Mô tả chức năng |
|---|---|---|---|
| **MH01** | Đăng nhập hệ thống | Tất cả | Xác thực tài khoản, mật khẩu, phân quyền vai trò. Khóa 15 phút nếu sai 5 lần liên tiếp. |
| **MH02** | Ngân hàng câu hỏi | Giảng viên | Soạn thảo, tìm kiếm theo môn/độ khó (Dễ, TB, Phức tạp, Khó). Không cho sửa/xóa câu hỏi đã dùng trong đề thi. |
| **MH03** | Soạn đề thi | Giảng viên | Chọn môn, thời lượng (30-180 phút), chọn từ 1-5 câu hỏi trong ngân hàng, kiểm tra trùng mã đề. |
| **MH04** | Ghi nhận chấm thi & phúc khảo | Giảng viên | Nhập điểm theo lớp học phần (thang 0-10, vắng thi), tự động quy đổi điểm chữ. Hộp thoại sửa điểm bắt buộc nhập lý do (lưu audit log). |
| **MH05** | Tra cứu đề thi | Giảng viên, Phòng Đào tạo | Tìm kiếm đề thi theo mã đề/ngày thi, xem danh sách câu hỏi trong đề, xuất bản in PDF. |
| **MH06** | Báo cáo năm | Giảng viên, Phòng Đào tạo | Thống kê số lượng đề thi, số bài đã chấm theo từng môn, tính toán tỉ lệ phần trăm, hỗ trợ xuất Excel/PDF. |
| **MH07** | Quản lý môn học & Phân công | Quản trị viên | Danh mục môn học, phân công giảng viên phụ trách (ràng buộc tối đa 4 môn/GV theo QĐ1). |
