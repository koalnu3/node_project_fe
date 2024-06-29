import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "../svg/ProfileImage";
import { mainGray } from "../constants/color";
import "../style/MyPageStyle.css";
import CameraImage from "../svg/CameraImage";
import MyPageMenu from "../components/MyPageMenu";
import CircleCheckImage from "../svg/CircleCheckImage";
import UpdateIcon from "../svg/UpdateIcon";
import api from "../utils/api";
import { toast } from "react-toastify";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import Tab from "../components/Tab";
import MyPageClassComponent from "../components/MyPageClassComponent";
import { useLocation } from "react-router-dom";

const StudentMyPage = ({ user, setUser }) => {
  //TODO test
  const location = useLocation();
  const tabName = location.state?.tabName;

  const testBuyData = [
    {
      key: 0,
      date: "2023-10-03",
      name: "마음이 편해지는 요가123123123123123123",
      price: 50000,
    },
    { key: 1, date: "2024-10-03", name: "강해지는 요가", price: 80000 },
  ];

  const testClassData = [
    {
      key: 0,
      title: "마음이 편해지는 요가123123123123",
      sub: "마음이 편해져요 스트레스 해소!",
      price: 50000,
    },
    {
      key: 2,
      title: "강해지는 요가",
      sub: "튼튼하고 강해지는 요가에요",
      price: 80000,
    },
    {
      key: 3,
      title: "마음이 편해지는 요가123123123123",
      sub: "마음이 편해져요 스트레스 해소!",
      price: 50000,
    },
    {
      key: 4,
      title: "강해지는 요가",
      sub: "튼튼하고 강해지는 요가에요",
      price: 80000,
    },
  ];
  const tabList = [
    {
      name: "프로필",
    },
    { name: "결제 내역" },
    { name: "내 강의실" },
  ];
  const [selectMenu, setSelectMenu] = useState({ name: "프로필" });
  const [openUpdateInput, setOpenUpdateInput] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [image, setImage] = useState(user.image);
  const [tabActive, setTabActive] = useState("");

  const widgetRef = useRef(null);

  const handleNickname = () => {
    setOpenUpdateInput(true);
  };

  const updateNicknameServer = async () => {
    try {
      if (nickname.split("").length < 3) {
        return toast.error("닉네임은 3자 이상 입력해주세요");
      }
      const response = await api.put(`/user`, { nickname });
      if (response.status !== 200) throw new Error(response.error);

      setUser((prev) => ({ ...prev, nickname: response.data.data.nickname }));
      setOpenUpdateInput(false);
      toast.success("닉네임 변경이 완료되었습니다.");
    } catch (error) {
      console.log("err", error);
      toast.error(error.error);
    }
  };

  const uploadImage = (url) => {
    setImage(url);
  };

  const handleUploadImage = async () => {
    try {
      const response = await api.put(`/user`, { image });

      if (response.status !== 200) throw new Error(response.statusText);
      toast.success("이미지 저장이 완료되었습니다.");
    } catch (error) {
      console.log("error", error);
      setImage("");
      toast.error("이미지 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (tabName) {
      setSelectMenu({ name: tabName });
      setTabActive(tabName);
    }
  }, [tabName]);

  useEffect(() => {
    setSelectMenu({ name: tabActive });
  }, [tabActive]);
  return (
    <div
      style={{ height: "80vh", maxWidth: "var(--max-width)", margin: "0 auto" }}
    >
      <div className="menuTab">
        <div
          style={{
            justifyContent: "space-around",
            padding: "10px 0",
            cursor: "pointer",
          }}
        >
          <Tab
            list={tabList}
            setTabActive={setTabActive}
            tabActive={tabActive}
          />
        </div>
      </div>
      <div className="mypageContainer">
        <div className="mypageLeftSide">
          <div
            style={{
              backgroundColor: " var(--background-color)",
              width: "100%",
              height: "100px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>
              <div className="cameraStyle">
                {image ? (
                  <img src={image} className="cameraStyle" />
                ) : (
                  <ProfileImage />
                )}
              </div>
              <div style={{ marginLeft: "20px" }}>
                <div style={{ fontWeight: "bold" }}>{user.nickname}님</div>
                <div
                  style={{
                    marginTop: "8px",
                    color: mainGray,
                  }}
                >
                  {user.email}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            {tabList.map((menu, index) => {
              return (
                <MyPageMenu
                  menu={menu}
                  selectMenu={selectMenu}
                  setSelectMenu={setSelectMenu}
                  key={index}
                />
              );
            })}
          </div>
        </div>
        <div className="mypageRightSide">
          {/* 프로필 */}
          {selectMenu.name === "프로필" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="h3">내 프로필</div>
                {/* TODO 저장기능 필요한가? */}
                {/* <button
                  type="button"
                  className="small"
                  style={{ marginTop: "20px" }}
                >
                  저장
                </button> */}
              </div>
              <ul className="ulStyle">
                <li>닉네임(별명)</li>
                {!openUpdateInput ? (
                  <li>
                    {user.nickname}
                    <div
                      style={{
                        marginLeft: "20px",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      className="svgStyle"
                      onClick={handleNickname}
                    >
                      <div style={{ width: "15px", height: "15px" }}>
                        <UpdateIcon />
                      </div>
                    </div>
                  </li>
                ) : (
                  <li>
                    <input
                      type="text"
                      placeholder={user.nickname}
                      onChange={(e) => setNickname(e.target.value)}
                    />
                    <div
                      style={{
                        marginLeft: "20px",
                        cursor: "pointer",
                      }}
                      className="svgStyle"
                      onClick={updateNicknameServer}
                    >
                      <div style={{ width: "20px", height: "20px" }}>
                        <CircleCheckImage />
                      </div>
                    </div>
                  </li>
                )}
              </ul>
              <ul className="ulStyle">
                <li>프로필 이미지</li>
                <li style={{ position: "relative" }}>
                  <CloudinaryUploadWidget
                    ref={widgetRef}
                    uploadImage={uploadImage}
                    handleUploadImage={handleUploadImage}
                  />

                  <div className="cameraStyle">
                    {image ? (
                      <img src={image} className="cameraStyle" />
                    ) : (
                      <ProfileImage />
                    )}
                  </div>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      left: 33,
                      bottom: 20,
                    }}
                    className="svgStyle"
                  >
                    <div
                      style={{
                        width: "13px",
                        height: "13px",
                        display: "flex",
                        cursor: "pointer",
                      }}
                      onClick={() => widgetRef.current.openWidget()}
                    >
                      <CameraImage />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="ulStyle">
                <li>이메일(로그인 ID)</li>
                <li>{user.email}</li>
              </ul>
              <ul className="ulStyle">
                <li>전화번호</li>
                <li>{user.phoneNumber}</li>
              </ul>
            </>
          )}
          {selectMenu.name === "결제 내역" && (
            <>
              <div>
                <div className="h3">결제 내역</div>
              </div>
              <div className="user-list">
                <div className="user-list-header">
                  <div className="header-date">결제일</div>
                  <div className="header-title">강의명</div>
                  <div className="header-price">가격</div>
                </div>
                <div className="user-list-items">
                  {testBuyData?.map((data, index) => (
                    <div className="user-list-item selected" key={index}>
                      <div className="user-date">{data.date}</div>
                      <div className="user-title">{data.name}</div>
                      <div className="user-price">
                        {data.price.toLocaleString()}원
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {selectMenu.name === "내 강의실" && (
            <>
              <div className="h3">내 강의실</div>

              <div className="myClass">
                {testClassData.map((data, index) => {
                  <MyPageClassComponent
                    data={data}
                    key={index}
                    setStatus={""}
                  />;
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMyPage;
