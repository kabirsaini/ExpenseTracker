# ExpenseTracker

A full-stack Expense Tracker application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can track both **expenses and credits**, visualize financial data using graphs and pie charts, and securely manage their data with authentication.


## 🚀 Features

1. 🔐 User Authentication (Register/Login with JWT)
2. ➕ Add both **Expenses** and **Credits**
3. 📝 Edit and Delete entries
4. 📅 Filter by Date
5. 📊 Dashboard with:
    Pie Chart (Credit vs Expense)
    Bar Graph (Category-wise distribution)
9. 💾 Data persisted in MongoDB
10. ✅ Responsive and aesthetic UI

## 📁 Folder Structure

``` 

ExpenseTracker/
├── client/                 # React frontend
│   ├── public/
│   └── src/
|       ├── api/
│       ├── components/
│       ├── App.js
│       └── index.js
├── server/
|   ├── middleware/              # Node.js + express backend
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
└── package.json

``` 




## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- Chart.js / Recharts
- React Router
- Toastify
- CSS

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Dotenv


## ⚙️ Installation

### 1. Clone the Repository

``` 
git clone https://github.com/kabirsaini/ExpenseTracker.git
cd ExpenseTracker
``` 


## 2. Backend Setup

``` 
cd server
npm install
touch .env
``` 

## Create a .env file with:

``` 
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
``` 


## Start the backend:
``` 
npm run server or node server.js (according to the script written in package.json)
``` 


## 3. Frontend Setup
``` 
cd client
npm install
npm start
``` 



## 🔐 Authentication
JWT-based token stored in localStorage

Protected routes on the frontend

Middleware for secure APIs

## 📊 Dashboard Preview
✨ Displays your total credits and expenses visually.

Pie Chart: Expense vs Credit

Bar Chart: Distribution across categories

List: All transactions with type, amount, date

## ✅ Application Flow: Expense Tracker

## 1. User Authentication Flow
Login Page (Default Entry Point)

User is prompted to enter their email and password.
If the user already has an account:

Credentials are sent to the backend via /auth/login.

Backend verifies credentials:

If valid, it generates a JWT (JSON Web Token) containing the user's userId.

Token is sent back to the frontend and stored in localStorage.

Authenticated state is set to true, and the user is redirected to the expense dashboard.

If the user doesn't have an account:

They are guided to the registration form (/auth/register).

Upon successful registration:

A message is shown: "Registration successful. Please login."

## 2. JWT Middleware & Route Protection
All /expenses routes on the backend are protected using a custom middleware:

The JWT is sent with every request via Authorization: Bearer <token>.

Middleware verifies the token using the secret key.

If valid, it attaches req.userId = decoded.userId to the request.

This ensures all expenses are tied to the authenticated user and prevents unauthorized access.

## 3. Expense Entry Flow
Expense Form is displayed after login:

Fields:

Type: Credit or Expense

Amount

Category

Description

Date

On form submission:

Data is posted to /expenses endpoint.

The expense is saved in MongoDB with an attached user field (userId from JWT).

The UI updates with the new entry.

## 4. Expense List Display
Below the form, an Expense List Table displays:

All expenses specific to the logged-in user (GET /expenses).

Each entry includes:

Amount, Category, Description, Date, and Type

Delete button to remove the entry

Deleting an entry triggers a DELETE request and re-renders the list and dashboard.

## 5. Dashboard & Insights (Visualization)
Recharts is used to generate live data visualizations:

✅ Category-wise Pie Chart:

Shows distribution of total spend per category.

✅ Monthly Bar Chart:

Groups expenses by month (MM-YYYY) to show monthly totals.

✅ Credit vs Expense Pie Chart:

Compares total credit amount vs total expense amount.

The charts update in real-time as users add or delete records.

## 6. Logout
A Logout button is shown on the top of the dashboard.

Clears the JWT token from localStorage.

Resets the authentication state and redirects the user to the login page.


## SUMMARY

1. User visits the site and lands on the login screen.
2. If user has no account, they register via a secure form.
3. On successful login, a JWT token is issued and stored.
4. Authenticated user accesses their personal dashboard.
5. User can add credit/expense entries using a dynamic form.
6. Entries are stored in MongoDB tied to the userId.
7. User can view, edit, and delete their own entries.
8. Dashboard visualizes data by category, month, and type.
9. Charts update instantly as data changes.
10. Logout clears the session and returns user to login.



