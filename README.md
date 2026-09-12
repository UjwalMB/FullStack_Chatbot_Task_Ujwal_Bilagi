# 🚁 DroneTV AI Support & Lead Assistant

A full-stack web application developed as part of the Full Stack Developer Intern assignment.

The application provides a DroneTV-style business website with a rule-based AI support chatbot, enquiry/lead collection system, REST API, MySQL database, and admin dashboard for managing enquiries.

---

## 📌 Project Overview

DroneTV AI Support & Lead Assistant is designed to help visitors:

- Explore DroneTV services
- View available courses and training
- Get instant answers through a predefined chatbot
- Submit service/course enquiries
- Track enquiry status through an admin dashboard
- Search and filter customer/student enquiries

The project follows a modern full-stack architecture using React, TypeScript, Node.js, Express.js, and MySQL.

---

## ✨ Features

### 🌐 Public Website

- Responsive landing page
- Navigation bar
- Hero section
- Services section
- Courses & training section
- Contact/enquiry section
- Mobile responsive design

### 🤖 Support Chatbot

The chatbot provides predefined responses for:

- Services
- Courses / Training
- Contact information
- Registration
- Service interest
- Student enquiries
- Speaking with a representative

Additional chatbot features:

- User and bot messages
- Conversation history during the session
- Fallback response for unknown questions
- Clear/reset conversation

### 📝 Enquiry System

Visitors can submit:

- Name
- Email
- Phone
- User type
- Service/course interest
- Message

The application performs frontend and backend validation before storing the enquiry.

### 🗄️ REST API

The backend provides CRUD operations:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/enquiries` | Create enquiry |
| GET | `/api/enquiries` | Get all enquiries |
| GET | `/api/enquiries/:id` | Get enquiry by ID |
| PUT | `/api/enquiries/:id` | Update enquiry |
| DELETE | `/api/enquiries/:id` | Delete enquiry |

### 👨‍💼 Admin Dashboard

Admin features include:

- Admin login
- View enquiries
- Search enquiries
- Filter by user type
- View enquiry details
- Change enquiry status
- Delete enquiries
- Refresh enquiry data
- Enquiry statistics

Supported statuses:

- New
- Contacted
- In Progress
- Closed

---

## 🛠️ Technology Stack

### Frontend

- React.js
- TypeScript
- Vite
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- REST API

### Database

- MySQL

### Security & Middleware

- Helmet
- CORS
- Express Rate Limit
- Environment variables
- Backend validation
- Parameterized SQL queries
- Admin API authentication

---

## 📂 Project Structure

```text
FullStack_Chatbot_Task_Ujwal_Bilagi/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── Chatbot.tsx
│   │   │   ├── EnquiryForm.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── AdminDashboard.tsx
│   │   │
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── .gitignore
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── enquiryController.js
│   │   ├── routes/
│   │   │   └── enquiryRoutes.js
│   │   ├── db/
│   │   │   └── connection.js
│   │   ├── middleware/
│   │   │   └── adminAuth.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── screenshots/
│   ├── home.png
│   ├── chatbot.png
│   ├── enquiry.png
│   ├── admin-dashboard.png
│   └── enquiry-details.png
│
├── .gitignore
└── README.md
```

---

# 📸 Screenshots

## 🏠 Home Page

![Home Page](screenshots/home.png)

## 🤖 Chatbot

![Chatbot](screenshots/chatbot.png)

## 📝 Enquiry Form

![Enquiry Form](screenshots/enquiry.png)

## 👨‍💼 Admin Dashboard

![Admin Dashboard](screenshots/admin-dashboard.png)

## 📋 Enquiry Details

![Enquiry Details](screenshots/enquiry-details.png)

---

# 🚀 Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/FullStack_Chatbot_Task_Ujwal_Bilagi.git
cd FullStack_Chatbot_Task_Ujwal_Bilagi
```

---

# 🖥️ Frontend Setup

Open a terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend will normally run at:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

Open another terminal:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory.

Add:

```env
PORT=5001

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dronetv
DB_PORT=3306

ADMIN_API_KEY=your_admin_api_key
```

> Do not commit the `.env` file to GitHub.

A `.env.example` file is included in the repository as a configuration reference.

---

# 🗄️ Database Setup

Make sure MySQL is running.

