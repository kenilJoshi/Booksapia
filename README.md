# 📚 Book Review API

A RESTful API built using **Node.js (Express)** with **MongoDB (Mongoose)** and **JWT authentication** for managing books, reviews, and user authentication.

---

## 🚀 Features

- **User Authentication**: Sign up and log in with JWT.
- **Book Management**: Add, view, and search for books.
- **Review System**: Submit, update, or delete your reviews on books.
- **Search**: Search books by title or author.
- **Pagination**: For listing books and reviews.

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository

\`\`\`bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
\`\`\`

### 2️⃣ Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3️⃣ Configure environment variables

Create a \`.env\` file:
\`\`\`
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bookreviewdb
JWT_SECRET=your_jwt_secret_key
\`\`\`

### 4️⃣ Start MongoDB

Ensure MongoDB is running locally (or update \`MONGODB_URI\` in \`.env\` to point to your remote database).

### 5️⃣ Run the server

\`\`\`bash
npm start
\`\`\`

API will be available at \`http://localhost:5000/api\`.

---

## 🔥 Example API Requests

### 📝 Sign Up

\`\`\`bash
curl -X POST http://localhost:5000/api/auth/signup \
-H "Content-Type: application/json" \
-d '{"username":"testuser", "password":"testpass"}'
\`\`\`

### 🔑 Log In

\`\`\`bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username":"testuser", "password":"testpass"}'
\`\`\`

### 📚 Add a New Book (Authenticated)

\`\`\`bash
curl -X POST http://localhost:5000/api/books \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"title":"Book Title", "author":"Author Name", "genre":"Fiction", "description":"A great book!"}'
\`\`\`

### 📖 Get All Books (Paginated & Filtered)

\`\`\`bash
curl "http://localhost:5000/api/books?page=1&limit=5&author=Author%20Name&genre=Fiction"
\`\`\`

### 🔍 Search Books

\`\`\`bash
curl "http://localhost:5000/api/books/search?q=Harry"
\`\`\`

### 📖 Get Book by ID

\`\`\`bash
curl "http://localhost:5000/api/books/<book_id>"
\`\`\`

### ✍️ Submit a Review

\`\`\`bash
curl -X POST http://localhost:5000/api/reviews/<book_id> \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"rating":5,"comment":"Loved this book!"}'
\`\`\`

### ✏️ Update Review

\`\`\`bash
curl -X PUT http://localhost:5000/api/reviews/<review_id> \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{"rating":4,"comment":"Updated review"}'
\`\`\`

### 🗑️ Delete Review

\`\`\`bash
curl -X DELETE http://localhost:5000/api/reviews/<review_id> \
-H "Authorization: Bearer <your_token>"
\`\`\`

---

## 🏗️ Design Decisions & Assumptions

- **Authentication**: JWT is used for authentication with Bearer tokens.
- **Data Validation**: Basic validation for required fields, but additional validation (like strong passwords) can be added.
- **Pagination**: Implemented via \`page\` and \`limit\` query params.
- **Filtering & Searching**: Filters for \`author\` and \`genre\` on \`/books\`. Search supports partial, case-insensitive matches.
- **Unique Reviews**: Users can only post one review per book.
- **Security**: Passwords are hashed with bcrypt. Tokens are verified via middleware.

---

## 🗄️ Database Schema

### **User**

| Field    | Type   | Description      |
| -------- | ------ | ---------------- |
| username | String | Unique, required |
| password | String | Hashed, required |

### **Book**

| Field       | Type     | Description              |
| ----------- | -------- | ------------------------ |
| title       | String   | Required                 |
| author      | String   | Required                 |
| genre       | String   | Optional                 |
| description | String   | Optional                 |
| createdBy   | ObjectId | Refers to User who added |

### **Review**

| Field     | Type     | Description    |
| --------- | -------- | -------------- |
| book      | ObjectId | Refers to Book |
| user      | ObjectId | Refers to User |
| rating    | Number   | 1-5, required  |
| comment   | String   | Optional       |
| createdAt | Date     | Auto-generated |
| updatedAt | Date     | Auto-updated   |

> **Optional**: An ER diagram can be added if desired.

---

## 📬 Contact

For any issues or contributions, feel free to open an issue or PR.

---

### 🏁 Ready to start?

\`\`\`bash
npm start
\`\`\`
