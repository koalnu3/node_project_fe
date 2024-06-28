import React, { useEffect } from 'react';
import { useGetClassListByIdQuery } from '../../hooks/useGetClassListById';
import useAdminPageStore from '../../store/useAdminPageStore';
import '../../style/AdminPage.style.css';

const TeacherInformation = () => {
    const { selectedUserId } = useAdminPageStore();
    const { data, isLoading, isError, error } = useGetClassListByIdQuery({ userId: selectedUserId });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="teacher-information">
            <div className='h4'>클래스</div>
            {
                data?.data?.length > 0 
                ? <div className="class-list">
                    {data?.data.map((classItem) => (
                        <div key={classItem.id} className="class-item">
                            <img src={classItem.image[0]} alt={classItem.name} className="class-item-image" />
                            <span className="class-item-name">{classItem.name}</span>
                        </div>
                    ))} 
                  </div>
                : <div>정보가 없음</div>
            }
        </div>
    )
}

export default TeacherInformation;
