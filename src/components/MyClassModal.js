import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import userStore from "../store/userStore";
import "../style/MyPageStyle.css";
import PlusImage from "../svg/PlusImage";
import TrashCanImage from "../svg/TrashCanImage";
import XImage from "../svg/XImage";
import api from "../utils/api";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";

const MyClassModal = ({ id, status, onClose, myClassData, setMyClassData }) => {
  const [selectedCategory, setSelectedCategory] = useState([]);

  const { user } = userStore();
  const filterMyClassData = myClassData.filter((data) => data._id === id);
  //TODO 카테고리 불러오기
  const [category, setCategory] = useState(
    filterMyClassData[0]?.category || []
  );
  const [className, setClassName] = useState(filterMyClassData[0]?.name || "");
  const [thumbnail, setThumbnail] = useState(filterMyClassData[0]?.image || "");
  const [classSubscrip, setClassSubscrip] = useState(
    filterMyClassData[0]?.description || ""
  );
  const [price, setPrice] = useState(filterMyClassData[0]?.price || 0);
  const [fields, setFields] = useState(filterMyClassData[0]?.curriculum || []);

  const widgetRef = useRef(null);
  const textareaRef = useRef(null);

  const handleAddTitle = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        title: "",
        fields: [{ id: Date.now(), title: "", link: "" }],
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
    newFields[titleIndex].fields.push({
      id: Date.now(),
      title: "",
      link: "",
    });
    setFields(newFields);
  };

  const handleFieldChange = (titleIndex, fieldIndex, key, value) => {
    const newFields = [...fields];
    newFields[titleIndex].fields[fieldIndex][key] = value;
    setFields(newFields);
  };

  const handleRemoveField = (titleIndex, fieldIndex) => {
    const newFields = [...fields];
    newFields[titleIndex].fields.splice(fieldIndex, 1);
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
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
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
        //TODO 카테고리 아이디 넣기
        categoryId: "category001",
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
    try {
      const response = await api.post("/class", {
        name: className,
        description: classSubscrip,
        image: thumbnail,
        curriculum: fields,
        price,
        //TODO 카테고리 아이디 넣기
        categoryId: "category001",
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
  useEffect(() => {}, []);
  return (
    <div className="modal">
      <div className="modalContent">
        <ul>
          <li>카테고리명</li>
          <li>
            <select
              value={selectedCategory}
              onChange={handleChange}
              className="categoryDropdown"
            >
              {category.map((data, index) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <ul>
          <li>클래스명</li>
          <li>
            <input
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
                  <div style={{ fontSize: "15px" }}>
                    클릭하여 이미지를 첨부해주세요
                  </div>
                </>
              ) : (
                <div style={{ position: "relative" }}>
                  <img src={thumbnail} className="thumnailSize" />
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
            <div style={{ fontSize: "14px" }}>
              클래스 썸네일 규정은 다음과 같습니다.
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "var(--color-gray)",
                marginTop: "5px",
              }}
            >
              <div>1. 1280px X 720px의 고해상도 이미지를 사용해주세요.</div>
              <div>2. 10MB 이하의 jpg, jpen, png 파일만 등록 가능합니다.</div>
            </div>
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
            <div className="plusButtonIcon" onClick={handleAddTitle}>
              <PlusImage />
            </div>
          </li>
          <li>
            <div style={{ display: "block", flexDirection: "column" }}>
              {fields.length > 0 &&
                fields.map((title, titleIndex) => (
                  <div
                    key={title.id}
                    style={{ flexDirection: "column", marginBottom: "20px" }}
                  >
                    <div className="inputFieldContainer">
                      <span>{titleIndex + 1}강</span>
                      <input
                        type="text"
                        value={title.title}
                        onChange={(e) =>
                          handleTitleChange(titleIndex, e.target.value)
                        }
                        placeholder="타이틀 입력"
                        className="inputField"
                      />
                      <div
                        className="plusButtonIcon"
                        onClick={() => handleAddField(titleIndex)}
                        style={{ width: "20px", height: "20px" }}
                      >
                        <PlusImage />
                      </div>
                      <div
                        className="buttonIcon"
                        onClick={() => handleRemoveTitle(titleIndex)}
                      >
                        <TrashCanImage />
                      </div>
                    </div>
                    {title.fields.map((field, fieldIndex) => (
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
                        <div
                          className="buttonIcon"
                          onClick={() =>
                            handleRemoveField(titleIndex, fieldIndex)
                          }
                        >
                          <TrashCanImage />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </li>
        </ul>

        <ul>
          <li>가격</li>
          <li style={{ display: "flex", alignItems: "center" }}>
            <input
              value={price}
              style={{ width: "100px" }}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div style={{ marginLeft: "10px" }}>원</div>
          </li>
        </ul>
        <div className="modalButton">
          <button onClick={onClose} className=" gray">
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