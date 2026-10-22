# MiniBlog — React + TypeScript (Vite)

Bài kiểm tra giữa kỳ **Xây dựng ứng dụng MiniBlog (React + TypeScript)**.

## 1. Yêu cầu môi trường

- Cài Node.js và npm (khuyến nghị Node.js 22 trở lên).
- Visual Studio Code, trình duyệt Chrome/Edge.
- Cần kết nối Internet để tải bài viết và bình luận từ JSONPlaceholder ở lần truy cập.

## 2. Chạy project trên VS Code

1. Giải nén file ZIP, mở đúng **thư mục MiniBlog** bằng VS Code (`File > Open Folder`).
2. Vào `Terminal > New Terminal` rồi chạy:

   ```bash
   npm install
   npm run dev
   ```

3. Bấm đường dẫn `Local` in ra trong terminal (thường là `http://localhost:5173/`).
4. Muốn dừng server: nhấn `Ctrl + C` trong terminal.

**Kiểm tra lỗi TypeScript / tạo bản build:**

```bash
npm run typecheck
npm run build
```

## 3. Các chức năng theo đề bài

| STT | Yêu cầu | Vị trí thực hiện |
| --- | --- | --- |
| 1 | Trang chủ hiển thị danh sách bài viết, tìm theo tiêu đề | `/` - `HomePage.tsx`, `PostCard.tsx` |
| 2 | Xem chi tiết bài viết và danh sách bình luận | `/posts/:id` - `DetailPage.tsx` |
| 3 | Hiển thị trạng thái loading và lỗi tải API | `PostsContext.tsx`, `DetailPage.tsx`, `UI.tsx` |
| 4 | Đăng nhập/đăng xuất, chỉ user đăng nhập vào trang viết | `/login`, `AuthContext.tsx`, `ProtectedRoute.tsx`, header |
| 5 | Form đăng bài có validation, lưu vào `localStorage`, xuất hiện cùng các bài cũ | `/write`, `PostsContext.tsx`, `storage.ts` |
| 6 | Trang 404 với URL không có route hoặc ID bài viết không tồn tại | `NotFoundPage.tsx` |

Các chức năng cộng thêm: phân trang 9 bài/trang, tìm kiếm không phân biệt chữ hoa/thường/dấu tiếng Việt, trạng thái khi không có bài khớp, nút retry, giao diện responsive, icon và trạng thái điều hướng.

## 4. Tài khoản đăng nhập

- **Tên đăng nhập:** `admin`
- **Mật khẩu:** `123456`

Sau khi đăng nhập có thể chọn **Viết bài**. Nếu truy cập `/write` khi chưa đăng nhập, ứng dụng tự chuyển sang `/login` rồi quay lại trang viết sau đăng nhập.

> Đây là cơ chế đăng nhập mô phỏng ở phía frontend để đáp ứng yêu cầu bài tập. Không sử dụng trong sản phẩm thật vì thông tin tài khoản được cố định phía client.

## 5. Nguồn dữ liệu & cách hoạt động

- `GET https://jsonplaceholder.typicode.com/posts`: danh sách 100 bài viết mẫu.
- `GET https://jsonplaceholder.typicode.com/posts/:id/comments`: danh sách bình luận từng bài.
- Các yêu cầu HTTP được thực hiện bằng **fetch**, trong `src/api.ts`.
- Bài viết mới **không gửi lên JSONPlaceholder**, mà lưu trên trình duyệt tại key `miniblog_posts_v1` trong `localStorage` theo đúng đề. Các bài này xuất hiện đầu danh sách và được giữ sau khi tải lại trang (trong cùng trình duyệt/profile).
- Trạng thái đăng nhập mẫu lưu tại key `miniblog_logged_in_v1`.
- LocalStorage thuộc một trình duyệt cụ thể, nên bài viết mới không tự đồng bộ sang máy khác.

## 6. Cấu trúc thư mục

```text
MiniBlog/
├── public/
│   └── favicon.svg
├── src/
│   ├── api.ts
│   ├── App.tsx
│   ├── main.tsx
│   ├── storage.ts
│   ├── types.ts
│   ├── styles.css
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── PostCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── UI.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── PostsContext.tsx
│   └── pages/
│       ├── DetailPage.tsx
│       ├── HomePage.tsx
│       ├── LoginPage.tsx
│       ├── NotFoundPage.tsx
│       └── WritePage.tsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json (nếu có, sinh khi chạy npm install)
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
└── vite.config.ts
```

## 7. Checklist trước khi nộp

- [ ] Chạy được `npm install`, `npm run dev`, `npm run build`.
- [ ] Trang chủ có bài viết lấy từ API, ô tìm theo tiêu đề hoạt động.
- [ ] Click vào một bài viết xem được nội dung và bình luận.
- [ ] Thử tắt mạng để thấy thông báo lỗi và nút **Thử lại**.
- [ ] Khi chưa đăng nhập, `/write` tự chuyển tới `/login`.
- [ ] Đăng nhập bằng `admin / 123456`, đăng bài hợp lệ; bài mới lên đầu danh sách.
- [ ] Tải lại trang, bài mới vẫn còn trong localStorage.
- [ ] Đăng xuất, không vào được trang viết.
- [ ] Truy cập `/duong-dan-khong-co` xem trang 404.
- [ ] Đổi tên file ZIP thành `<MãSV>_KTGK.zip` (ví dụ `B23DCCN001_KTGK.zip`).
- [ ] **Không nén** `node_modules/`, `dist/`, `build/`.

## 8. Lưu ý triển khai

Dự án dùng `BrowserRouter`. Khi chạy qua Vite, việc mở trực tiếp URL `/posts/1` sẽ hoạt động. Khi triển khai lên các host tĩnh khác, cần cấu hình fallback về `index.html` cho các route của React Router.

Nếu trang trắng: mở Developer Tools (`F12 > Console`) để xem lỗi, kiểm tra đã chạy `npm install` và chạy đúng thư mục `MiniBlog` có `package.json` hay chưa.
