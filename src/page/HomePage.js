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
  // const classList = [
  //   {
  //     isDeleted: false,
  //     _id: "66769ddeee3ad00fec191a27",
  //     id: "class001",
  //     name: "Introduction to Programming",
  //     description: "Learn the basics of programming using Python.",
  //     image: [
  //       "http://example.com/images/class001/1.jpg",
  //       "http://example.com/images/class001/2.jpg",
  //     ],
  //     curriculum: [
  //       "Introduction",
  //       "Variables and Data Types",
  //       "Control Structures",
  //       "Functions",
  //       "Modules",
  //     ],
  //     price: 10000,
  //     notice: "Class starts on July 1st. Please join the introductory session.",
  //     category: "개발",
  //     userId: "66758d61f8b97787aa6e83fc",
  //     status: "",
  //   },
  //   {
  //     isDeleted: false,
  //     _id: "66769ddeee3ad00fec191a28",
  //     id: "class002",
  //     name: "Advanced JavaScript",
  //     description: "Deep dive into JavaScript and learn advanced concepts.",
  //     image: [
  //       "http://example.com/images/class002/1.jpg",
  //       "http://example.com/images/class002/2.jpg",
  //     ],
  //     curriculum: [
  //       "Scope and Closures",
  //       "Asynchronous JavaScript",
  //       "JavaScript Patterns",
  //       "Web APIs",
  //     ],
  //     price: 15000,
  //     notice:
  //       "Class starts on August 1st. Prepare by reviewing JavaScript basics.",
  //     category: "개발",
  //     userId: "66758d61f8b97787aa6e83fc",
  //     status: "",
  //   },
  //   {
  //     isDeleted: false,
  //     _id: "66769ddeee3ad00fec191a29",
  //     id: "class003",
  //     name: "Data Structures and Algorithms",
  //     description:
  //       "Master data structures and algorithms for coding interviews.",
  //     image: [
  //       "http://example.com/images/class003/1.jpg",
  //       "http://example.com/images/class003/2.jpg",
  //     ],
  //     curriculum: [
  //       "Arrays",
  //       "Linked Lists",
  //       "Stacks and Queues",
  //       "Trees and Graphs",
  //       "Sorting and Searching",
  //     ],
  //     price: 30000,
  //     notice:
  //       "Class starts on September 1st. Make sure to complete the prerequisite readings.",
  //     category: "개발",
  //     userId: "66758d61f8b97787aa6e83fc",
  //     status: "",
  //   },
  //   {
  //     isDeleted: false,
  //     _id: "66769ddeee3ad00fec191a2a",
  //     id: "class004",
  //     name: "해부학적 웨이트 트레이닝",
  //     description:
  //       "아무도 알려주지 않았던 해부학적 & 과학적 웨이트 트레이닝 클래스입니다.",
  //     image: [
  //       "http://example.com/images/class003/1.jpg",
  //       "http://example.com/images/class003/2.jpg",
  //     ],
  //     curriculum: [
  //       "해부학에 근거한 디테일한 웨이트 트레이닝",
  //       "대표적인 불균형 케이스 & 솔루션 운동",
  //       "운동 생리학에 근거한 트레이닝 방법론",
  //       "영양 섭취 전략 세우기",
  //     ],
  //     price: 20000,
  //     notice: "공지사항내용",
  //     category: "피트니스",
  //     userId: "66758d61f8b97787aa6e83fc",
  //     status: "",
  //   },
  //   {
  //     _id: "6676c6d1f6dbee872e0e635d",
  //     id: "class005",
  //     name: "헬스의 정석:빠르게 3대 1500",
  //     description: "근육을 만들고 싶은자 나에게 와라 ",
  //     image: [
  //       "http://example.com/images/class003/1.jpg",
  //       "http://example.com/images/class003/2.jpg",
  //     ],
  //     curriculum: ["벤치프레스", "스쿼트", "데드리프트"],
  //     price: 5000,
  //     notice:
  //       "Class starts on August 1st. Prepare by reviewing JavaScript basics.",
  //     category: "피트니스",
  //     status: "request",
  //     isDeleted: true,
  //     createdAt: "2024-06-22T12:42:57.692Z",
  //     updatedAt: "2024-06-22T12:48:35.859Z",
  //   },
  // ];
  const [page, setPage] = useState(1);
  const [name, setName] = useState("1");
  const [category, setCategory] = useState("피트니스");
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
              <a href={`/class/name=&category=${category?.name}`}>
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
