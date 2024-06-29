import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import userStore from "../store/userStore";
import "../style/MyPageStyle.css";
import PlusImage from "../svg/PlusImage";
import TrashCanImage from "../svg/TrashCanImage";
import XImage from "../svg/XImage";
import api from "../utils/api";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import CameraImage from "../svg/CameraImage";

const MyClassModal = ({
  id,
  status,
  onClose,
  myClassData,
  setMyClassData,
  categoryStore,
}) => {
  const { user } = userStore();
  const filterMyClassData = myClassData.filter((data) => data._id === id);

  const filterMyCategory = (categoryStore || []).filter(
    (list) => list._id === filterMyClassData[0]?.categoryId
  );
  const [className, setClassName] = useState(filterMyClassData[0]?.name || "");
  const [thumbnail, setThumbnail] = useState(filterMyClassData[0]?.image || "");
  const [classSubscrip, setClassSubscrip] = useState(
    filterMyClassData[0]?.description || ""
  );
  const [price, setPrice] = useState(filterMyClassData[0]?.price || 0);
  const [fields, setFields] = useState(filterMyClassData[0]?.curriculum || []);
  const [selectedCategory, setSelectedCategory] = useState(
    filterMyCategory[0] || (!filterMyCategory[0] && categoryStore)[0] || {}
  );
  const widgetRef = useRef(null);
  const textareaRef = useRef(null);

  const handleAddTitle = () => {
    if (fields.length >= 5) return toast.error("강의는 5강까지 가능합니다.");
    setFields((prevFields) => [
      ...prevFields,
      {
        id: Date.now(),
        title: "",
        subItems: [{ id: Date.now(), title: "", link: "" }],
      },
    ]);
  };

  const handleTitleChange = (index, value) => {
    const newFields = [...fields];
    newFields[index].title = value;
    setFields(newFields);
  };

  const handleAddField = (titleIndex) => {
    const newFields = [...fields];
    newFields[titleIndex].subItems.push({
      id: Date.now(),
      title: "",
      link: "",
    });
    setFields(newFields);
  };

  const handleFieldChange = (titleIndex, fieldIndex, key, value) => {
    const newFields = [...fields];
    newFields[titleIndex].subItems[fieldIndex][key] = value;
    setFields(newFields);
  };

  const handleRemoveField = (titleIndex, fieldIndex) => {
    const newFields = [...fields];
    newFields[titleIndex].subItems.splice(fieldIndex, 1);
    setFields(newFields);
  };

  const handleRemoveTitle = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const uploadImage = (url) => {
    setThumbnail(url);
  };

  const handleChange = (selectedValue) => {
    const selectedData = categoryStore.filter(
      (data) => data.id === selectedValue
    );
    setSelectedCategory(...selectedData);
  };

  const classSubscripChange = (event) => {
    setClassSubscrip(event.target.value);
  };

  const handleUpdateClassUpload = async () => {
    try {
      const response = await api.put(`/class/${id}`, {
        name: className,
        description: classSubscrip,
        image: thumbnail,
        curriculum: fields,
        price,
        categoryId: selectedCategory[0]._id,
        userId: user._id,
      });
      if (response.status !== 200) throw new Error(response.error);
      setMyClassData((prev) =>
        prev.map((item) =>
          item._id === response.data.updatedClass._id
            ? response.data.updatedClass
            : item
        )
      );
      toast.success("클래스 수정을 성공하였습니다!");
      onClose();
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleNewClassUpload = async () => {
    if (!className) {
      return toast.error("클래스명을 입력해주세요.");
    }
    if (!thumbnail) {
      return toast.error("썸네일 이미지를 넣어주세요.");
    }
    if (!classSubscrip) {
      return toast.error("클래스 설명을 입력해주세요.");
    }
    if (fields.length == 0) {
      return toast.error("커리큘럼을 입력해주세요.");
    }
    if (!price) {
      return toast.error("가격을 입력해주세요.");
    }

    try {
      const response = await api.post("/class", {
        name: className,
        description: classSubscrip,
        image: thumbnail,
        curriculum: fields,
        price,
        categoryId: selectedCategory._id,
        userId: user._id,
      });
      if (response.status !== 200) throw new Error(response.error);
      setMyClassData((prev) => [...prev, response.data.newClass]);
      toast.success("신규 클래스 등록을 성공하였습니다!");
      onClose();
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="modal myPageModal">
      <div className="modalContent">
        <ul>
          <li>카테고리명</li>
          <li>
            <select
              value={selectedCategory.id}
              className="categoryDropdown"
              onChange={(e) => handleChange(e.target.value)}
            >
              {categoryStore.map((data, index) => (
                <option key={index} value={data.id}>
                  {data.name}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <ul>
          <li>클래스명</li>
          <li>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </li>
        </ul>
        <ul>
          <li>클래스 썸네일 사진</li>
          <li>
            <div
              className="flexCenter thumnailContainer"
              onClick={() => (!thumbnail ? widgetRef.current.openWidget() : "")}
            >
              {!thumbnail ? (
                <>
                  <CloudinaryUploadWidget
                    ref={widgetRef}
                    uploadImage={uploadImage}
                  />
                  <div className="helpMessage">
                    <span className="icon">
                      <CameraImage />
                    </span>
                    <p>클릭하여 이미지를 첨부해주세요</p>
                  </div>
                </>
              ) : (
                <div style={{ position: "relative" }}>
                  <img
                    src={thumbnail}
                    className="thumnailSize"
                    alt="클래스 썸네일"
                  />
                  <div
                    className="xButtonContainer flexCenter"
                    onClick={() => setThumbnail("")}
                  >
                    <div className="xButton">
                      <XImage />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
        <ul>
          <li></li>
          <li>
            <dl className="helpMessageList">
              <dt>* 클래스 썸네일 규정은 다음과 같습니다.</dt>
              <dd>1. 1280px X 720px의 고해상도 이미지를 사용해주세요.</dd>
              <dd>2. 10MB 이하의 jpg, jpen, png 파일만 등록 가능합니다.</dd>
            </dl>
          </li>
        </ul>
        <ul>
          <li>클래스 설명</li>
          <li>
            <textarea
              ref={textareaRef}
              value={classSubscrip}
              onChange={classSubscripChange}
              style={{
                width: "100%",
                height: "100%",
                padding: "10px",
                whiteSpace: "pre-wrap",
                display: "block",
                boxSizing: "border-box",
              }}
            />
          </li>
        </ul>
        <ul>
          <li>
            커리큘럼
            <button
              type="button"
              className="plusButtonIcon white"
              onClick={handleAddTitle}
            >
              <PlusImage />
            </button>
          </li>
          <li>
            <div className="curriculumAddList">
              {fields.length === 0 && (
                <p className="helpMessage">커리큘럼 목록을 추가해주세요.</p>
              )}
              {(fields || []).map((title, titleIndex) => (
                <div key={titleIndex} className="addCurriculum">
                  <div className="title">
                    <span>{titleIndex + 1}강</span>
                    <div className="cont">
                      <input
                        type="text"
                        value={title.title}
                        onChange={(e) =>
                          handleTitleChange(titleIndex, e.target.value)
                        }
                        placeholder="타이틀 입력"
                        className="inputField"
                      />
                      <button
                        type="button"
                        className="plusButtonIcon white"
                        onClick={() => handleAddField(titleIndex)}
                      >
                        <PlusImage />
                      </button>
                      <button
                        type="button"
                        className="buttonIcon gray"
                        onClick={() => handleRemoveTitle(titleIndex)}
                      >
                        <TrashCanImage />
                      </button>
                    </div>
                  </div>
                  {title.subItems.map((field, fieldIndex) => (
                    <div key={field.id} className="inputFieldContainer">
                      <input
                        type="text"
                        value={field.title}
                        onChange={(e) =>
                          handleFieldChange(
                            titleIndex,
                            fieldIndex,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="커리큘럼 제목"
                        className="inputField"
                      />
                      <input
                        type="text"
                        value={field.link}
                        onChange={(e) =>
                          handleFieldChange(
                            titleIndex,
                            fieldIndex,
                            "link",
                            e.target.value
                          )
                        }
                        placeholder="링크"
                        className="inputField"
                      />
                      <button
                        type="button"
                        className="buttonIcon gray"
                        onClick={() =>
                          handleRemoveField(titleIndex, fieldIndex)
                        }
                      >
                        <TrashCanImage />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </li>
        </ul>

        <ul>
          <li>가격</li>
          <li className="inputUnit">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="unit">원</div>
          </li>
        </ul>
        <div className="btnArea">
          <button onClick={onClose} className="gray">
            닫기
          </button>
          <button
            onClick={
              status === "update"
                ? handleUpdateClassUpload
                : handleNewClassUpload
            }
          >
            {status === "update" ? "수정" : "등록"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyClassModal;
