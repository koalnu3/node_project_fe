import React, { useState } from "react";

const ClassItem = ({ item }) => {
  const [likeActive, setLikeActive] = useState(false);
  const handleLike = () => {
    if (likeActive === false) {
      setLikeActive(true);
    } else {
      setLikeActive(false);
    }
  };
  return (
    <div className="classItem">
      <button
        type="button"
        className={`likeBtn ${likeActive === true ? `active` : ``}`}
        onClick={() => handleLike()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
        </svg>
      </button>
      <a href={`/class/${item?._id}`}>
        <div className="img">
          <img src={item?.image[0]} alt="클래스" />
        </div>
        <div className="info">
          <strong className="title">{item?.name}</strong>
          <p className="price">
            <span>{item?.price}</span>
            <span className="unit">원</span>
          </p>
          <p className="util">
            <span className="average">5.0(162)</span>
          </p>
        </div>
      </a>
    </div>
  );
};

export default ClassItem;
