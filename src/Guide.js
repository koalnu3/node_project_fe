import React, { useState } from "react";
import Content from "./components/Content";
import Tab from "./components/Tab";
import RoundTab from "./components/RoundTab";
import NoData from "./components/NoData";
import Loading from "./components/Loading";
import Modal from "./components/Modal";

const Guide = () => {
  const tabList = [
    {
      name: "클래스소개",
      link: "#",
    },
    { name: "커리큘럼", link: "#" },
    { name: "강사소개", link: "#" },
  ];
  const tabList2 = [
    {
      name: "클래스소개",
    },
    { name: "커리큘럼" },
    { name: "강사소개" },
  ];
  const roundTabList = [
    {
      name: "헬스",
      link: "#",
    },
    { name: "필라테스", link: "#" },
    { name: "요가", link: "#" },
    { name: "암벽등반", link: "#" },
    { name: "테니스", link: "#" },
    { name: "스쿼시", link: "#" },
    { name: "배구", link: "#" },
  ];

  const roundTabList2 = [
    {
      name: "헬스",
    },
    { name: "필라테스" },
    { name: "요가" },
    { name: "암벽등반" },
    { name: "테니스" },
    { name: "스쿼시" },
    { name: "배구" },
  ];
  const [tabActive, setTabActive] = useState("");
  const [tabActive2, setTabActive2] = useState("");
  const [roundTabActive, setRoundTabActive] = useState("");
  const [roundTabActive2, setRoundTabActive2] = useState("");

  const handleModal = (id) => {
    document.querySelector(`#${id}`).showModal();
  };

  return (
    <Content>
      <h2 className="guideTitle">Color</h2>
      <p className="subText">css 컬러 기본 변수명</p>
      <ul className="colorList">
        <li>--color-primary</li>
        <li>--color-gray</li>
        <li>--color-black</li>
        <li>--color-white</li>
        <li>--color-light-gray</li>
      </ul>
      <hr />

      <h2 className="guideTitle">Title</h2>
      <p className="subText">className : h2,h3,h4,h5,h6</p>
      <h2 className="h2">h2 제목</h2>
      <h2 className="h3">h3 제목</h2>
      <h2 className="h4">h4 제목</h2>
      <h2 className="h5">h5 제목</h2>
      <h2 className="h6">h6 제목</h2>
      <hr />

      <h2 className="guideTitle">Button</h2>
      <h3 className="h6">버튼 사이즈</h3>
      <p className="subText">className : small, large</p>
      <button type="button" className="small">
        small
      </button>
      <button type="button">기본</button>
      <button type="button" className="large">
        large
      </button>
      <h3 className="h6">버튼 컬러</h3>
      <p className="subText">className : white, gray</p>
      <button type="button">기본</button>
      <button type="button" className="white">
        white
      </button>
      <button type="button" className="gray">
        gray
      </button>
      <h3 className="h6">버튼 아이콘</h3>
      <p className="subText">className : iconMore, topBtn</p>
      <button type="button" className="white">
        <span className="iconMore">
          iconMore : button안에 span태그를 추가하고 거기에 클래스기입
        </span>
      </button>
      <button type="button" className="topBtn">
        <span>topBtn</span>
      </button>
      <h3 className="h6">버튼 그룹</h3>
      <p className="subText">className : btnArea, btnArea + pull</p>
      <div className="btnArea">
        <button type="button">버튼</button>
        <button type="button" className="white">
          버튼
        </button>
        <button type="button" className="gray">
          버튼
        </button>
      </div>
      <div className="btnArea full">
        <button type="button">버튼</button>
        <button type="button" className="gray">
          버튼
        </button>
      </div>
      <hr />

      <h2 className="guideTitle">Input</h2>
      <h3 className="h6">input text, search</h3>
      <p className="subText">기본 스타일 클래스 없음</p>
      <input type="text" placeholder="이름을 기입하세요" />
      <input type="search" />
      <h3 className="h6">input radio</h3>
      <p className="subText">기본 스타일 클래스 없음</p>
      <div>
        <input type="radio" id="radio1" name="radioCheck" value="radio1" />
        <label htmlFor="radio1">radio 1</label>
        <input type="radio" id="radio2" name="radioCheck" value="radio2" />
        <label htmlFor="radio2">radio 2</label>
        <input type="radio" id="radio3" name="radioCheck" value="radio3" />
        <label htmlFor="radio3">radio 3</label>
      </div>
      <h3 className="h6">검색창</h3>
      <div className="searchInput">
        <input type="search" placeholder="강의/강사명을 입력해주세요." />
        <button className="searchBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>
      </div>
      <hr />

      <h2 className="guideTitle">Textarea</h2>
      <p className="subText">기본 스타일 클래스 없음</p>
      <textarea placeholder="내용을 기입해주세요!"></textarea>
      <hr />

      <h2 className="guideTitle">Tab(components)</h2>
      <h3 className="h6">Tab</h3>
      <p className="subText">
        기본 속성 : list(탭 리스트 데이터), setTabActive(탭 액티브 state
        setting), tabActive(탭 액티브 state), <br />
        tagType(디폴트값 "a", tagType="button"을 쓰면 버튼 태그로 변경됨),
        preventDefault(필요 없을 시 기입)
      </p>
      <Tab list={tabList} setTabActive={setTabActive} tabActive={tabActive} />
      <Tab
        list={tabList2}
        setTabActive={setTabActive2}
        tabActive={tabActive2}
        tagType="button"
      />
      <h3 className="h6">RoundTab</h3>
      <p className="subText">
        기본 속성 : list(탭 리스트 데이터), setRoundTabActive(탭 액티브 state
        setting), roundTabActive(탭 액티브 state), <br />
        tagType(디폴트값 "a", tagType="button"을 쓰면 버튼 태그로 변경됨),
        preventDefault(필요 없을 시 기입)
      </p>
      <RoundTab
        list={roundTabList2}
        setRoundTabActive={setRoundTabActive2}
        roundTabActive={roundTabActive2}
      />
      <RoundTab
        list={roundTabList}
        setRoundTabActive={setRoundTabActive}
        roundTabActive={roundTabActive}
        tagType="button"
      />

      <hr />
      <h2 className="guideTitle">데이터 없을 시</h2>
      <p className="subText">
        기본속성 : children(문구를 바꾸고 싶은 경우, 태그 안에 글자를 기입),
        icon(기입시 아이콘 보임)
      </p>
      <NoData />
      <NoData icon>아이콘 데이터 없을 시</NoData>

      <hr />
      <h2 className="guideTitle">로딩</h2>
      <p className="subText">
        기본속성 : noBg(기입하면 bg가 없어짐), noFixed(기입하면 고정풀림)
        <br />* 둘 다 안 쓸경우 검정 배경에, 로딩 가운데 고정
      </p>
      <Loading noBg noFixed />

      <hr />
      <h2 className="guideTitle">모달</h2>
      <div className="btnArea left">
        <button type="button" onClick={() => handleModal("modalTest")}>
          모달열기
        </button>
        <button type="button" onClick={() => handleModal("modalTitleTest")}>
          타이틀 모달열기
        </button>
        <button type="button" onClick={() => handleModal("modalSmallTest")}>
          small 모달열기
        </button>
      </div>
      <Modal id="modalTest">모달에 들어갈 내용을 적어주시면 됩니다!</Modal>
      <Modal id="modalTitleTest" title="모달 제목입니다.">
        제목이 있는 모달입니다.
      </Modal>
      <Modal id="modalSmallTest" size="small" title="모달 제목">
        <p>모달 작은 사이즈</p>
        <div className="btnArea full">
          <button type="button">확인</button>
        </div>
      </Modal>
    </Content>
  );
};

export default Guide;
