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
import ReplyImage from "../svg/ReplyImage";
import MyPageClassComponent from "../components/MyPageClassComponent";
import MyClassModal from "../components/MyClassModal";
import { useGetMyClass } from "../hooks/useGetMyClass";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import useCategoryStore from "../store/useCategoryStore";
import { useGetCategoryQuery } from "../hooks/useGetCategory";

const TeacherMyPage = ({ user, setUser }) => {
  const { categoryStore, setCategoryStore } = useCategoryStore();
  const categoryData = useGetCategoryQuery();

  const tabList = [
    {
      name: "프로필",
    },
    { name: "클래스 관리" },
  ];
  const [selectMenu, setSelectMenu] = useState({ name: "프로필" });
  const [openUpdateInput, setOpenUpdateInput] = useState(false);
  const [openUpdateCareer, setOpenUpdateCareer] = useState(false);
  const [openClassDetail, setOpenClassDetail] = useState(false);

  const [nickname, setNickname] = useState(user.nickname);
  const [image, setImage] = useState(user.image);
  const [career, setCareer] = useState(user.career.join("\n"));
  const [status, setStatus] = useState("");
  const [tabActive, setTabActive] = useState("");
  const [clickId, setClickId] = useState("");
  const widgetRef = useRef(null);
  const textareaRef = useRef(null);

  const { data, isLoading, error } = useGetMyClass();

  const [myClassData, setMyClassData] = useState(data || []);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
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
      toast.error("이미지 저장에 실패했습니다.");
    }
  };

  const openCareer = () => {
    setOpenUpdateCareer(true);
    handleResizeHeight();
  };

  const handleChange = (event) => {
    setCareer(event.target.value);
  };

  const updateCareerServer = async () => {
    try {
      const careerArray = career.split("\n");
      const response = await api.put(`/user`, { career: careerArray });
      if (response.status !== 200) throw new Error(response.error);

      setUser((prev) => ({ ...prev, career: response.data.data.career }));
      setCareer(careerArray);
      setOpenUpdateCareer(false);
      toast.success("이력 수정이 완료되었습니다.");
    } catch (error) {
      console.log("err", error);
      toast.error(error.error);
    }
  };

  const newClassOpen = () => {
    setStatus("new");
    setClickId("0");
    setOpenClassDetail(true);
  };

  useEffect(() => {
    setSelectMenu({ name: tabActive });
  }, [tabActive]);

  useEffect(() => {
    handleResizeHeight();
  }, [career]);

  useEffect(() => {
    if (data) {
      setMyClassData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (categoryData) {
      setCategoryStore(categoryData?.data?.data);
    }
  }, [categoryData.data]);

  if (isLoading) {
    return (
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading noBg noFixed />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NoData icon />
      </div>
    );
  }
  return (
    <div style={{ maxWidth: "var(--max-width)", margin: "0 auto" }}>
      {openClassDetail && (
        <MyClassModal
          id={clickId}
          status={status}
          onClose={() => setOpenClassDetail(false)}
          myClassData={myClassData}
          setMyClassData={setMyClassData}
          categoryStore={categoryStore}
        />
      )}
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
                    <div
                      style={{
                        marginLeft: "10px",
                        padding: "3px",
                        cursor: "pointer",
                      }}
                      className="svgStyle"
                      onClick={() => setOpenUpdateInput(false)}
                    >
                      <div style={{ width: "15px", height: "15px" }}>
                        <ReplyImage />
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
              <ul className="ulStyle">
                <li>이력</li>
                <textarea
                  ref={textareaRef}
                  value={career}
                  onChange={handleChange}
                  style={{
                    width: "400px",
                    height: "100%",

                    padding: "10px",
                    whiteSpace: "pre-wrap",
                    display: "block",
                    overflowY: "hidden",
                    boxSizing: "border-box",
                  }}
                >
                  {user.career.map((data, index) => {
                    return <div key={index}>{data}</div>;
                  })}
                </textarea>

                <div style={{ marginLeft: "20px" }}>
                  {!openUpdateCareer ? (
                    <div
                      style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                      className="svgStyle"
                      onClick={openCareer}
                    >
                      <div style={{ width: "15px", height: "15px" }}>
                        <UpdateIcon />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{
                          cursor: "pointer",
                          width: "25px",
                          height: "25px",
                        }}
                        className="svgStyle"
                        onClick={updateCareerServer}
                      >
                        <CircleCheckImage />
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          width: "25px",
                          height: "25px",
                          cursor: "pointer",
                        }}
                        className="svgStyle"
                        onClick={() => setOpenUpdateCareer(false)}
                      >
                        <div style={{ width: "15px", height: "15px" }}>
                          <ReplyImage />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ul>
            </>
          )}
          {selectMenu.name === "클래스 관리" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="h3">클래스 관리</div>
                <button
                  type="button"
                  className="small"
                  style={{ marginTop: "20px", marginRight: "50px" }}
                  onClick={newClassOpen}
                >
                  신규 클래스 등록
                </button>
              </div>
              <div className="myClass">
                {myClassData.map((myClass, index) => {
                  return (
                    <MyPageClassComponent
                      key={index}
                      data={myClass}
                      type={"teacher"}
                      setOpenClassDetail={setOpenClassDetail}
                      setStatus={setStatus}
                      setClickId={setClickId}
                    />
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

export default TeacherMyPage;
