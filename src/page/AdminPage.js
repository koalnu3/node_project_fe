import React, { useEffect, useState } from 'react';
import Tab from '../components/Tab';
import HandleUser from '../components/AdminComponents/HandleUser';
import HandleTeacher from '../components/AdminComponents/HandleTeacher';
import "../style/AdminPage.style.css"
import useAdminPageStore from '../store/useAdminPageStore';
const AdminPage = () => {
  const [tabActive, setTabActive] = useState("");
 
  const tabList = [
    { name: '회원관리', link: '#handleUser' },
    { name: '강사관리', link: '#handleTeacher' },
  ];

  const {
    setLevel,
    setInputName,
    setNickName,
    setSelectedUserId
  } = useAdminPageStore()

  useEffect(() => {
    if (tabActive === '회원관리') {
      setLevel('customer');
      setInputName("")
      setNickName("")
      setSelectedUserId("")
    } else if (tabActive === '강사관리') {
      setLevel('teacher');
      setInputName("")
      setNickName("")
      setSelectedUserId("")
    }
  }, [tabActive, setLevel]);

  return (
      <div className='admin-content'>
    <Tab 
          list={tabList}
          tabActive={tabActive}
          setTabActive={setTabActive}
          tagType="a"
          preventDefault={true}
        />
        
      
        {tabActive == '회원관리' ? <HandleUser/> : <HandleTeacher/>}
      </div>
  );
}

export default AdminPage;