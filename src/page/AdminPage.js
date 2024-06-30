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
    setSelectedUser,
    setSelectedUserId
  } = useAdminPageStore()

  useEffect(() => {
    if (tabActive === '회원관리') {
      setLevel('customer');
      setInputName("")
      setNickName("")
      setSelectedUserId("")
      setSelectedUser(null)
    } else if (tabActive === '강사관리') {
      setLevel('teacher');
      setInputName("")
      setNickName("")
      setSelectedUserId("")
      setSelectedUser(null)
    }
  }, [tabActive, setLevel]);

  return (
      <div className='admin-content'>

        <div className='admin-page-main'>
    <Tab 
          list={tabList}
          tabActive={tabActive}
          setTabActive={setTabActive}
          tagType="a"
          preventDefault={true}
        />
        </div>
      
        {tabActive == '회원관리' ? <HandleUser/> : <HandleTeacher/>}
      </div>
  );
}

export default AdminPage;