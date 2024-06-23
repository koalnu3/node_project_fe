import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../hooks/useUser";

const InputWithIcon = ({
  label,
  id,
  placeholder,
  inputRef,
  onChange,
  onKeyDown,
  eyesOpen,
  setEyesOpen,
  error,
}) => {
  return (
    <div className="inputGroup input-container">
      <div className="inputLabel h6">{label}</div>
      <input
        type={!eyesOpen ? "password" : "text"}
        id={id}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="input input-with-icon"
      />
      <div className="inputIcon" onClick={() => setEyesOpen((prev) => !prev)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path
            d={
              eyesOpen
                ? "M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"
                : "M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z"
            }
          />
        </svg>
      </div>
      {error && <div className="errorText">{error}</div>}
    </div>
  );
};

const CheckSvg = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="gray">
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  );
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phonenumber: "",
    type: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [phonenumberError, setPhonenumberError] = useState("");

  const [passwordEyesOpen, setPasswordEyesOpen] = useState(false);
  const [passwordConfirmEyesOpen, setPasswordConfirmEyesOpen] = useState(false);

  const { email, password, confirmPassword, nickname, phonenumber, type } =
    formData;

  const checkArray = [
    "영문/숫자/특수문자 중, 2가지 이상 포함",
    "8자 이상 32자 이하 입력(공백제외)",
    "연속 3자 이상 동일한 문자/숫자 제외",
  ];

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nicknameRef = useRef(null);
  const phonenumberRef = useRef(null);
  const registerRef = useRef(null);
  const typeCheckRef = useRef(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validatePassword = (password) => {
    const trimmedPassword = password.trim();

    if (trimmedPassword.length < 8 || trimmedPassword.length > 32) {
      return "비밀번호는 8자 이상 32자 이하로 입력해주세요.";
    }

    const hasLetter = /[a-zA-Z]/.test(trimmedPassword);
    const hasNumber = /\d/.test(trimmedPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(trimmedPassword);

    const typesCount = [hasLetter, hasNumber, hasSpecialChar].filter(
      Boolean
    ).length;
    if (typesCount < 2) {
      return "비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.";
    }

    const consecutiveChars = /(.)\1\1/;
    if (consecutiveChars.test(trimmedPassword)) {
      return "비밀번호에 연속으로 3자 이상 동일한 문자/숫자를 사용할 수 없습니다.";
    }

    return null;
  };
  const passwordValidationError = validatePassword(formData.password);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      7
    )}-${phoneNumber.slice(7, 11)}`;
  };
  const isValidPhoneNumber = (value) => {
    const phoneNumberPattern = /^010-\d{4}-\d{4}$/;
    return phoneNumberPattern.test(value);
  };

  const register = async () => {
    if (!isComplete) {
      return;
    } else {
      try {
        const response = await registerUser({
          email,
          password,
          nickname,
          phonenumber,
          type,
        });
        if (response.status !== 200) throw new Error(response.error);
        toast.success("회원가입이 완료되었습니다!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        toast.error(error.error);
        console.log("error", error);
      }
    }
  };
  const isComplete =
    !!email &&
    !!password &&
    !!confirmPassword &&
    !!nickname &&
    !!phonenumber &&
    !!type;

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "phonenumber") {
      const rawValue = event.target.value.replace(/[^\d]/g, "");
      const formattedPhoneNumber = formatPhoneNumber(rawValue);
      setFormData((prevData) => ({
        ...prevData,
        phonenumber: formattedPhoneNumber,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (!emailRegex.test(email)) {
        return setEmailError("유효한 이메일 주소를 입력해주세요.");
      }
      if (emailRegex.test(email)) {
        setEmailError("");
      }
      if (password && passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }
      if (!passwordValidationError) {
        setPasswordError("");
      }
      if (!!confirmPassword && password !== confirmPassword) {
        setConfirmPasswordError("비밀번호가 같지 않습니다.");
        return;
      }
      if (password === confirmPassword) {
        setConfirmPasswordError("");
      }
      if (!!nickname && nickname.length <= 2) {
        setNicknameError("닉네임은 3자 이상 입력해주세요.");
        return;
      }
      if (!!nickname && nickname.length > 2) {
        setNicknameError("");
      }
      if (!!phonenumber && !isValidPhoneNumber(phonenumber)) {
        setPhonenumberError("핸드폰 번호를 다시 입력해주세요");
        return;
      }
      if (!!isValidPhoneNumber(phonenumber)) {
        setPhonenumberError("");
      }
      if (nextRef) {
        nextRef.current.focus();
      }
    }
  };

  return (
    <div className="container">
      <h1 className="logo flexCenter" style={{ marginTop: "-400px" }}>
        <Link to="/">
          <img src="../tosome_logo.png" alt="logo" />
        </Link>
      </h1>

      <div className="formContainer">
        <div className="inputGroup">
          <div className="inputLabel h6">이메일 주소</div>
          <input
            type="text"
            id="email"
            placeholder="이메일을 입력해주세요"
            ref={emailRef}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            value={email}
            onChange={handleChange}
            className="input"
          />

          {emailError && <div className="errorText">{emailError}</div>}
        </div>
        <div className="inputGroup inputContainer">
          <InputWithIcon
            label="비밀번호"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            inputRef={passwordRef}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
            eyesOpen={passwordEyesOpen}
            setEyesOpen={setPasswordEyesOpen}
            error={passwordError}
          />
        </div>
        <div style={{ marginTop: "-15px" }}>
          {checkArray.map((text, index) => {
            return (
              <div className="svgContainer" key={index}>
                <div>
                  <CheckSvg />
                </div>
                <div>{text}</div>
              </div>
            );
          })}
        </div>
        <div className="inputGroup inputContainer">
          <InputWithIcon
            label="비밀번호 확인"
            id="confirmPassword"
            placeholder="비밀번호를 입력해주세요"
            inputRef={confirmPasswordRef}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, nicknameRef)}
            eyesOpen={passwordConfirmEyesOpen}
            setEyesOpen={setPasswordConfirmEyesOpen}
            error={confirmPasswordError}
          />
        </div>
        <div className="inputGroup">
          <div className="inputLabel h6">닉네임</div>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해주세요"
            ref={nicknameRef}
            value={nickname}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, phonenumberRef)}
            className="input"
          />
          {nicknameError && <div className="errorText">{nicknameError}</div>}
        </div>
        <div className="inputGroup">
          <div className="inputLabel h6">연락처</div>
          <input
            type="text"
            id="phonenumber"
            placeholder="핸드폰 번호를 입력해주세요"
            ref={phonenumberRef}
            value={phonenumber}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, typeCheckRef)}
            className="input"
          />
          {phonenumberError && (
            <div className="errorText">{phonenumberError}</div>
          )}
        </div>
        <input
          type="radio"
          id="type"
          name="radioCheck"
          value="teacher"
          onChange={handleChange}
          ref={typeCheckRef}
        />
        <label htmlFor="radio1">강사</label>
        <input
          type="radio"
          id="type"
          name="radioCheck"
          value="customer"
          onChange={handleChange}
        />
        <label htmlFor="radio2">학생</label>
        <div className={"btnArea full"}>
          <button
            type="submit"
            ref={registerRef}
            onClick={register}
            className={`${!isComplete && "gray"}`}
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
