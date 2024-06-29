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
import { useGetUserClassQuery } from "../hooks/useGetUserClass";
import { useNavigate } from "react-router-dom";

const StudentMyPage = ({ user, setUser }) => {
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
  const navigate = useNavigate();
  const widgetRef = useRef(null);

  const userClass = useGetUserClassQuery();
  const userClassData = userClass?.data?.orderList;

  const setClickId = (id) => {
    navigate(`/class/${id}`);
  };
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

  const handleUploadImage = async (url) => {
    try {
      const response = await api.put(`/user`, { image: url });

      if (response.status !== 200) throw new Error(response.statusText);
      toast.success("이미지 저장이 완료되었습니다.");
    } catch (error) {
      console.log("error", error);
      setImage("");
      toast.error("이미지 저장에 실패했습니다.");
    }
  };

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
                  {userClassData?.map((data, index) => (
                    <div className="user-list-item selected" key={index}>
                      <div className="user-date">
                        {data.createdAt.slice(0, 10)}
                      </div>
                      <div className="user-title">{data.classId.name}</div>
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
                {userClassData?.map((data, index) => (
                  <MyPageClassComponent
                    key={index}
                    type={"customer"}
                    data={data}
                    setClickId={setClickId}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMyPage;
