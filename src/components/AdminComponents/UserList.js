import React, { useEffect } from 'react';
import '../../style/AdminPage.style.css';
import useAdminPageStore from '../../store/useAdminPageStore';

const UserList = ({ userList }) => {
  const { selectedUserId, setSelectedUserId, setSelectedUser, setUserList } = useAdminPageStore();

  useEffect(() => {
    if (userList && selectedUserId) {
      const user = userList?.find(user => user._id === selectedUserId);
      setSelectedUser(user);
    }
  }, [selectedUserId, userList, setSelectedUser]);


  console.log(userList)
  

  return (
    <div className="user-list">
      <div className="user-list-header">
        <div className="header-name">회원명</div>
        <div className="header-phone">전화번호</div>
        <div className="header-status"></div>
      </div>
      <div className="user-list-items">
        {userList?.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUserId(user._id);
            }}
            key={index}
            className={`user-list-item ${selectedUserId === user._id ? 'selected' : ''}`}
          >
            <div className="user-name">{user.nickname}</div>
            <div className="user-phone">{user.phoneNumber}</div>
            <div className="user-status">
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
