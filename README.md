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

The project follows a modern full-stack architecture using React, TypeScript, Node.js, Express.js and MySQL.

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
│   │   │
│   │   ├── routes/
│   │   │   └── enquiryRoutes.js
│   │   │
│   │   ├── db/
│   │   │   └── connection.js
│   │   │
│   │   ├── middleware/
│   │   │   └── adminAuth.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── README.md
