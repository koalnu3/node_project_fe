import React, { useEffect } from 'react';
import '../../style/AdminPage.style.css';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAdminPageStore from '../../store/useAdminPageStore';
const AdminPageProfile = () => {
    const {
        selectedUser,
      } = useAdminPageStore();


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ko-KR', options);
      }

    console.log(selectedUser)
    return (
        <div>
            <div className="profile-container-header">
                <div className="profile-header-left">
                    <FontAwesomeIcon className='userIcon' icon={faUser} />
                    <div className="profile-name"><strong>{selectedUser ? selectedUser.nickname : "홍길동"}</strong></div>
                </div>
                <div className="profile-header-right">
                    <FontAwesomeIcon icon={faPen} className="profile-icon" />
                    <FontAwesomeIcon icon={faTrash} className="profile-icon" />
                </div>
            </div>
            <div className="profile-container">
                <img
                    className="profile-image"
                    src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fcdn2.ppomppu.co.kr%2Fzboard%2Fdata3%2F2022%2F0509%2F20220509173224_d9N4ZGtBVR.jpeg&type=ff332_332"
                    alt="프로필 사진"
                />
                <div className="profile-info">
                    <div>
                    <p><strong>가입일:</strong> {selectedUser ? formatDate(selectedUser.createdAt) : "202X년 X월 X일"}</p>
                    <p><strong>연락처:</strong> {selectedUser ? selectedUser.phoneNumber : "010-1234-5678"}</p>
                    <p><strong>이메일:</strong> {selectedUser ? selectedUser.email : "example@gmail.com"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPageProfile;
