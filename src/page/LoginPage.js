import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../hooks/useUser";
import userStore from "../store/userStore";
import "../style/LoginStyle.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setUser } = userStore();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    try {
      // if (password.length < 8)
      //   return toast.error("비밀번호는 8자 이상이여야 합니다");
      const response = await loginUser({ email, password });
      if (response.status !== 200) throw new Error(response.error);
      sessionStorage.setItem("token", response.data.token);

      toast.success("로그인을 성공하였습니다!");
      setUser(response.data.user);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.error);
      console.log("error", error);
    }
  };

  const handleKeyDown = (e, nextRef, nameRef) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (!emailRegex.test(email)) {
        setEmailError("유효한 이메일 주소를 입력해주세요.");
        return;
      }
      if (emailRegex.test(email)) {
        setEmailError("");
      }
      // if (nameRef === "loginButton" && password.length === 0) {
      //   setPasswordError("비밀번호는 8자 이상입력해주세요.");
      //   return;
      // }
      // if (password.length > 0 && password.length < 8) {
      //   setPasswordError("비밀번호는 8자 이상입력해주세요.");
      //   return;
      // }
      // if (password.length >= 8) {
      //   setPasswordError("");
      // }
      if (nextRef) {
        nextRef.current.focus();
      } else {
        handleSubmit(e);
      }
    }
  };
  return (
    <div className="container">
      <h1 className="logo flexCenter">
        <Link to="/">
          <img src="../tosome_logo.png" alt="logo" />
        </Link>
      </h1>

      <div className="formContainer">
        <div className="inputGroup">
          <div className="inputLabel h6">이메일 주소</div>
          <input
            type="text"
            placeholder="이메일을 입력해주세요"
            ref={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            value={email}
            onChange={handleEmailChange}
            className="input"
          />
          {emailError && <div className="errorText">{emailError}</div>}
        </div>
        <div className="inputGroup">
          <div className="inputLabel h6">비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            ref={passwordRef}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(e) => handleKeyDown(e, loginButtonRef, "loginButton")}
            className="input"
          />
          {passwordError && <div className="errorText">{passwordError}</div>}
        </div>
        <div className="btnArea full">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            ref={loginButtonRef}
          >
            로그인
          </button>
        </div>
        <div className="footerText flexCenter">
          <div>
            <div>아직 투썸클래스 회원이 아니시라면,</div>
          </div>
          <span className="linkText" onClick={() => navigate("/register")}>
            회원가입
          </span>
          <span>해보세요</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
