import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };
  const demoLogin = async (e) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");

      closeModal();
    }
  };

  return (
    <div id="log-in-modal">
      <h1>Log In</h1>
      <form id="log-in-form" onSubmit={handleSubmit}>
        <label className="label">
          <span>Email</span>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="err-cont" style={{ maxHeight: "20px" }}>
            {errors.email ? (
              <p>{errors.email}</p>
            ) : (
              <p style={{ color: "white" }}>holding </p>
            )}
          </div>
        </label>
        <label className="label">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="err-cont" style={{ maxHeight: "20px" }}>
          {errors.password ? (
            <p>{errors.password}</p>
          ) : (
            <p style={{ color: "white" }}>Holding </p>
          )}
        </div>
        <button id="log-in-submit" type="submit">
          Log In
        </button>
      </form>
      <h5 className="demo-link click" onClick={(e) => demoLogin(e)}>
        Demo User
      </h5>
    </div>
  );
}

export default LoginFormModal;
