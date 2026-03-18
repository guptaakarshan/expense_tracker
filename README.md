# 💸 Expense Tracker

**A full-stack personal finance dashboard with AI-powered insights**

## 📌 Overview

Expense Tracker is a full-stack web application that helps you take control of your personal finances. Log income and expenses, visualize spending patterns through interactive charts, and receive AI-generated financial insights powered by **Google Gemini 2.5 Flash** — all behind a secure JWT-authenticated system.

---

## ✨ Features

- **🔐 Authentication** — Secure user registration and login with JWT tokens (7-day expiry) and bcrypt password hashing
- **📊 Dashboard** — At-a-glance summary of income, expenses, and net savings for the last 30 days, with an expense-by-category bar chart and a recent transactions feed
- **💳 Expense Management** — Add, edit, and delete expenses with description, amount, date, and category
- **💰 Income Management** — Track multiple income sources with the same structured fields
- **🤖 AI Insights** — On-demand financial analysis powered by Gemini 2.5 Flash, summarizing your last 90 days of transactions into 5 concise, actionable bullet points
- **📈 Recharts Visualizations** — Responsive bar charts showing spending distribution across categories
- **🔒 Protected Routes** — Frontend and backend both enforce authentication; unauthorized requests are redirected to login automatically

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4, React Router 7 |
| **Charts** | Recharts 3 |
| **HTTP Client** | Axios (with JWT interceptors) |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB via Mongoose 9 |
| **Authentication** | JSON Web Tokens (JWT) + bcryptjs |
| **AI** | Google Gemini 2.5 Flash (`@google/generative-ai`) |
| **Deployment** | Vercel (frontend), any Node host (backend) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A [Google Gemini API key](https://ai.google.dev/)

### 1. Clone the Repository

```bash
git clone https://github.com/guptaakarshan/expense_tracker.git
cd expense_tracker
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:5000`.

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
expense_tracker/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── aiController.js     # Gemini AI insights logic
│   │   ├── dashboardController.js
│   │   ├── expenseController.js
│   │   ├── incomeController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── expenseModel.js
│   │   ├── incomeModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── aiRoute.js
│   │   ├── dashboardRoute.js
│   │   ├── expenseRoute.js
│   │   ├── incomeRoute.js
│   │   └── userRoute.js
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── logo.png
    └── src/
        ├── components/
        │   ├── ExpenseForm.jsx
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   ├── SummaryCard.jsx
        │   └── TransactionList.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Expenses.jsx
        │   ├── Income.jsx
        │   ├── Insights.jsx
        │   ├── Login.jsx
        │   └── Signup.jsx
        ├── services/
        │   ├── api.js           # Axios instance + interceptors
        │   ├── aiService.js
        │   ├── authService.js
        │   ├── dashboardService.js
        │   ├── expenseService.js
        │   └── incomeService.js
        └── App.jsx
```

---

## 📡 API Reference

All protected routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/users/register` | Register a new user | ❌ |
| `POST` | `/api/users/login` | Login and receive a JWT | ❌ |
| `GET` | `/api/users/me` | Get logged-in user details | ✅ |
| `PUT` | `/api/users/update` | Update name and email | ✅ |
| `PUT` | `/api/users/change-password` | Change password | ✅ |

### Expenses

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/expense` | Create a new expense | ✅ |
| `GET` | `/api/expense` | Get all expenses | ✅ |
| `PUT` | `/api/expense/:id` | Update an expense | ✅ |
| `DELETE` | `/api/expense/:id` | Delete an expense | ✅ |

### Income

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/income` | Create a new income entry | ✅ |
| `GET` | `/api/income` | Get all income entries | ✅ |
| `PUT` | `/api/income/:id` | Update an income entry | ✅ |
| `DELETE` | `/api/income/:id` | Delete an income entry | ✅ |

### Dashboard

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/dashboard` | Get 30-day overview (income, expenses, savings rate, recent transactions, expense distribution) | ✅ |

### AI Insights

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/ai/insights` | Generate 5 AI-powered insights from the last 90 days of transactions | ✅ |

---

## 🌐 Deployment

### Frontend — Vercel

The `frontend/vercel.json` is already configured. Simply connect your GitHub repo to Vercel and set the `VITE_API_URL` environment variable to your deployed backend URL.

### Backend

Deploy to any Node.js-compatible host (Railway, Render, Fly.io, etc.). Ensure the following environment variables are set:

```
MONGODB_URI
JWT_SECRET
GEMINI_API_KEY
PORT
```

The CORS policy in `server.js` automatically allows requests from `localhost` and any `*.vercel.app` domain.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and open a pull request.

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/guptaakarshan">Akarshan Gupta</a></sub>
</div>