Open MySQL:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE dronetv;
```

Select the database:

```sql
USE dronetv;
```

Create the enquiries table:

```sql
CREATE TABLE enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    user_type ENUM('Student', 'Customer', 'Other') NOT NULL,
    interest VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('New', 'Contacted', 'In Progress', 'Closed') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

# ▶️ Start Backend

Inside the backend directory:

```bash
npm run dev
```

Or:

```bash
node src/server.js
```

Backend will run at:

```text
http://localhost:5001
```

---

# 🔌 API Documentation

## Create Enquiry

```http
POST /api/enquiries
```

Example request:

```json
{
  "name": "Ujwal",
  "email": "ujwal@example.com",
  "phone": "9876543210",
  "user_type": "Student",
  "interest": "Drone Training",
  "message": "I am interested in drone training."
}
```

---

## Get All Enquiries

```http
GET /api/enquiries
```

Requires admin authentication.

Header:

```text
x-admin-key: YOUR_ADMIN_API_KEY
```

---

## Get Enquiry by ID

```http
GET /api/enquiries/:id
```

---

## Update Enquiry

```http
PUT /api/enquiries/:id
```

Example request:

```json
{
  "status": "Contacted"
}
```

---

## Delete Enquiry

```http
DELETE /api/enquiries/:id
```

---

# 🤖 Chatbot

The chatbot uses predefined rule-based responses rather than an external AI API.

This approach was selected because the assignment requires a predefined chatbot and does not require a real AI model.

The chatbot maintains conversation history during the current session and provides a fallback response when it cannot understand the user's question.

---

# 👨‍💼 Admin Dashboard

The admin dashboard can be accessed from the public website using:

```text
http://localhost:5173/#admin
```

The dashboard provides:

- Total enquiries
- New enquiries
- Contacted enquiries
- In Progress enquiries
- Closed enquiries
- Search
- User type filtering
- Enquiry details
- Status management
- Delete functionality
- Refresh functionality

---

# 🔐 Validation & Error Handling

The application handles:

- Empty required fields
- Invalid email addresses
- Invalid phone numbers
- Invalid user types
- Invalid enquiry IDs
- Database connection errors
- Failed API requests
- Unauthorized admin requests
- Unknown chatbot questions
- Server errors

Generic error messages are returned to users while technical errors are logged on the backend.

---

# 🔒 Security

Security measures implemented include:

- Environment variables for database credentials
- `.env` excluded from Git
- `.env.example` provided for configuration reference
- Helmet security middleware
- CORS configuration
- API rate limiting
- Backend input validation
- Parameterized SQL queries
- Admin API authentication
- Safe generic error responses

> The current admin authentication is implemented for the internship MVP/demo environment. A production application should use a complete authentication system such as JWT or secure session-based authentication.

---

# 🧪 Testing

The following functionality has been tested:

- Frontend loading
- Responsive layout
- Chatbot interaction
- Chatbot fallback
- Chatbot reset
- Enquiry form validation
- Enquiry submission
- MySQL data storage
- Admin login
- Admin enquiry listing
- Search functionality
- User type filtering
- Enquiry details
- Status updates
- Delete functionality
- API authentication
- Database connectivity
- Error handling

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │        User         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + TypeScript  │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                          REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node.js + Express │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                          SQL Queries
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    │      Database       │
                    └─────────────────────┘
```

---

# 📚 Key Learning Outcomes

Through this project, I worked with:

- React component development
- TypeScript
- React hooks and state management
- Form handling and validation
- REST API development
- Express.js
- MySQL database integration
- CRUD operations
- Admin authentication concepts
- API error handling
- Security middleware
- Responsive UI development
- Full-stack project architecture
- Git and GitHub

---

# 🚀 Future Improvements

Possible future improvements include:

- JWT/session-based authentication
- Role-based access control
- Real AI chatbot integration
- Email notifications for enquiries
- Advanced analytics
- Pagination for large enquiry datasets
- Cloud database deployment
- Automated testing
- Production-grade logging

---

# 👨‍💻 Author

**Ujwal Bilagi**

Computer Science Engineering

---

# 📄 Assignment

Developed as part of the **Full Stack Developer Intern technical assignment**.

---

## ⭐ Project Highlights

**Frontend:** React + TypeScript  
**Backend:** Node.js + Express.js  
**Database:** MySQL  
**Chatbot:** Rule-based support assistant  
**API:** RESTful CRUD API  
**Admin:** Enquiry management dashboard  
**Security:** Validation, Helmet, CORS, rate limiting and environment variables