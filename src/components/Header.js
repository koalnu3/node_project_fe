import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [utilOpen, setUtilOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuListActive, setMenuListActive] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const utilActive = () => {
    !utilOpen ? setUtilOpen(true) : setUtilOpen(false);
  };
  const menuActive = () => {
    !menuOpen ? setMenuOpen(true) : setMenuOpen(false);
  };
  const logout = () => {
    sessionStorage.removeItem("token");
    setUser({
      _id: 0,
      nickname: "",
      email: "",
      profileImage: "",
      phoneNumber: "",
      level: "student",
      greetings: "",
    });
    toast.success("로그아웃되었습니다.");
    navigate("/");
  };

  const handleMenuActive = (event, name) => {
    setMenuListActive(name);
  };

  const handleSearch = () => {
    navigate(`/class?name=${searchQuery}&category=`);
    setSearchQuery("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const enterMyPage = () => {
    if (user.level === "customer") {
      navigate("/studentMypage");
      setUtilOpen(false);
    } else if (user.level === "teacher") {
      navigate("/teacherMypage");
      setUtilOpen(false);
    } else if (user.level === "admin") {
      navigate("/admin");
      setUtilOpen(false);
    } else {
      return toast.error("강사 승인 대기중입니다");
    }
  };

  const location = useLocation();
  const { pathname } = location;
  // const splitLocation = pathname.split("/");

  return (
    <header
      className={`header ${
        user.level === "admin" && pathname === "/admin" ? `navHidden` : ``
      }`}
    >
      <div className="inner">
        <div className="top">
          <button
            type="button"
            className="menuBtn"
            onClick={() => menuActive()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>
          <h1 className="logo">
            <Link to="/">
              <img src="../tosome_logo.png" alt="logo" />
            </Link>
          </h1>
          <div className={`util ${utilOpen === true ? `active` : ``}`}>
            {user._id ? (
              <>
                <button
                  type="button"
                  className="utilBtn"
                  onClick={() => utilActive()}
                >
                  <span>
                    <b>{user.nickname}</b> 님
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </button>
                <ul className="utilList">
                  <li>
                    <div onClick={enterMyPage} style={{ cursor: "pointer" }}>
                      마이페이지
                    </div>
                  </li>
                  <li>
                    <div onClick={logout} style={{ cursor: "pointer" }}>
                      로그아웃
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <div
                onClick={() => navigate("/login")}
                className="login"
                style={{ cursor: "pointer" }}
              >
                로그인
              </div>
            )}
          </div>
        </div>
        <div className={`menu ${menuOpen === true ? `active` : ``}`}>
          <div className="menuContent">
            <div className="searchArea">
              <div className="search">
                <input
                  type="search"
                  placeholder="강의명을 입력해주세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button className="searchBtn" onClick={handleSearch}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                </button>
              </div>
            </div>
            <nav className="menuList">
              <ul>
                <li className={pathname === "/" ? `active` : ``}>
                  <Link to="/">홈</Link>
                </li>
                <li className={pathname === "/class" ? `active` : ``}>
                  <Link to="/class">클래스소개</Link>
                </li>
              </ul>
            </nav>
            <button
              type="button"
              className="closeBtn"
              onClick={() => setMenuOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
