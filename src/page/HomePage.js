import React, { useEffect, useRef, useState } from "react";
import userStore from "../store/userStore";
import Content from "../components/Content";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/HomePage.style.css";
import ClassItem from "../components/ClassItem";
import { useGetClassQuery } from "../hooks/useGetClass";
import { useGetCategoryQuery } from "../hooks/useGetCategory";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [classListData, setClassListData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const { data, isLoading, isError, error } = useGetClassQuery({
    page,
    name,
    category,
  });

  const categoryData = useGetCategoryQuery();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log(categoryData?.data?.data);
  useEffect(() => {
    setClassListData(data?.data);
    setCategoryList(categoryData?.data?.data);
  });

  return (
    <Content className="homepage">
      <div className="mainSlide">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img
              srcset="https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fhxfgybdil8_2024-05-20.png&w=750&q=75 769w,https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2F3rr9hyov3rk_2024-05-20.png&w=3840&q=75 3840w"
              src="https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2F3rr9hyov3rk_2024-05-20.png&w=3840&q=75"
              alt="main-banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              srcset="https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fibuj78n4alb_2024-05-21.png&w=750&q=75 769w,https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fvc98xurw36m_2024-05-21.png&w=3840&q=75 3840w"
              src="https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fvc98xurw36m_2024-05-21.png&w=3840&q=75"
              alt="main-banner"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              srcset="https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fg5ew1iixsc_2023-12-11.png&w=750&q=75 769w,https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fjdoq5lzzm4g_2023-12-11.png&w=3840&q=75 3840w"
              src="https://www.taling.me/_next/image?url=https%3A%2F%2Fd14w7j944shu9e.cloudfront.net%2Fonsite%2Fmedia%2Fbanner%2Fjdoq5lzzm4g_2023-12-11.png&w=3840&q=75"
              alt="main-banner"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 데이터에 카테고리 아이콘이 같이있으면 좋겠어요. (피트니스, 댄스, 개발)*/}
      <div className="category">
        <ul className="categoryList">
          {categoryList?.map((category, idx) => (
            <li key={idx}>
              <a href={`/class?name=&category=${category?.name}`}>
                <span className="icon">
                  {category?.name === "피트니스" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z" />
                    </svg>
                  )}
                  {category?.name === "댄스" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                    </svg>
                  )}
                  {category?.name === "개발" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z" />
                    </svg>
                  )}
                </span>
                <span className="name">{category?.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="titleArea">
        <h2 className="h2">주간 베스트 TOP10</h2>
        <button className="textBtn">
          <span>목록보기</span>
        </button>
      </div>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          769: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className="classSwiper"
      >
        {classListData?.map((item) => (
          <SwiperSlide key={item?._id} virtualIndex={item?._id}>
            <ClassItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="titleArea">
        <h2 className="h2">신규클래스</h2>
        <button className="textBtn">
          <span>목록보기</span>
        </button>
      </div>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          769: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className="classSwiper"
      >
        {classListData?.map((item) => (
          <SwiperSlide key={item?._id} virtualIndex={item?._id}>
            <ClassItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="titleArea">
        <h2 className="h2">할인클래스</h2>
        <button className="textBtn">
          <span>목록보기</span>
        </button>
      </div>
      <Swiper
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          769: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className="classSwiper"
      >
        {classListData?.map((item) => (
          <SwiperSlide key={item?._id} virtualIndex={item?._id}>
            <ClassItem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixedBtnArea">
        <Link to="/guide" className="guideBtn" title="가이드 보기">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z" />
          </svg>
        </Link>
        <button type="button" className="topBtn" onClick={scrollToTop}>
          <span>topBtn</span>
        </button>
      </div>
    </Content>
  );
};

export default HomePage;
