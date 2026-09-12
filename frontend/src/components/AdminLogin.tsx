import { useState } from "react";
import type { FormEvent } from "react";

type AdminLoginProps = {
  onLogin: () => void;
};

function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (
        email === "admin@dronetv.in" &&
        password === "admin123"
      ) {
        sessionStorage.setItem("adminLoggedIn", "true");
        onLogin();
      } else {
        setError("Invalid email or password.");
      }

      setLoading(false);
    }, 600);
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-overlay"></div>

      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-logo">
          <div className="admin-logo-icon">🚁</div>

          <div>
            <h1>DroneTV</h1>
            <span>AI Support & Lead Assistant</span>
          </div>
        </div>

        {/* Heading */}
        <div className="admin-login-heading">
          <h2>Welcome Back</h2>

          <p>
            Sign in to access the DroneTV admin dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          {/* Email */}
          <div className="login-field">
            <label htmlFor="admin-email">Email Address</label>

            <div className="login-input-wrapper">
              <span className="login-icon">✉️</span>

              <input
                id="admin-email"
                type="email"
                placeholder="admin@dronetv.in"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label htmlFor="admin-password">Password</label>

            <div className="login-input-wrapper">
              <span className="login-icon">🔒</span>

              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="demo-login-info">
          <span>Demo credentials</span>

          <p>
            <strong>Email:</strong> admin@dronetv.in
          </p>

          <p>
            <strong>Password:</strong> admin123
          </p>
        </div>

        {/* Footer */}
        <div className="admin-login-footer">
          <span>🔐 Secure Admin Access</span>
          <span>© DroneTV</span>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;