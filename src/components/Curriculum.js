import React, { useState } from "react";

const Curriculum = ({ list, isDescription, handleVideoModal }) => {
  const [toggleActive, setToggleActive] = useState("");
  const handleToggle = (event, idx) => {
    if (toggleActive === idx) {
      setToggleActive("");
    } else {
      setToggleActive(idx);
    }
  };
  return (
    <div className={`toggleList ${!isDescription ? `onlyList` : ``}`}>
      <ul className="toggle">
        {list?.map((item, idx) => (
          <li
            key={idx + `toggle`}
            className={idx + `toggle` === toggleActive ? `active` : ``}
          >
            {!isDescription ? (
              <span className="title">
                {idx + 1}. {item}
              </span>
            ) : (
              <button
                type="button"
                className="title"
                onClick={(event) => handleToggle(event, idx + `toggle`)}
              >
                {item.title}
              </button>
            )}

            {isDescription && (
              <div className="description">
                <ul className="list">
                  {item?.subItems.map((ItemDetail, idx) => (
                    <li key={ItemDetail._id}>
                      <p>{ItemDetail.title}</p>
                      <span>
                        <span className="time">{ItemDetail.time}</span>
                        <button
                          type="button"
                          className="videoBtn"
                          onClick={() =>
                            handleVideoModal(
                              ItemDetail.link,
                              ItemDetail.title,
                              `description${idx + ItemDetail._id}`
                            )
                          }
                        >
                          영상보기
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Curriculum;
