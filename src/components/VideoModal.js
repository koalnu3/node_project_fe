import React, { useEffect, useState } from "react";
import "../style/VideoPage.style.css";
import VideoList from "./VideoList";

const VideoModal = ({ id, list, clickVideoUrl }) => {
  const [utilActive, setUtilActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [urlIndex, setUrlIndex] = useState(0);

  console.log(clickVideoUrl);

  const handleModalClose = () => {
    document.querySelector(`#${id}`).close();
  };

  const urlListCreate = () => {
    const filterList = [];
    list?.map((item) => item.list.map((e) => filterList.push(e.url)));
    setUrlList(filterList);
  };

  const handleUtilOpen = () => {
    setUtilActive(!utilActive);
  };
  const handlePrev = () => {
    const checkIndex = urlList.indexOf(videoUrl);

    if (urlIndex > 0) {
      setVideoUrl(urlList[checkIndex - 1]);
      setUrlIndex(checkIndex - 1);
    }

    console.log(checkIndex);
    return;
  };
  const handleComplete = () => {};
  const handleNext = () => {
    const checkIndex = urlList.indexOf(videoUrl);
    const urlLength = urlList.length - 1;

    if (checkIndex < urlLength) {
      setVideoUrl(urlList[checkIndex + 1]);
      setUrlIndex(checkIndex + 1);
    }
    return;
  };

  useEffect(() => {
    console.log("찍히긴하는거야?");
    if (!clickVideoUrl) {
      console.log("클릭비디오링크없음");
      setVideoUrl(list[0].list[0].url);
    } else {
      setVideoUrl(clickVideoUrl);
    }
    urlListCreate();
  }, [clickVideoUrl]);

  return (
    <dialog id={id} className="videoModal">
      <div className="videoArea">
        <div className="videoView">
          <div className="title">
            <h2>지금 딱 5초만 해보세요! 솔직히 모든문제는 이곳에 있어요</h2>
          </div>
          <div className="view">
            <iframe
              width="560"
              height="315"
              src={videoUrl}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="controller">
            <button
              type="button"
              className="prevBtn"
              onClick={() => handlePrev()}
              disabled={urlIndex > 0 ? false : true}
            >
              <span className="iconPrev">이전 수업</span>
            </button>
            <button
              type="button"
              className="completeBtn"
              onClick={() => handleComplete()}
            >
              봤어요
            </button>
            <button
              type="button"
              className="nextBtn"
              onClick={() => handleNext()}
              disabled={urlIndex === urlList.length - 1 ? true : false}
            >
              <span className="iconNext">다음 수업</span>
            </button>
          </div>
        </div>
        <div className="videoUtil">
          <div className="util">
            <button className="curriculumBtn" onClick={() => handleUtilOpen()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
              </svg>
            </button>
            <button
              type="button"
              className="closeBtn"
              onClick={() => handleModalClose()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
          <div
            className={`videoCurriculum ${utilActive === true ? `active` : ``}`}
          >
            <h3 className="h3">커리큘럼</h3>
            <VideoList list={list} setVideoUrl={setVideoUrl} />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default VideoModal;
