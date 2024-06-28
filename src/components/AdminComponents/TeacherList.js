import React, { useEffect } from 'react';
import '../../style/AdminPage.style.css';
import { useQueryClient } from "@tanstack/react-query";
import useAdminPageStore from '../../store/useAdminPageStore';
import api from '../../utils/api';
import Loading from '../Loading';

const TeacherList = ({ userList }) => {
  const { selectedUserId, setSelectedUserId, setSelectedUser, setUserList } = useAdminPageStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userList && selectedUserId) {
      const user = userList?.find(user => user._id === selectedUserId);
      setSelectedUser(user);
    }
  }, [selectedUserId, userList, setSelectedUser]);


  const handleRevokeApproval = async (userId) => {
    try {
      await api.put(`/user/${userId}`, { level: 'unsigned' })
      setUserList(prevList => prevList.map(user => user._id === userId ? { ...user, level: 'unsigned' } : user))
      queryClient.invalidateQueries("get-userList")
    } catch (error) {
      console.error("Error revoking approval:", error)
    }
  };

  

  return (
    <div className="user-list">
      <div className="user-list-header">
        <div className="header-name">회원명</div>
        <div className="header-phone">전화번호</div>
        <div className="header-status">승인</div>
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
                <span className='small' onClick={() => handleRevokeApproval(user._id)}>승인취소</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherList;
