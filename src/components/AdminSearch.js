import React, { useState } from 'react';
import '../style/AdminPage.style.css';

const userList = [
    { name: "김선아", phoneNumber: "01022341730" },
    { name: "박민철", phoneNumber: "01034355550" },
    { name: "김철수", phoneNumber: "01032244222" },
    { name: "오동수", phoneNumber: "01011112345" },
];

const AdminSearch = () => {
    const [searchName, setSearchName] = useState('');
    const [searchPhone, setSearchPhone] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(userList);

    const handleNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setSearchPhone(e.target.value);
    };

    const handleButtonClick = () => {
        const filtered = userList.filter(user => 
            user.name.includes(searchName) && user.phoneNumber.includes(searchPhone)
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="admin-search-container">
            <div className="search-inputs">
                <input 
                    type='text' 
                    placeholder='회원명' 
                    value={searchName}
                    onChange={handleNameChange}
                    className="search-input"
                />
                <input 
                    type='text' 
                    placeholder='연락처' 
                    value={searchPhone}
                    onChange={handlePhoneChange}
                    className="search-input"
                />
                <button onClick={handleButtonClick} className="search-button">검색</button>
            </div>
            <div className="user-list">
                <div className="user-list-header">회원목록</div>
                <div className="user-list-items">
                    {filteredUsers.map((user, index) => (
                        <div key={index} className="user-list-item">
                            <div className="user-name">{user.name}</div>
                            <div className="user-phone">{user.phoneNumber}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminSearch;
