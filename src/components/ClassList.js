import React from "react";
import ClassItem from "./ClassItem";
import NoData from "./NoData";

const ClassList = ({ list }) => {
  return (
    <div className="classList">
      {list.length > 0 ? (
        <ul>
          {list?.map((item) => (
            <li>
              <ClassItem item={item} />
            </li>
          ))}
        </ul>
      ) : (
        <NoData icon>클래스 정보를 찾을 수 없습니다.</NoData>
      )}
    </div>
  );
};

export default ClassList;
