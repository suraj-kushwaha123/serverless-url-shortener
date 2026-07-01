import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <h1>TCS URL Shortener</h1>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <br /><br />

      <Link to="/ForgotPassword">
        <button>Forgot Password</button>
      </Link>

      <br /><br />

      <Link to="/register">
        <button>Register</button>
      </Link>

    </div>
  );
}