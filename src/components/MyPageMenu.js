import React from "react";

const MyPageMenu = ({ menu, selectMenu, setSelectMenu, index }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        cursor: "pointer",
      }}
      key={index}
      onClick={() => setSelectMenu(menu)}
    >
      <div
        style={{
          color:
            menu.name === selectMenu.name
              ? "var(--color-primary)"
              : "var(--color-gray)",
          fontWeight: 600,
        }}
      >
        {menu.name}
      </div>
      <div
        style={{
          width: "15px",
          transform: "rotate(270deg)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill={
            menu.name === selectMenu.name
              ? "var(--color-primary)"
              : "var(--color-gray)"
          }
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </div>
    </div>
  );
};

export default MyPageMenu;
