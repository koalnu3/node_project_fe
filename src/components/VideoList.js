import React, { useState } from "react";
import "../style/VideoList.style.css";

const VideoList = ({ list, setVideoUrl }) => {
  const [toggleActive, setToggleActive] = useState("");
  const handleToggle = (idx) => {
    if (toggleActive === idx) {
      setToggleActive("");
    } else {
      setToggleActive(idx);
    }
  };

  const handleVideoUrl = (url) => {
    setVideoUrl(url);
  };

  console.log(list);
  return (
    <div className="videoList">
      <ul>
        {list?.map((item, idx) => (
          <li key={idx} className={toggleActive === idx ? `active` : ``}>
            <button
              type="button"
              className="videoTitle"
              onClick={() => handleToggle(idx)}
            >
              {item?.title}
            </button>
            <div className="description">
              <ul>
                {item?.list.map((sub) => (
                  <li key={sub.id}>
                    <button
                      type="button"
                      className={`descriptionInfo ${
                        sub.isComplete === true ? `done` : ``
                      }`}
                      onClick={() => handleVideoUrl(sub.url)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                      </svg>
                      <span className="descriptionTitle">{sub.title}</span>
                      <span className="time">{sub.time}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

        {/* <li className={toggleActive === "2" ? `active` : ``}>
          <button
            type="button"
            className="title"
            onClick={() => handleToggle("2")}
          >
            메뉴2
          </button>
          <div className="description">
            <ul>
              <li>
                <button type="button">메뉴2-1</button>
              </li>
              <li>
                <button type="button">메뉴2-2</button>
              </li>
            </ul>
          </div>
        </li>
        <li className={toggleActive === "3" ? `active` : ``}>
          <button
            type="button"
            className="title"
            onClick={() => handleToggle("3")}
          >
            메뉴3
          </button>
          <div className="description">
            <ul>
              <li>
                <button type="button">메뉴3-1</button>
              </li>
              <li>
                <button type="button">메뉴3-2</button>
              </li>
              <li>
                <button type="button">메뉴3-3</button>
              </li>
              <li>
                <button type="button">메뉴3-4</button>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
      {/* <ul className="toggle">
        {list?.map((item, idx) => (
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
      </ul> */}
    </div>
  );
};

export default VideoList;
