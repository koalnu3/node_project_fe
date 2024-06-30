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
    <div className="mypageClassItem" onClick={navigateRouter}>
      <div className="img">
        <img
          src={type === "customer" ? classId?.image[0] : data.image[0]}
          alt=""
        />
      </div>
      <div
        style={{
          marginTop: "5px",
          color: "var(--color-gray)",
        }}
      >
        {classId?.name.split("").length > 10
          ? classId?.name.slice(0, 10) + "..."
          : classId?.name}
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
