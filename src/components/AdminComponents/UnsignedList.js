import React from 'react'
import useAdminPageStore from '../../store/useAdminPageStore';
import { useGetUserListQuery } from '../../hooks/useGetUserList';
import { useEffect } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import api from '../../utils/api';
const UnsignedList = () => {
    const { } = useAdminPageStore();
    const queryClient = useQueryClient();

    const {
        page, selectedUserId, setSelectedUserId, setSelectedUser, setUserList,
        email, nickname, status,
    } = useAdminPageStore();

    const { data, authorIsLoading, isError, error } = useGetUserListQuery({
        page,
        email,
        nickname,
        level: "unsigned",
        status
    });



    useEffect(() => {
        if (data && selectedUserId) {
            const user = data?.data.find(user => user._id == selectedUserId);
            setSelectedUser(user);
        }
    }, [selectedUserId, data, setSelectedUser]);

    const handleApprove = async (userId) => {
        try {
            await api.put(`/user/${userId}`, { level: 'teacher' });
            setUserList(prevList => prevList.map(user => user._id === userId ? { ...user, level: 'teacher' } : user))
            queryClient.invalidateQueries("get-userList")
        } catch (error) {
            console.error("Error approving user:", error)
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
                {data?.data.map((user, index) => (
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
                            <span className='small' onClick={() => handleApprove(user._id)}>승인</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnsignedList