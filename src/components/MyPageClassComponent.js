import React from "react";

const MyPageClassComponent = ({
  data,
  setOpenClassDetail,
  setStatus,
  setClickId,
}) => {
  const navigateRouter = () => {
    setOpenClassDetail(true);
    setStatus("update");
    setClickId(data._id);
  };

  return (
    <div
      style={{
        padding: "10px 10px",
        cursor: "pointer",
      }}
      onClick={navigateRouter}
    >
      <img
        style={{
          width: "250px",
          height: "170px",
          backgroundColor: "gray",
        }}
        src={data?.image[0]}
      />
      <div style={{ marginTop: "5px", fontWeight: "600" }}>{data.name}</div>
      <div
        style={{
          marginTop: "5px",
          color: "var(--color-gray)",
        }}
      >
        {data.description.split("").length > 10
          ? data.description.slice(0, 10) + "..."
          : data.description}
      </div>
      <div
        style={{
          marginTop: "5px",
          fontWeight: "600",
          fontSize: "15px",
        }}
      >
        {data.price.toLocaleString()}원
      </div>
    </div>
  );
};

export default MyPageClassComponent;
