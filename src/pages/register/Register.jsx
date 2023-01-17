import { BsImageFill } from "react-icons/bs";
import "./register.scss";

function Register() {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Sky Chat</span>
        <span className="title">Register</span>
        <form>
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <label htmlFor="file">
            <BsImageFill className="avatar" />
            Add an avatar
          </label>
          <input style={{ display: "none" }} type="file" id="file" />
          <button>Sign up</button>
        </form>
        <p>Do you have an account? Login</p>
      </div>
    </div>
  );
}

export default Register;
