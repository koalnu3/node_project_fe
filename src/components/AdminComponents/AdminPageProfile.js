import React, { useState } from 'react';
import '../../style/AdminPage.style.css';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAdminPageStore from '../../store/useAdminPageStore';
import api from '../../utils/api';

const AdminPageProfile = () => {
  const { selectedUser, setSelectedUser, selectedUserId } = useAdminPageStore();
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    nickname: '',
    email: '',
    phoneNumber: '',
  });

  if (!selectedUser) {
    return <div></div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm('유저를 삭제하시겠습니까?');
    if (confirmed) {
      try {
        await api.delete(`/user/${selectedUserId}`);
        setSelectedUser(null);
        alert('유저가 삭제되었습니다.');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('유저 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleEditClick = () => {
    setEditing(true);
    setEditedUser({
      nickname: selectedUser.nickname,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
    });
  };

  const handleSaveClick = async () => {
    try {
      // Make API call to update user
      await api.put(`/user/${selectedUserId}`, editedUser);
      setSelectedUser({
        ...selectedUser,
        nickname: editedUser.nickname,
        email: editedUser.email,
        phoneNumber: editedUser.phoneNumber,
      });
      setEditing(false);
      alert('유저 정보가 수정되었습니다.');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('유저 정보 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCancelEdit = () => {
    setEditing(false)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="profile-container-header">
        <div className="profile-header-left">
          <FontAwesomeIcon className='userIcon' icon={faUser} />
          {!editing ? (
            <div className="profile-name">
              <strong>{selectedUser.nickname}</strong>
            </div>
          ) : (
            <div className="profile-name">
              <input
                type="text"
                name="nickname"
                value={editedUser.nickname}
                onChange={handleInputChange}
              />
            </div>
          )}
        </div>
        <div className="profile-header-right">
          {!editing && (
            <>
              <FontAwesomeIcon icon={faPen} className="profile-icon" onClick={handleEditClick} />
              <FontAwesomeIcon icon={faTrash} className="profile-icon" onClick={handleDeleteClick} />
            </>
          )}
          {editing && (
            <>
              <button onClick={handleSaveClick}>저장</button>
              <button onClick={handleCancelEdit}>취소</button>
            </>
          )}
        </div>
      </div>
      <div className="profile-container">
        <img
          className="profile-image"
          src={selectedUser?.image || "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn2.ppomppu.co.kr%2Fzboard%2Fdata3%2F2022%2F0509%2F20220509173224_d9N4ZGtBVR.jpeg&type=ff332_332"}
          alt="프로필 사진"
        />
        <div className="profile-info">
          <div>
            <p><strong>가입일:</strong> {formatDate(selectedUser.createdAt)}</p>
            {!editing ? (
              <>
                <p><strong>연락처:</strong> {selectedUser.phoneNumber}</p>
                <p><strong>이메일:</strong> {selectedUser.email}</p>
              </>
            ) : (
              <>
                <p><strong>연락처:</strong> <input type="text" name="phoneNumber" value={editedUser.phoneNumber} onChange={handleInputChange} /></p>
                <p><strong>이메일:</strong> <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} /></p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageProfile;
