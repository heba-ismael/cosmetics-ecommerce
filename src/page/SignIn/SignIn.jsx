import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Context/AuthContext";
import PageTransition from "../../components/PageTransition";
import toast from "react-hot-toast";
import "../auth.css";

function SignIn() {
  const { login, authLoading, authError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Sign In | Cosmatics";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      toast.success("Welcome back!");
      navigate("/");
    }
  };

  return (
    <PageTransition>
      <div className="auth_page">
        <div className="container">
          <form className="auth_form" onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            {/*
              This project uses dummyjson as a demo API and has no real
              account system.
              To try it, use: username: emilys / password: emilyspass
            */}
            <p className="auth_note">
              This is a demo login. Try username <b>emilys</b> and password{" "}
              <b>emilyspass</b>.
            </p>

            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {authError && <p className="auth_error">{authError}</p>}

            <button type="submit" className="btn" disabled={authLoading}>
              {authLoading ? "Signing In..." : "Sign In"}
            </button>

            <p className="auth_switch">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default SignIn;
