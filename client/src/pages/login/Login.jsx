import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Google from "./google.png";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const { user, isFetching,error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall(
          { email: email.current.value, password: password.current.value },
          dispatch
            );
        console.log(email.current.value)
        };
    const google = () => {
        window.open("http://localhost:8800/api/auth/google", "_self");
    };
    console.log(user)
    console.log(error)
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Blacky</h3>
                    <span className="loginDesc">Arkadaşlarınla sosyalles</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password} />
                        <button className="loginButton" type="submit">
                            {isFetching ? "loading" : "Giriş Yap"}
                        </button>
                        <span className="loginForgot">Şifreni mi unuttun ?</span>
                        <div className="google">
                            <img src={Google} className="icon" alt="" />
                            <span className="googleDesc" onClick={google}>Google ile giriş Yap</span>    
                        </div>
                        <Link className="link" to="/register"><button className="loginRegisterButton">
                            Yeni Hesap Oluştur
                        </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
