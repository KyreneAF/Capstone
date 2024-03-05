import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkLogin } from "../../redux/session";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let newErrors = {};

    if (password !== confirmPassword) {
      // return setErrors({
      //   confirmPassword:
      //     "Confirm Password field must be the same as the Password field",
      // });
      newErrors.confirmPassword =
        "Confirm Password field must be the same as the Password field";
    }
    if (!password || password.length < 6) {
      // setErrors({
      //   password: "Password must have 6 characters",
      // });
      newErrors.password = "Password must have 6 characters";
    }
    if (!username || username.length < 6) {
      // setErrors({
      //   username: "username must have 6 characters",
      // });
      newErrors.username = "username must have 6 characters";
    }
    if (!email.match(emailRegex)) {
      // return setErrors({
      //   email: "Please provide a valid email address",
      // });
      newErrors.email = "Please provide a valid email address";
    }
    setErrors(newErrors);
    if (!Object.values(newErrors).length) {
      const serverResponse = await dispatch(
        thunkSignup({
          email,
          username,
          password,
        })
      );

      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
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
    <div id="signUp-main-cont">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}


      <form onSubmit={handleSubmit}>
      <div id='su-form-main-cont'>
        <label className="su-form-cont">
          <span>Email</span>
          <input
            maxLength={20}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="err-cont" style={{ maxHeight: "20px" }}>
          {errors.email ? (
            <p>{errors.email}</p>
          ) : (
            <p style={{ color: "white" }}>Holding</p>
          )}
        </div>
        <label className="su-form-cont">
          <span>Username</span>

          <input
            maxLength={20}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="err-cont" style={{ maxHeight: "20px" }}>
          {errors.username ? (
            <p>{errors.username}</p>
          ) : (
            <p style={{ color: "white" }}>Holding</p>
          )}
        </div>

        <label className="su-form-cont">
          <span>Password</span>

          <input
            maxLength={20}
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
            <p style={{ color: "white" }}>Holding</p>
          )}
        </div>

        <label className="su-form-cont">
          <span>Confirm Password</span>
          <input
            maxLength={20}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="err-cont" style={{ maxHeight: "20px" }}>
          {errors.confirmPassword ? (
            <p>{errors.confirmPassword}</p>
          ) : (
            <p style={{ color: "white" }}>Holding</p>
          )}
        </div>
        <button type="submit">Sign Up</button>
        </div>
      </form>
      <h5
        id="so-demo"
        className="demo-link click"
        onClick={(e) => demoLogin(e)}
      >
        Demo User
      </h5>
    </div>
  );
}

export default SignupFormModal;
