import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminPageProfile from './AdminPageProfile';
import AdminInfo from './AdminInfo';
import AdminSearch from './AdminSearch';
import Tab from '../Tab';
import { useGetUserListQuery } from '../../hooks/useGetUserList';
import useAdminPageStore from '../../store/useAdminPageStore';
import TeacherInformation from './TeacherInformation';
import { useEffect } from 'react';
const HandleTeacher = () => {
  const [tabActive, setTabActive] = useState("");

  const {
    page,
    nickname,
    level,
    selectedUser,
    selectedUserId
  } = useAdminPageStore();

  const tabList = [
    { name: "강사정보", link: "#" },
    { name: "클래스", link: "#" }
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
    <div>
          <AdminSearch
            userList={data?.data}
            isLoading={isLoading}
          />
              <AdminPageProfile />
              <AdminInfo  />
              <Tab
                list={tabList}
                tabActive={tabActive}
                setTabActive={setTabActive}
                tagType="a"
                preventDefault={true}
              />
              {tabActive === "강사정보" ? (
                <div>
                  <div className='h4'>인사말</div>
                  <p>{selectedUser?.introduction}</p>
                  <div className='h4'>이력</div>
                  <ol>
                    {selectedUser?.career.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              ) : (
                  <TeacherInformation/>
              )}
    </div>
  );
};

export default HandleTeacher;
