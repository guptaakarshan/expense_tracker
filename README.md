# Expense Tracker

A full-stack MERN application that allows users to track their income and expenses. It provides a dashboard to visualize financial data and offers AI-powered insights.

## Features

- **User Authentication**: Secure user registration and login.
- **Income & Expense Tracking**: Add, view, and delete income and expense records.
- **Financial Dashboard**: An intuitive dashboard that summarizes total income, total expenses, and the current balance.
- **Data Visualization**: Interactive charts to visualize financial data, helping users understand their spending habits.
- **AI-Powered Insights**: A chat interface to get AI-powered financial advice and insights based on your data.
- **Responsive Design**: A clean and responsive user interface built with Tailwind CSS.

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web development.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Recharts**: A composable charting library built on React components.
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.

### Backend

- **Node.js**: A JavaScript runtime for the server-side.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **JSON Web Tokens (JWT)**: For secure user authentication.
- **bcryptjs**: For hashing passwords.
- **Google Generative AI**: For the AI-powered insights feature.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm
- MongoDB (local or a cloud-based instance like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    cd expense-tracker
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables:
    ```
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    GEMINI_API_KEY=<your_google_gemini_api_key>
    ```
    Start the backend server:
    ```bash
    npm start
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

## API Endpoints

The backend exposes the following RESTful API endpoints:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Log in an existing user.
- `GET /api/users/me`: Get the profile of the currently logged-in user.
- `POST /api/income`: Add a new income record.
- `GET /api/income`: Get all income records for the logged-in user.
- `DELETE /api/income/:id`: Delete an income record.
- `POST /api/expense`: Add a new expense record.
- `GET /api/expense`: Get all expense records for the logged-in user.
- `DELETE /api/expense/:id`: Delete an expense record.
- `GET /api/dashboard/summary`: Get a summary of income, expenses, and balance.
- `GET /api/dashboard/charts`: Get data for the financial charts.
- `GET /api/ai/insights`: Interact with the AI for financial insights.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a pull request.

## License

This project is licensed under the MIT License.
