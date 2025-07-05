import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import logo from "../assets/images/logo.png";
import TaskLeed from "../assets/images/TaskLeed.png";
import { useAuth } from "./Authcontext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    try {
      await auth.resetPassword(email);
      setMessage("Check your email for password reset instructions");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/user-not-found") {
        setError("No account found with this email address.");
      } else if (error.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to reset password. " + error.message);
      }

      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div className="d-flex align-items-center justify-content-center">
                  <img
                    src={logo}
                    alt="logo"
                    className="img-fluid"
                    style={{ width: "60px", padding: "7px" }}
                  />
                  <img
                    src={TaskLeed}
                    alt="TaskLeed"
                    className="img-fluid"
                    style={{ width: "120px", cursor: "pointer" }}
                  />
                </div>
              </div>

              <h4 className="text-center mb-4"></h4>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="pb-3">
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success w-100 mb-3 mt-3 mx-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="d-flex align-items-center justify-content-center">
                        <Loader2 className="me-2 h-4 w-4 animate-spin" />
                        Sending Reset Link...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
              <div className="text-center mt-2">
                <p className="text-muted">
                  <Link to="/Login" className="text-decoration-none">
                    Back to Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
