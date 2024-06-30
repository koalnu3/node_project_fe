import React, { useState } from "react";
import AdminPageProfile from "./AdminPageProfile";
import AdminInfo from "./AdminInfo";
import AdminSearch from "./AdminSearch";
import Tab from "../Tab";
import { useGetUserListQuery } from "../../hooks/useGetUserList";
import useAdminPageStore from "../../store/useAdminPageStore";
import TeacherInformation from "./TeacherInformation";
import { useEffect } from "react";
const HandleTeacher = () => {
  const [tabActive, setTabActive] = useState("");

  const { page, nickname, level, selectedUser, selectedUserId } =
    useAdminPageStore();

  const tabList = [
    { name: "강사정보", link: "#" },
    { name: "클래스", link: "#" },
  ];

  const { data, isLoading, isError, error, refetch } = useGetUserListQuery({
    page,
    nickname,
    level,
  });

  useEffect(() => {
    if (selectedUserId) {
      refetch();
    }
  }, [selectedUserId, refetch]);

  return (
    <div className="admin-page-main">
      <div>
        <AdminSearch userList={data?.data} isLoading={isLoading} />
      </div>
      <div>
        <div>
          <AdminPageProfile />
          <AdminInfo />
        </div>

        <Tab
          list={tabList}
          tabActive={tabActive}
          setTabActive={setTabActive}
          tagType="button"
          preventDefault={true}
        />
        {tabActive === "강사정보" ? (
          <div>
            <div className="h4">인사말</div>
            <div className="teacherMessage">
              <p>
                {selectedUser?.length > 0 ? (
                  selectedUser?.introduction
                ) : (
                  <span className="helpMessage">인사말 정보가 없습니다.</span>
                )}
              </p>
            </div>
            <div className="h4">이력</div>
            <div className="teacherBackground">
              {selectedUser?.career.length > 0 ? (
                <ol>
                  {selectedUser?.career.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ol>
              ) : (
                <span className="helpMessage">이력 정보가 없습니다.</span>
              )}
            </div>
          </div>
        ) : null}

        {tabActive === "클래스" && selectedUser?.level == "teacher" ? (
          <TeacherInformation />
        ) : null}
      </div>
    </div>
  );
};

export default HandleTeacher;
