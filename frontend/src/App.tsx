import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Courses from "./components/Courses";
import Chatbot from "./components/Chatbot";
import EnquiryForm from "./components/EnquiryForm";

import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

import "./App.css";

function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    sessionStorage.getItem("adminLoggedIn") === "true"
  );

  const [isAdminPage, setIsAdminPage] = useState(
    window.location.hash === "#admin"
  );

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  const handleLogin = () => {
    sessionStorage.setItem("adminLoggedIn", "true");

    setAdminLoggedIn(true);
  };

  // ==========================================
  // ADMIN LOGOUT
  // ==========================================

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");

    setAdminLoggedIn(false);

    // Go back to public website
    window.location.hash = "";

    setIsAdminPage(false);
  };

  // ==========================================
  // OPEN ADMIN PAGE
  // ==========================================

  const openAdmin = () => {
    window.location.hash = "admin";

    setIsAdminPage(true);
  };

  // ==========================================
  // PUBLIC WEBSITE
  // ==========================================

  if (!isAdminPage) {
    return (
      <>
        <Navbar />

        <main>
          <Hero />

          <Services />

          <Courses />

          <Chatbot />

          <EnquiryForm />
        </main>

        {/* Small admin access button */}
        <button
          className="admin-access-button"
          onClick={openAdmin}
          title="Admin Login"
        >
          🔐 Admin
        </button>
      </>
    );
  }

  // ==========================================
  // ADMIN AREA
  // ==========================================

  if (isAdminPage && !adminLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // ==========================================
  // ADMIN DASHBOARD
  // ==========================================

  return <AdminDashboard onLogout={handleLogout} />;
}

export default App;