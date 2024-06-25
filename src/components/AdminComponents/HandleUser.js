import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ClassList from '../ClassList'
import AdminPageProfile from './AdminPageProfile'
import AdminInfo from './AdminInfo'
import AdminSearch from './AdminSearch'
import { useState } from 'react'
import Tab from '../Tab'
import { useGetUserListQuery } from '../../hooks/useGetUserList'
import useAdminPageStore from '../../store/useAdminPageStore'


const HandleUser = () => {

  const [tabActive, setTabActive] = useState("");
  const tabList = [
    { name: "회원정보", link: "#" }
  ]

  const {
    page,
    setPage,
    email,
    nickname,
    level,
    status,
    selectedUser,
    selectedUserId,
  } = useAdminPageStore()

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
            <Col lg={6}>
              <AdminPageProfile/>
            </Col>
            <Col lg={6}>
              <AdminInfo />
            </Col>
            <Col>
              <Tab
                list={tabList}
                tabActive={tabActive}
                setTabActive={setTabActive}
                tagType="a"
                preventDefault={true}
              />
              <div className='h4'>수강중인 강의</div>

              <div className='h4'>결제내역</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default HandleUser