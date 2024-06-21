import React from "react";
import Content from "../components/Content";

const HomePage = () => {
  return (
    <Content>
      <h2 className="h3">Title</h2>
      <h2 className="h2">제목 className="h2"</h2>
      <h2 className="h3">제목 className="h3"</h2>
      <h2 className="h4">제목 className="h4"</h2>
      <h2 className="h5">제목 className="h5"</h2>
      <h2 className="h6">제목 className="h6"</h2>
      <p className="subText">
        선택자란 말 그대로 선택을 해주는 요소입니다. 이를 통해 특정 요소들을
        선택하여 스타일을 적용할 수 있게 됩니다
      </p>

      <h2 className="h3">Button</h2>
      <h3 className="h6">size default, small, large</h3>
      <button type="button" className="small">
        버튼
      </button>
      <button type="button">버튼</button>
      <button type="button" className="large">
        버튼
      </button>
      <h3 className="h6">color default, white, gray</h3>
      <button type="button">버튼</button>
      <button type="button" className="white">
        <span className="iconMore">버튼</span>
      </button>
      <button type="button" className="gray">
        <span className="iconMore">버튼</span>
      </button>
      <button type="button" className="topBtn">
        <span>탑으로가기</span>
      </button>
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
        {/* <button type="button" className="gray">
          버튼
        </button> */}
      </div>

      <h2 className="h3">Input</h2>
      <input type="text" placeholder="이름을 기입하세요" />
      <input type="search" />
      <textarea></textarea>
      <div>
        <input type="radio" id="radio1" name="radioCheck" value="radio1" />
        <label htmlFor="radio1">radio 1</label>
        <input type="radio" id="radio2" name="radioCheck" value="radio2" />
        <label htmlFor="radio2">radio 2</label>
        <input type="radio" id="radio3" name="radioCheck" value="radio3" />
        <label htmlFor="radio3">radio 3</label>
      </div>
    </Content>
  );
};

export default HomePage;
