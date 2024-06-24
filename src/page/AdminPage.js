import React, { useState } from 'react';
import Tab from '../components/Tab';
import HandleUser from '../components/HandleUser';
import HandleTeacher from '../components/HandleTeacher';
import { Container } from 'react-bootstrap';
import "../style/AdminPage.style.css"

const AdminPage = () => {
  const [tabActive, setTabActive] = useState("");

  const tabList = [
    { name: '회원관리', link: '#handleUser' },
    { name: '강사관리', link: '#handleTeacher' },
  ];

  return (
    <div>
    <Tab 
          list={tabList}
          tabActive={tabActive}
          setTabActive={setTabActive}
          tagType="a"
          preventDefault={true}
        />
        
      <div className='admin-content'>
        {tabActive === '회원관리' && <HandleUser/>}
        {tabActive === '강사관리' && <HandleTeacher/>}
      </div>
    </div>
  );
}

export default AdminPage;