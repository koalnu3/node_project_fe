import React from "react";

const MyPageClassComponent = ({
  data,
  type,
  setOpenClassDetail,
  setStatus,
  setClickId,
}) => {
  const classId = data.classId;
  const navigateRouter = () => {
    setOpenClassDetail && setOpenClassDetail(true);
    setStatus && setStatus("update");
    setClickId && setClickId(type === "customer" ? classId._id : data._id);
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
        src={type === "customer" ? classId?.image[0] : data.image[0]}
      />
      <div
        style={{
          marginTop: "5px",
          color: "var(--color-gray)",
        }}
      >
        {data?.description?.split("").length > 10
          ? data?.description?.slice(0, 10) + "..."
          : data?.description}
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
