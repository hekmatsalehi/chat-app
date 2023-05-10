import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import "./login.scss";

function Login() {

  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target[0].value;
      const password = e.target[1].value;

      try {
        await signInWithEmailAndPassword(auth, email, password)
        navigate("/")
        
      } catch (error) {
          setError(error.message);
      }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Sky Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          {error && <span className="errorMsg">{error}</span>}
          <button>Sign in</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

export default Login;
