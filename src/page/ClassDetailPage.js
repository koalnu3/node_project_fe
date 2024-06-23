import React, { useState } from "react";
import Content from "../components/Content";
import Tab from "../components/Tab";
import "../style/ClassDetailPage.style.css";
import ClassList from "../components/ClassList";

const ClassDetailPage = () => {
  const tabList = [
    {
      name: "클래스소개",
      link: "#classInfo",
    },
    { name: "커리큘럼", link: "#curriculum" },
    { name: "강사소개", link: "#introduceLecturer" },
  ];
  const curriculumList = [
    {
      title: "섹션 0. 학습준비",
      list: [
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "02:00",
        },
        {
          title: "Array, Set, Map",
          url: "url",
          time: "02:20",
        },
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "03:00",
        },
      ],
    },
    {
      title: "섹션 1. 학습준비",
      list: [
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "02:00",
        },
        {
          title: "Array, Set, Map",
          url: "url",
          time: "02:20",
        },
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "03:00",
        },
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "03:00",
        },
      ],
    },
    {
      title: "섹션 2. 학습준비",
      list: [
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "02:00",
        },
      ],
    },
    {
      title: "섹션 3. 학습준비",
      list: [
        {
          title:
            "Array, Set, Map을 통해 알아보는 이터러블/이터레이터 프로토콜",
          url: "url",
          time: "02:00",
        },
        {
          title: "Array, Set, Map",
          url: "url",
          time: "02:20",
        },
      ],
    },
  ];

  const classList = [
    {
      isDeleted: false,
      _id: "66769ddeee3ad00fec191a27",
      id: "class001",
      name: "Introduction to Programming",
      description: "Learn the basics of programming using Python.",
      image: [
        "http://example.com/images/class001/1.jpg",
        "http://example.com/images/class001/2.jpg",
      ],
      curriculum: [
        "Introduction",
        "Variables and Data Types",
        "Control Structures",
        "Functions",
        "Modules",
      ],
      price: 10000,
      notice: "Class starts on July 1st. Please join the introductory session.",
      category: "개발",
      userId: "66758d61f8b97787aa6e83fc",
      status: "",
    },
    {
      isDeleted: false,
      _id: "66769ddeee3ad00fec191a28",
      id: "class002",
      name: "Advanced JavaScript",
      description: "Deep dive into JavaScript and learn advanced concepts.",
      image: [
        "http://example.com/images/class002/1.jpg",
        "http://example.com/images/class002/2.jpg",
      ],
      curriculum: [
        "Scope and Closures",
        "Asynchronous JavaScript",
        "JavaScript Patterns",
        "Web APIs",
      ],
      price: 15000,
      notice:
        "Class starts on August 1st. Prepare by reviewing JavaScript basics.",
      category: "개발",
      userId: "66758d61f8b97787aa6e83fc",
      status: "",
    },
    {
      isDeleted: false,
      _id: "66769ddeee3ad00fec191a29",
      id: "class003",
      name: "Data Structures and Algorithms",
      description:
        "Master data structures and algorithms for coding interviews.",
      image: [
        "http://example.com/images/class003/1.jpg",
        "http://example.com/images/class003/2.jpg",
      ],
      curriculum: [
        "Arrays",
        "Linked Lists",
        "Stacks and Queues",
        "Trees and Graphs",
        "Sorting and Searching",
      ],
      price: 30000,
      notice:
        "Class starts on September 1st. Make sure to complete the prerequisite readings.",
      category: "개발",
      userId: "66758d61f8b97787aa6e83fc",
      status: "",
    },
    {
      isDeleted: false,
      _id: "66769ddeee3ad00fec191a2a",
      id: "class004",
      name: "해부학적 웨이트 트레이닝",
      description:
        "아무도 알려주지 않았던 해부학적 & 과학적 웨이트 트레이닝 클래스입니다.",
      image: [
        "http://example.com/images/class003/1.jpg",
        "http://example.com/images/class003/2.jpg",
      ],
      curriculum: [
        "해부학에 근거한 디테일한 웨이트 트레이닝",
        "대표적인 불균형 케이스 & 솔루션 운동",
        "운동 생리학에 근거한 트레이닝 방법론",
        "영양 섭취 전략 세우기",
      ],
      price: 20000,
      notice: "공지사항내용",
      category: "피트니스",
      userId: "66758d61f8b97787aa6e83fc",
      status: "",
    },
    {
      _id: "6676c6d1f6dbee872e0e635d",
      id: "class005",
      name: "헬스의 정석:빠르게 3대 1500",
      description: "근육을 만들고 싶은자 나에게 와라 ",
      image: [
        "http://example.com/images/class003/1.jpg",
        "http://example.com/images/class003/2.jpg",
      ],
      curriculum: ["벤치프레스", "스쿼트", "데드리프트"],
      price: 5000,
      notice:
        "Class starts on August 1st. Prepare by reviewing JavaScript basics.",
      category: "피트니스",
      status: "request",
      isDeleted: true,
      createdAt: "2024-06-22T12:42:57.692Z",
      updatedAt: "2024-06-22T12:48:35.859Z",
    },
  ];
  const [tabActive, setTabActive] = useState("");
  const [toggleActive, setToggleActive] = useState("");
  const handleToggle = (event, idx) => {
    console.log(idx);
    if (toggleActive === idx) {
      setToggleActive("");
    } else {
      setToggleActive(idx);
    }
  };

  return (
    <Content className="classDetail">
      <div className="detailImg"></div>
      <h2 className="h2">
        [SNPE] 틀어진 자신의 몸을 스스로 보정하고 제대로 다루는 방법!
        #셀프체형교정
      </h2>
      <div className="detailPrice">
        <div className="left">
          <p className="price">
            <span>66,000</span>
            <span className="unit">원</span>
          </p>
        </div>
        <div className="right">
          <button type="button">클래스 결제하기</button>
        </div>
      </div>
      <div className="noticeBox">
        준비물은 후드 없는 상의, 편한 운동복만 착용하시면 됩니다.
      </div>

      <Tab
        list={tabList}
        setTabActive={setTabActive}
        tabActive={tabActive}
        preventDefault
      />
      <h3 className="hidden" id="classInfo">
        클래스소개
      </h3>
      <div className="infoCheck">
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
      </div>

      <p className="classDescription">
        틀어진 체형을 스스로 교정하여 통증을 회복하고 본연의 자세를 되찾는 운동.
        모든 운동은 장단점이 있지만 더 중요한 것은 ‘우선순위’입니다. 틀어진
        체형으로 계속 근육만 키운다면 과연 긍적적일까요~? 이제
        거북목/일자목/어깨통증/라운드숄더/허리통증/휜다리/고관절통증/다리부종
        등은 거의 대부분 사람들이 만성으로 지니는 유행처럼 되었어요. 하지만 이를
        방치한다면 5년, 10년 뒤엔 분명 지금보다 더욱 낮아지는 삶의 질은 확실할
        거예요. **저는 SNPE 바른자세 척추운동 1급 인증강사이며, 현재 강남
        중앙연수원과 서울 내 센터에서 강의 중입니다. 과거 수트 디자이너 시절
        피팅을 보면서 수많은 사람들의 체형을 관찰하며 해부학적 지식을 쌓고 더
        나아가 근본적으로 몸의 외형을 바로잡는 체형 교정 전문강사가 되었기에
        몸을 대하는 올바른 관점을 알려드립니다. **저의 궁극적인 수업 목표는
        첫째, 회원님 스스로의 몸에 대해 알기. 둘째, 나에게 맞는 운동처방을
        스스로 내리는 것. 셋째, 따라서 혼자 스스로 홈트가 가능하도록 운동을
        익히기까지, 입니다 ! **운동의 가장 큰 조건은 ‘이해’ 입니다. 왜 이 운동을
        해야 하는지, 해부학적 지식 베이스의 이론 내용은 매 회 필수로 무료 제공
        됩니다. 단순히 몇번의 동작만으로 끝나는 수업이 아닌, 몸을 이해하는
        수업이 됩니다. **목/어깨/등/허리/골반/엉덩이/다리/발바닥까지 특별히
        고민인 지점에 대해 수업 전 충분한 상담이 진행되며, 1:1 개개인에게 맞춘
        특별 솔루션을 제공해드립니다. **치아교정의 원리로 체형 교정 도구들이
        필요한데, 모든 도구는 제가 준비해드립니다! **6회 수업만으로도 전신을
        다룰 수 있게 되어요.
      </p>

      <h3 className="h3" id="curriculum">
        커리큘럼
      </h3>
      <div className="toggleList">
        <ul className="toggle">
          {curriculumList?.map((item, idx) => (
            <li
              key={idx + `toggle`}
              className={idx + `toggle` === toggleActive ? `active` : ``}
            >
              <button
                type="button"
                className="title"
                onClick={(event) => handleToggle(event, idx + `toggle`)}
              >
                {item.title}
              </button>
              <div className="description">
                <ul className="list">
                  {item?.list.map((subItem, idx) => (
                    <li key={idx}>
                      <p>{subItem.title}</p>
                      <span>
                        <span className="time">{subItem.time}</span>
                        <button type="button" className="videoBtn">
                          영상보기
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <h3 className="h3" id="introduceLecturer">
        강사소개
      </h3>
      <div className="teacherIntroduce">
        <h4 className="h4">
          <b>
            안녕하세요, <br />
            헬스/PT 분야에서 활동하고 있는 홀길동 강사입니다.
          </b>
        </h4>
        <div className="profile">
          <div className="img">
            <img src="" alt="프로필" />
          </div>
          <div className="info">
            <p className="name">홍길동</p>
            <p className="description">마이벨런스</p>
          </div>
        </div>
        <div className="checkList">
          <ul>
            <li>틀어진 체형을 어떻게 고쳐야 할 지 궁금하신 분들.</li>
            <li>지겨운 다이어트로 새로운 방법을 알고 싶은 분들.</li>
            <li>어깨 및 허리 근골격 통증으로 일상이 힘드신 분들.</li>
            <li>전신 부종 및 순환 장애가 있으신 분들.</li>
            <li>내 몸에 대한 궁금함을 해소하고 더 잘 알고 싶은 분들.</li>
          </ul>
        </div>
      </div>

      <div className="checkList"></div>

      <h3 className="h3" id="introduceLecturer">
        비슷한 클래스예요
      </h3>
      <ClassList list={classList} />
    </Content>
  );
};

export default ClassDetailPage;
