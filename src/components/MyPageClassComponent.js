import React from "react";

const MyPageClassComponent = ({
  data,
  setOpenClassDetail,
  setStatus,
  setClickId,
}) => {
  const classId = data.classId;
  const navigateRouter = () => {
    setOpenClassDetail && setOpenClassDetail(true);
    setStatus && setStatus("update");
    setClickId && setClickId(classId._id);
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
        src={classId?.image[0]}
      />
      <div style={{ marginTop: "5px", fontWeight: "600" }}>{classId.name}</div>
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
