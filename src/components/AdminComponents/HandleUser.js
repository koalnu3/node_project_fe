import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ClassList from '../ClassList';
import AdminPageProfile from './AdminPageProfile';
import AdminInfo from './AdminInfo';
import AdminSearch from './AdminSearch';
import Tab from '../Tab';
import { useGetUserListQuery } from '../../hooks/useGetUserList';
import useAdminPageStore from '../../store/useAdminPageStore';
import UserInformation from './UserInformation';

const HandleUser = () => {
  const [tabActive, setTabActive] = useState('');
  const tabList = [{ name: '회원정보', link: '#' }];

  const {
    page,
    nickname,
    level,
    selectedUserId,
  } = useAdminPageStore();

  const { data, isLoading, isError, error, refetch } = useGetUserListQuery({
    page,
    nickname,
    level,
  });

  useEffect(() => {
    if (selectedUserId) {
      refetch();
    }
  }, [selectedUserId, refetch]);

  return (
    <div>
      <AdminSearch
        userList={data?.data}
        isLoading={isLoading}
      />

      <AdminPageProfile />

      <AdminInfo />

      <Tab
        list={tabList}
        tabActive={tabActive}
        setTabActive={setTabActive}
        tagType="a"
        preventDefault={true}
      />

      {
        selectedUserId? <UserInformation />:null
      }
    

      
    </div>
  );
};

export default HandleUser;