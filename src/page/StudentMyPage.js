import React, { useEffect, useRef, useState } from "react";
import ProfileImage from "../svg/ProfileImage";
import { mainGray } from "../constants/color";
import "../style/MyPageStyle.css";
import CameraImage from "../svg/CameraImage";
import MyPageMenu from "../components/MyPageMenu";
import CircleCheckImage from "../svg/CircleCheckImage";
import UpdateIcon from "../svg/UpdateIcon";
import { useGetUserClassQuery } from "../hooks/useGetUserClass";
import api from "../utils/api";
import { toast } from "react-toastify";
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const StudentMyPage = ({ user, setUser }) => {
  const menuArray = [
    { key: 0, title: "프로필" },
    { key: 1, title: "결제 내역" },
    { key: 2, title: "내 강의실" },
  ];

  //TODO test
  const testBuyData = [
    { key: 0, date: "2023-10-03", name: "마음이 편해지는 요가", price: 50000 },
    { key: 1, date: "2024-10-03", name: "강해지는 요가", price: 80000 },
  ];

  const testClassData = [
    {
      key: 0,
      title: "마음이 편해지는 요가",
      sub: "마음이 편해져요 스트레스 해소!",
      price: 50000,
    },
    {
      key: 2,
      title: "강해지는 요가",
      sub: "튼튼하고 강해지는 요가에요",
      price: 80000,
    },
  ];
  const [selectMenu, setSelectMenu] = useState({ key: 0, title: "프로필" });
  const [openUpdateInput, setOpenUpdateInput] = useState(false);
  const [nickname, setNickname] = useState(user.nickname);
  const [image, setImage] = useState(user.profileImage);

  const { data, isLoading, isError, error } = useGetUserClassQuery();
  const fileInputRef = useRef(null);
  console.log("openUpdateInput", openUpdateInput);
  const handleNickname = () => {
    setOpenUpdateInput(true);
  };

  //TODO: 닉네임 중복체크, 업데이트
  const updateNicknameServer = async () => {
    try {
      if (nickname.split("").length < 3) {
        return toast.error("닉네임은 3자 이상 입력해주세요");
      }
      const response = await api.put(`/user`, { nickname });
      console.log("response", response);
      if (response.status !== 200) throw new Error(response.error);

      setUser((prev) => ({ ...prev, nickname: response.data.data.nickname }));
      setOpenUpdateInput(false);
      toast.success("닉네임 변경이 완료되었습니다.");
    } catch (error) {
      console.log("err", error);
      toast.error(error.error);
    }
  };
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };
  //TODO : 작업중
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      console.log("formData", formData);
      try {
        const response = await api.put(`/user`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("response", response);
        if (response.status !== 200) throw new Error(response.statusText);
        toast.success("이미지 저장이 완료되었습니다.");
      } catch (error) {
        console.log("error", error);
        toast.error("이미지 저장에 실패했습니다.");
      }
    }
  };
  //TODO: test중 test잘 되면 지울것
  function ProfileImage({ imagePath }) {
    return (
      <img
        src={`${LOCAL_BACKEND}/uploads/${imagePath}`}
        alt="Profile Image"
        style={{ width: "50px", height: "50px" }}
      />
    );
  }

  return (
    <div
      style={{ height: "80vh", maxWidth: "var(--max-width)", margin: "0 auto" }}
    >
      <ProfileImage imagePath="8c75148e6515058f360e0f53afab9281" />;
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
            {menuArray.map((menu, index) => {
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
          {selectMenu.title === "프로필" && (
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
                      onClick={handleCameraClick}
                    >
                      <CameraImage />
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
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
          {selectMenu.title === "결제 내역" && (
            <>
              <div>
                <div className="h3">결제 내역</div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "50px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "var(--color-white)",
                  backgroundColor: "var(--color-gray)",
                  padding: "10px 0",
                }}
              >
                <div className="paymentDate">결제일</div>
                <div className="paymentClassName">강의명</div>
                <div className="paymentPrice">가격</div>
              </div>
              <div style={{ marginTop: "20px" }}>
                {testBuyData.map((data, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--color-gray)",
                      }}
                      key={index}
                    >
                      <div className="paymentDate">{data.date}</div>
                      <div className="paymentClassName">{data.name}</div>
                      <div className="paymentPrice">
                        {data.price.toLocaleString()}원
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {selectMenu.title === "내 강의실" && (
            <>
              <div className="h3">내 강의실</div>

              <div
                style={{
                  display: "flex",
                }}
              >
                {testClassData.map((data, index) => {
                  return (
                    <div key={index}>
                      <div
                        style={{
                          padding: "10px 10px",
                        }}
                      >
                        <img
                          style={{
                            width: "250px",
                            height: "170px",
                            backgroundColor: "gray",
                          }}
                        />
                        <div style={{ marginTop: "5px", fontWeight: "600" }}>
                          {data.title}
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                            color: "var(--color-gray)",
                          }}
                        >
                          {data.sub}
                        </div>
                        <div
                          style={{
                            marginTop: "5px",
                            fontWeight: "600",
                            fontSize: "15px",
                          }}
                        >
                          {data.price.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  );
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
