import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Google from "./google.png";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Şifreler aynı değil");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const google = () => {
    window.open("http://localhost:8800/api/auth/google", "_self");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Blacky</h3>
          <span className="loginDesc">Arkadaşlarınla sosyalles</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Kayıt Ol
            </button>
            <div className="google">
              <img src={Google} className="icon" alt="" />
              <span className="googleDesc" onClick={google}>
                Google ile kayıt ol
              </span>
            </div>
            <Link className="link" to="/login">
              {" "}
              <button className="loginRegisterButton">
                {" "}
                Hesabına giriş yap{" "}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
