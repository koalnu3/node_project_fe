import React, { useEffect } from "react";

const Tab = ({ list, tabActive, setTabActive, tagType = "a" }) => {
  const handleActive = (event, name) => {
    event.preventDefault();
    setTabActive(name);
  };

  useEffect(() => {
    if (tabActive === "") {
      setTabActive(list[0].name);
    }
  }, []);

  return (
    <div className="tabList">
      <ul>
        {list?.map((menu, idx) => (
          <li key={idx} className={tabActive === menu?.name ? `active` : ``}>
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

export default Tab;
