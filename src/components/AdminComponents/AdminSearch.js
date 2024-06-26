import React, { useEffect, useState } from 'react';
import '../../style/AdminPage.style.css';
import Loading from '../Loading';
import UserList from './UserList';
import useAdminPageStore from '../../store/useAdminPageStore';
import { useGetUserListQuery } from '../../hooks/useGetUserList';

const AdminSearch = ({ userList, isLoading, }) => {
    const {
        page,
        setPage,
        email,
        nickname,
        level,
        status,
        inputName,
        setInputName,
        setNickName,
      } = useAdminPageStore();


    const handleNameChange = async () => {
        await setNickName(inputName);
    };

   
    const { data, authorIsLoading, isError, error } = useGetUserListQuery({
        page,
        email,
        nickname,
        level : "unsigned",
        status
      });


    return (
        <div className="admin-search-container">

            <div className="search-inputs">
                <input
                    type='text'
                    placeholder='회원명'
                    value={inputName}
                    onChange={(e) => { setInputName(e.target.value) }}
                    className="search-input"
                />
                {/* <input
                    type='text'
                    placeholder='연락처'
                    value={searchPhone}
                    onChange={handlePhoneChange}
                    className="search-input"
                /> */}
                <button onClick={handleNameChange} className="search-button">검색</button>
            </div>


            {
                level == "teacher"
                    ? <div >
                        <div className='h4'>신규 강사 요청</div>
                        {
                            authorIsLoading == true
                                ? <Loading noBg={true} noFixed={true} />
                                : <UserList userList={data?.data} isLoading={isLoading}/>
                        }
                    </div>
                    : null
            }


            <div style={{ marginTop: '30px' }} className='h4'>
                {level == "teacher" ? "강사 리스트" : "회원 리스트"}
            </div>
            {
                isLoading == true
                    ? <Loading noBg={true} noFixed={true} />
                    : <UserList userList={userList}/>
            }

        </div>
    );
}

export default AdminSearch;