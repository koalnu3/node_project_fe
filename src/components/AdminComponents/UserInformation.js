import React from 'react';
import { useGetOrderListByIdQuery } from '../../hooks/useGetOrderListById';
import useAdminPageStore from '../../store/useAdminPageStore';
import '../../style/AdminPage.style.css';
import { useState } from 'react';
const UserInformation = () => {
  const { selectedUserId } = useAdminPageStore();

  const [orderStatus, setOrderStatus] = useState({});
  const { data, isLoading, isError, error } = useGetOrderListByIdQuery({ userId: selectedUserId });

  console.log("data?", data)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.error}</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ko-KR', options);
  };


  const handleStatusChange = (orderId, newStatus) => {
    setOrderStatus((prevStatus) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  return (
    <div>
      <div className='h4'>수강중인 강의</div>
      {data?.orderList?.length > 0 ? (
        <div className='class-list'>
          {data?.orderList.map(order => (
            <div key={order._id} className='class-item'>
              <img src={order.classId?.image[0]} alt="" className="class-item-image" />
              <p className="class-item-name">{order.classId?.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>수강중인 강의가 없음</div>
      )}
      <div className='h4'>결제내역</div>
      {data?.orderList.length > 0 ? (
        <div className='user-list'>
          <div className='user-list-header'>
            <div className='header-name'>주문번호</div>
            <div className='header-status'>금액</div>
            <div className='header-status'>상태</div>
            <div className='header-status'>결제방식</div>
            <div className='header-status'>날짜</div>
          </div>
          <div className='user-list-items'>
            {data?.orderList.map((order) => (
              <div key={order._id} className='user-list-item'>
                <div className='header-name'>{order.orderNum}</div>
                <div className='header-status'>{order.price}</div>
                <div className='header-status'>
                  <select
                    className='status-dropdown'
                    value={orderStatus[order._id] || order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="payment">payment</option>
                    <option value="refund">refund</option>
                  </select>
                </div>
                <div className='header-status'>{order.payMethod}</div>
                <div className='header-status'>{formatDate(order.createdAt)}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>결제내역이 없음</div>
      )}
    </div>
  );
};

export default UserInformation;
