import React, { useEffect } from "react";

const RoundTab = ({
  list,
  roundTabActive,
  setRoundTabActive,
  tagType = "a",
}) => {
  const handleActive = (event, name) => {
    event.preventDefault();
    setRoundTabActive(name);
  };

  useEffect(() => {
    if (roundTabActive === "") {
      setRoundTabActive(list[0].name);
    }
  }, []);

  return (
    <div className="roundTabList">
      <ul>
        {list?.map((menu, idx) => (
          <li
            key={idx}
            className={roundTabActive === menu?.name ? `active` : ``}
          >
            {tagType === "button" ? (
              <button
                type="button"
                className="tab"
                onClick={(event) => handleActive(event, menu?.name)}
              >
                {menu?.name}
              </button>
            ) : (
              <a
                href={menu?.link}
                className="tab"
                onClick={(event) => handleActive(event, menu?.name)}
              >
                {menu?.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundTab;
