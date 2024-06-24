import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ClassList from './ClassList'
import AdminPageProfile from './AdminPageProfile'
import AdminInfo from './AdminInfo'
import AdminSearch from './AdminSearch'
import { useState } from 'react'
import Tab from './Tab'

const HandleUser = () => {
  const [tabActive, setTabActive] = useState("");
  const tabList = [
    { name: "회원정보", link: "#" }
  ]

  return (
    <div>
      <Row>
        <Col md={4}>
          <AdminSearch />
        </Col>
        <Col md={8}>
          <Row>
            <Col md={6}>
              <AdminPageProfile />
            </Col>
            <Col md={6}>
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
              <h4>수강중인 강의</h4>

              <h4>결제내역</h4>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default HandleUser