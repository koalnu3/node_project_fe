import React, { useState } from "react";
import "../style/VideoList.style.css";

const VideoList = ({ list, setVideoUrl, setTitle, setIsComplete }) => {
  const [toggleActive, setToggleActive] = useState("");
  const handleToggle = (idx) => {
    if (toggleActive === idx) {
      setToggleActive("");
    } else {
      setToggleActive(idx);
    }
  };

  const handleVideoUrl = (url, title, id) => {
    setVideoUrl(url);
    setTitle(title);
    setIsComplete(id);
  };

  return (
    <div className="videoList">
      <ul>
        {list?.map((item, idx) => (
          <li
            key={idx + item?.title}
            className={toggleActive === idx ? `active` : ``}
          >
            <button
              type="button"
              className="videoTitle"
              onClick={() => handleToggle(idx)}
            >
              {item?.title}
            </button>
            <div className="description">
              <ul>
                {/* {item?.list.map((sub) => ( */}
                {item?.subItems.map((sub) => (
                  <li key={`sub${sub._id}`}>
                    {/* {console.log("sub.url", sub)} */}
                    <button
                      type="button"
                      className={`descriptionInfo ${
                        sub.completed === true ? `done` : ``
                      }`}
                      id={`description${idx + sub._id}`}
                      onClick={() =>
                        handleVideoUrl(
                          sub.link,
                          sub.title,
                          `description${idx + sub._id}`
                        )
                      }
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
      </ul>
    </div>
  );
};

export default VideoList;
