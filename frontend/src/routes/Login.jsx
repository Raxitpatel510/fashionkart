import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { isAdminActions } from "../store";
axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setLogin } = useOutletContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_COMMON_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
      const { userType } = result.data;
      if (!userType) {
        setError(result.data?.message || "Invalid email or password.");
        return;
      }
      if (userType === "admin") dispatch(isAdminActions.setAdminState(true));
      else dispatch(isAdminActions.setAdminState(false));
      setLogin(true);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
      console.log("login error", err);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card card">
        <div className="auth-card-brand">
          <span className="store-page-kicker">FASHION KART</span>
        </div>
        <div className="auth-card-body">
          <span className="auth-form-kicker">CUSTOMER LOGIN</span>
          <h2 className="auth-form-title">Login to your account</h2>
          <p className="auth-form-subtitle">Access your bag, wishlist, and profile.</p>
          <h3 className="card-title mb-3 text-center">Login</h3>
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary auth-submit-button">
                Login
              </button>
            </div>
          </form>
          <p className="auth-switch-text">
            New customer? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
