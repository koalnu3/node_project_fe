import React from "react";

const Loading = ({ noBg, noFixed }) => {
  return (
    <>
      {!noBg ? <div className="bg"></div> : ``}
      <div className="loadingArea">
        <div class={`loader ${!noFixed ? `` : `noFixed`}`}></div>
      </div>
    </>
  );
};

export default Loading;
