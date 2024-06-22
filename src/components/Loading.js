import React from "react";

const Loading = ({ noBg, noFixed }) => {
  return (
    <>
      {!noBg ? <div className="bg"></div> : ``}
      <div class={`loader ${!noFixed ? `` : `noFixed`}`}></div>
    </>
  );
};

export default Loading;
