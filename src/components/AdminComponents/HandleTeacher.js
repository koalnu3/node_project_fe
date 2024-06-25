import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AdminPageProfile from './AdminPageProfile';
import AdminInfo from './AdminInfo';
import AdminSearch from './AdminSearch';
import Tab from '../Tab';
import { useGetUserListQuery } from '../../hooks/useGetUserList';
import useAdminPageStore from '../../store/useAdminPageStore';

const HandleTeacher = () => {
  const [tabActive, setTabActive] = useState("");

  const {
    page,
    email,
    nickname,
    level,
    status,
    selectedUser,
    selectedUserId,
  } = useAdminPageStore();

  const tabList = [
    { name: "강사정보", link: "#" },
    { name: "클래스", link: "#" }
  ];

  const { data, isLoading, isError, error } = useGetUserListQuery({
    page,
    email,
    nickname,
    level,
    status
  });

 

  return (
    <div>
      <Row>
        <Col md={4}>
          <AdminSearch
            userList={data?.data}
            isLoading={isLoading}
            
          />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <AdminPageProfile />
            </Col>
            <Col md={6}>
              <AdminInfo  />
            </Col>
            <Col>
              <Tab
                list={tabList}
                tabActive={tabActive}
                setTabActive={setTabActive}
                tagType="a"
                preventDefault={true}
              />
              {tabActive === "강사정보" ? (
                <div>
                  <h4>인사말</h4>
                  <p>{selectedUser?.introduction}</p>
                  <h4>이력</h4>
                  <ol>
                    {selectedUser?.career.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              ) : (
                <h4>클래스</h4>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HandleTeacher;
