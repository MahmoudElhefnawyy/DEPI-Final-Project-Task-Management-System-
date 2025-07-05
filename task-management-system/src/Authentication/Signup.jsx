import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import logo from "../assets/images/logo.png";
import TaskLeed from "../assets/images/TaskLeed.png";
import { useAuth } from "./Authcontext";
import Swal from "sweetalert2";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords you entered do not match.",
        confirmButtonColor: "#dc3545",
      });
      return;
    }

    if (!acceptTerms) {
      Swal.fire({
        icon: "warning",
        title: "Terms Not Accepted",
        text: "You must accept the terms and conditions to continue.",
        confirmButtonColor: "#ffc107",
      });
      return;
    }

    setIsLoading(true);

    try {
      await auth.signup(email, password, name);

      await Swal.fire({
        title: "Account Created!",
        text: "Your account has been successfully created.",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      navigate("/workSpace");
    } catch (error) {
      setIsLoading(false);
      console.error("Signup error:", error);

      let errorMessage = "An error occurred during sign up. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "Please choose a stronger password (at least 6 characters).";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      }

      await Swal.fire({
        icon: "error",
        title: "Sign Up Failed",
        text: errorMessage,
        confirmButtonColor: "#dc3545",
        showClass: {
          popup: "animate__animated animate__headShake",
        },
      });
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

              <form onSubmit={handleSubmit} className="pb-3">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
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
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      required
                    />
                    <label className="form-check-label" htmlFor="terms">
                      I accept the{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0 m-1 text-primary bg-light"
                        onClick={(e) => e.preventDefault()}
                      >
                        terms and conditions
                      </button>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-success w-100 mb-2 mx-auto"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="d-flex align-items-center justify-content-center">
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-decoration-none">
                    Sign In
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
