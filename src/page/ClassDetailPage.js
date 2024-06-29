import React, { useEffect, useState } from "react";
import Content from "../components/Content";
import Tab from "../components/Tab";
import "../style/ClassDetailPage.style.css";
import ClassList from "../components/ClassList";
import VideoModal from "../components/VideoModal";
import { useGetClassDetailQuery } from "../hooks/useGetClassDetail";
import { useParams, useNavigate } from "react-router-dom"; //추가
import Curriculum from "../components/Curriculum";
import NoData from "../components/NoData";
import { useGetClassQuery } from "../hooks/useGetClass";
import { useGetUserClassQuery } from "../hooks/useGetUserClass";
import { useGetOrderByUserAndClassQuery } from "../hooks/useGetOrderByUserAndClass";

const ClassDetailPage = () => {
  const tabList = [
    {
      name: "클래스소개",
      link: "#classInfo",
    },
    { name: "커리큘럼", link: "#curriculum" },
    { name: "강사소개", link: "#introduceLecturer" },
  ];
  let curriculumList = [
    {
      title: "섹션 0. 자세교정",
      subItems: [
        {
          id: "01",
          title: "발목",
          url: "https://www.youtube.com/embed/JGUywMK1M8M?si=ZOqBmxbHwAIX4wQu",
          time: "02:00",
          isComplete: true,
        },
        {
          id: "02",
          title: "자세교정",
          url: "https://www.youtube.com/embed/MerNVp5QW88?si=F6EbmuUqo-6sXKwu",
          time: "02:20",
          isComplete: true,
        },
        {
          id: "03",
          title: "골반",
          url: "https://www.youtube.com/embed/UDEMOgunQ3s?si=dmp2h7clX-RN1bjQ",
          time: "03:00",
          isComplete: false,
        },
      ],
    },
    {
      title: "섹션 1. 굳어진 몸",
      subItems: [
        {
          id: "11",
          title: "굳은 몸",
          url: "https://www.youtube.com/embed/sLe6jgHoYtk?si=vlIMV3hClb6pfvPJ",
          time: "02:00",
          isComplete: false,
        },
        {
          id: "12",
          title: "손목",
          url: "https://www.youtube.com/embed/vDTxsvMTOhk?si=0s593DKuxvVfg70n",
          time: "02:20",
          isComplete: false,
        },
        {
          id: "13",
          title: "목어깨통증",
          url: "https://www.youtube.com/embed/52buMhrjOqc?si=A2xqkFYWEbUhpGVk",
          time: "03:00",
          isComplete: false,
        },
        {
          id: "14",
          title: "라운드숄더, 어깨소리, 어깨통증, 팔이안올라갈때",
          url: "https://www.youtube.com/embed/x2wFQj5r4Pg?si=nRgg2mH_bKlteaCg",
          time: "03:00",
          isComplete: false,
        },
      ],
    },
    {
      title: "섹션 2. 거북목",
      subItems: [
        {
          id: "21",
          title: "일자목, 거북목 스트레칭, 버섯증후군교정운동",
          url: "https://www.youtube.com/embed/kgCj8UUEWjU?si=yjEIN9y_ta4OH442",
          time: "02:00",
          isComplete: true,
        },
      ],
    },
    {
      title: "섹션 3. 몸매",
      subItems: [
        {
          id: "31",
          title: "앞벅지 없애기/ 앞벅지 없애는 운동",
          url: "https://www.youtube.com/embed/w8GzfyH-jog?si=562D9vF5ensPd8ZI",
          time: "02:00",
          isComplete: false,
        },
        {
          id: "31",
          title: "앞벅지, 종아리알 안커지는❌ 엉덩이 운동하기",
          url: "https://www.youtube.com/embed/961o_u67KtU?si=YgmQqhC-OlKzXzJ4",
          time: "02:20",
          isComplete: false,
        },
      ],
    },
  ];

  const [tabActive, setTabActive] = useState("");

  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetClassDetailQuery({ id });
  const {
    data: orderdata,
    isLoading: orderisLoading,
    isError: orderisError,
    error: orderError,
  } = useGetOrderByUserAndClassQuery({
    // userId: data?.data.userId?._id,
    classId: id,
  });

  const [classDetailList, setClassDetailList] = useState([]);
  const [classListData, setClassListData] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [clickVideoUrl, setClickVideoUrl] = useState("");
  const [clickVideoTitle, setClickVideoTitle] = useState("");
  const classList = useGetClassQuery({
    page,
    name,
    category,
  });
  const [clickVideoId, setClickVideoId] = useState("");

  const handleDataSetting = () => {
    setClassDetailList(data?.data);
    setClassListData(classList?.data?.data);
    setCategory(classDetailList?.category);
  };

  const handleVideoModal = (link, title, id) => {
    document.querySelector("#classVideo").showModal();
    setClickVideoUrl(link);
    setClickVideoTitle(title);
    setClickVideoId(id);
  };

  const userClass = useGetUserClassQuery();

  useEffect(() => {
    handleDataSetting();
  }, [classList]);

  const navigate = useNavigate();

  const handleNavigateToOrder = () => {
    navigate(`/order`, {
      state: {
        classDetail: classDetailList,
      },
    });
  };

  return (
    <>
      <VideoModal
        id="classVideo"
        list={classDetailList?.curriculum}
        clickVideoUrl={clickVideoUrl}
        clickVideoTitle={clickVideoTitle}
        clickVideoId={clickVideoId}
      />
      {/* <VideoModal
        id="classVideo"
        list={curriculumList}
        clickVideoUrl={clickVideoUrl}
        clickVideoTitle={clickVideoTitle}
        clickVideoId={clickVideoId}
      /> */}
      <Content className="classDetail">
        {classDetailList ? (
          <>
            <div className="detailImg">
              <img
                src={classDetailList?.image ? classDetailList?.image[0] : ``}
                alt="대표"
              />
            </div>
            <h2 className="h2">{classDetailList?.name}</h2>
            <div className="detailPrice">
              <div className="left">
                <p className="price">
                  <span>{classDetailList?.price?.toLocaleString()}</span>
                  <span className="unit">원</span>
                </p>
              </div>
              <div className="right">
                {orderdata?.orderExists ? (
                  <button
                    type="button"
                    onClick={() =>
                      handleVideoModal(
                        classDetailList?.curriculum[0].subItems[0].link,
                        classDetailList?.curriculum[0].subItems[0].title,
                        classDetailList?.curriculum[0].subItems[0]._id
                      )
                    }
                  >
                    클래스 수강하기
                  </button>
                ) : (
                  <button type="button" onClick={handleNavigateToOrder}>
                    클래스 결제하기
                  </button>
                )}
              </div>
            </div>
            <div className="noticeBox">{classDetailList?.notice}</div>

            <Tab
              list={tabList}
              setTabActive={setTabActive}
              tabActive={tabActive}
              preventDefault
            />
            <h3 className="hidden" id="classInfo">
              클래스소개
            </h3>
            {/* <div className="infoCheck">
              <div className="subTitle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z" />
                </svg>
                <b>
                  학습대상은
                  <br /> 누구일까요?
                </b>
              </div>
              <div className="checkList">
                <strong className="checkTitle">이런 분들께 추천드려요!</strong>
                <ul>
                  <li>틀어진 체형을 어떻게 고쳐야 할 지 궁금하신 분들.</li>
                  <li>지겨운 다이어트로 새로운 방법을 알고 싶은 분들.</li>
                  <li>어깨 및 허리 근골격 통증으로 일상이 힘드신 분들.</li>
                  <li>전신 부종 및 순환 장애가 있으신 분들.</li>
                  <li>내 몸에 대한 궁금함을 해소하고 더 잘 알고 싶은 분들.</li>
                </ul>
              </div>
            </div> */}
            <p className="classDescription">{classDetailList?.description}</p>

            <h3 className="h3" id="curriculum">
              커리큘럼
            </h3>
            {/* <Curriculum list={classDetailList?.curriculum} /> */}
            {/* <Curriculum
              list={curriculumList}
              handleVideoModal={handleVideoModal}
              isDescription
            /> */}
            <Curriculum
              list={classDetailList?.curriculum}
              handleVideoModal={handleVideoModal}
              isDescription
            />

            <h3 className="h3" id="introduceLecturer">
              강사소개
            </h3>
            <div className="teacherIntroduce">
              <h4 className="h4">
                <b>
                  {/* 안녕하세요, <br /> */}
                  {/* 헬스/PT 분야에서 활동하고 있는 홀길동 강사입니다. */}
                  {classDetailList?.userId?.information}
                </b>
              </h4>
              <div className="profile">
                <div className="img">
                  <img src={classDetailList?.userId?.image} alt="프로필" />
                </div>
                <div className="info">
                  <p className="name">{classDetailList?.userId?.nickname}</p>
                  <p className="description">
                    {classDetailList?.userId?.introduction}
                  </p>
                </div>
              </div>
              <div className="checkList">
                <ul>
                  {classDetailList?.userId?.career.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : (
          <NoData />
        )}

        <div className="checkList"></div>

        <h3 className="h3" id="introduceLecturer">
          비슷한 클래스예요
        </h3>
        <ClassList list={classListData} />
      </Content>
    </>
  );
};

export default ClassDetailPage;
