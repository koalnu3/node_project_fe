import React from 'react';
import '../../style/AdminPage.style.css';
import { faPen, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAdminPageStore from '../../store/useAdminPageStore';
const AdminInfo = () => {
    const {
        selectedUser,
      } = useAdminPageStore();

    return (
        <div>
            <div className="profile-container-header">
                <div className="profile-header-left">
                <FontAwesomeIcon icon={faCircleInfo} />
                    <div className="profile-name"><strong>Info</strong></div>
                </div>
                <div className="profile-header-right">
                    <FontAwesomeIcon icon={faPen} className="profile-icon" />
                </div>
            </div>
            <div className="profile-container">
                <div className="profile-info">
                    윤세리 회원님 추천 / 5%할인쿠폰 발급
                </div>
            </div>
        </div>
    );
};

export default AdminInfo;
