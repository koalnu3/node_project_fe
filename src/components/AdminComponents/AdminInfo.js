import React, { useState, useEffect } from 'react';
import '../../style/AdminPage.style.css';
import { faPen, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAdminPageStore from '../../store/useAdminPageStore';
import api from '../../utils/api';

const AdminInfo = () => {
    const { selectedUser, selectedUserId, setSelectedUser } = useAdminPageStore();
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState(selectedUser?.information || '');

    useEffect(() => {
        setUserInfo(selectedUser?.information || '');
    }, [selectedUser]);


    if (!selectedUser) {
        return <div></div>;
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            await api.put(`/user/${selectedUserId}`, { information: userInfo });
            setSelectedUser({ ...selectedUser, information: userInfo });
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    const handleInputChange = (e) => {
        setUserInfo(e.target.value);
    };

    return (
        <div>
            <div className="profile-container-header">
                <div className="profile-header-left">
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <div className="profile-name"><strong>Info</strong></div>
                </div>
                <div className="profile-header-right">
                    {isEditing ? (
                        <button onClick={handleSaveClick}>Save</button>
                    ) : (
                        <FontAwesomeIcon onClick={handleEditClick} icon={faPen} className="profile-icon" />
                    )}
                </div>
            </div>
            <div className="profile-container">
                {isEditing ? (
                    <textarea 
                        value={userInfo} 
                        onChange={handleInputChange} 
                        className="profile-info-textarea"
                    />
                ) : (
                    <div className="profile-info">
                        {selectedUser?.information || ""}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminInfo;