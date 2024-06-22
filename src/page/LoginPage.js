import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/LoginStyle.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginButtonRef = useRef(null);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      //TODO: toastmessage?
      emailRef.current.focus();
      return alert("유효한 이메일 주소를 입력해주세요.");
    } else {
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
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
        </div>
        <div className="inputGroup">
          <div className="inputLabel h6">비밀번호</div>
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            ref={passwordRef}
            onKeyDown={(e) => handleKeyDown(e, loginButtonRef)}
            className="input"
          />
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
