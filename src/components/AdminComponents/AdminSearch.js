import React, { useEffect, useState } from 'react';
import '../../style/AdminPage.style.css';
import Loading from '../Loading';
import UserList from './UserList';
import TeacherList from './TeacherList';
import useAdminPageStore from '../../store/useAdminPageStore';
import UnsignedList from './UnsignedList';

const AdminSearch = ({ userList, isLoading }) => {
  const {
    level,
    inputName,
    setInputName,
    setNickName,
  } = useAdminPageStore();

  const handleNameChange = async () => {
    await setNickName(inputName);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNameChange();
    }
  };

  if (isLoading) {
    return <Loading noBg={true} noFixed={true} />;
  }

  return (
    <div className="admin-search-container">
      <div className="search-inputs">
        <input
          type='text'
          placeholder='회원명'
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        <button onClick={handleNameChange} className="search-button">검색</button>
      </div>

      {level === "teacher" && (
        <div>
          <div className='h4'>신규 강사 요청</div>
          <UnsignedList />
        </div>
      )}

      <div style={{ marginTop: '30px' }} className='h4'>
        {level === "teacher" ? "강사 리스트" : "회원 리스트"}
      </div>
      <div>
        {level === 'teacher' ? <TeacherList userList={userList} /> : <UserList userList={userList} />}
      </div>
    </div>
  );
}

export default AdminSearch;
