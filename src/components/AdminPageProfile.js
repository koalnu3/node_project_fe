import React from 'react';
import '../style/AdminPage.style.css';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const AdminPageProfile = () => {
    return (
        <div>
            <div className="profile-container-header">
                <div className="profile-header-left">
                    <FontAwesomeIcon className='userIcon' icon={faUser} />
                    <div className="profile-name">김선아 여/30세</div>
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
                    <p><strong>가입일:</strong> 2023년 1월 1일</p>
                    <p><strong>연락처:</strong> 010-1234-5678</p>
                    <p><strong>이메일:</strong> example@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPageProfile;
