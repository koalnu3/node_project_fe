import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import "../style/ClassDetailPage.style.css";
import api from "../utils/api";
import ClassList from "../components/ClassList";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Content from "../components/Content";
import { useGetCategoryQuery } from "../hooks/useGetCategory";

const ClassPage = () => {
  const [query, setQuery] = useSearchParams();
  const name = query.get("name") || "";
  const category = query.get("category") || "";
  const observerRef = useRef();
  const [roundTabActive, setRoundTabActive] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setQuery({ name, category });
    if (category === "") {
      setRoundTabActive("전체"); //검색어 입력하여 검색시 기본값 전체로 하기위해서
    }
  }, [name, category]);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["get-class-infinite", name, category],
      queryFn: async ({ queryKey, pageParam = 1 }) => {
        const name = queryKey[1];
        const category = queryKey[2];
        const { data } = await api.get(
          `/class?page=${pageParam}&name=${name}&category=${category}`
        );
        console.log("data", data);
        return data;
      },

      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 || nextPage > 20
          ? undefined
          : nextPage;
      },
    });

  const categoryData = useGetCategoryQuery();

  useEffect(() => {
    setCategoryList(categoryData?.data?.data);
  });

  const handleRoundTabClick = (category) => {
    setRoundTabActive(category);
    if (category === "전체") {
      setQuery({ name: "" });
    } else {
      setQuery({ name: "", category });
    }
    refetch();
  };

  const loadMoreRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Content>
      <div className="category" style={{ marginTop: "0px" }}>
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

      {/* {data?.pages.map((item, index) => (
        <div className="classList" key={index}>
          {item.data.length > 0 ? (
            <ClassList list={item?.data} />
          ) : (
            <NoData icon>데이터가 없습니다</NoData>
          )}
        </div>
      ))} */}

      {/* {data?.pageParams.length === 1 && data?.pages[0]?.data.length === 0 ? ( */}
      {/* {data?.pages[0]?.data.length === 0 ? ( */}
      {data?.pages[0]?.totalPageNum === 0 ? (
        <NoData icon>데이터가 없습니다</NoData>
      ) : (
        data?.pages.map((item, index) => (
          <div key={index}>
            {/* <div className="classList" key={index}> */}
            {item.data.length > 0 ? <ClassList list={item?.data} /> : null}
          </div>
        ))
      )}

      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
      {data?.pages[0].totalPageNum > data?.pages?.length && (
        <Loading noBg noFixed />
      )}
      {/* {isFetchingNextPage && <Loading noBg noFixed />} */}

      {/* {console.log("isFetchingNextPage", isFetchingNextPage)}
      {console.log("fetchNextPage", fetchNextPage)}
      {console.log("hasNextPage", hasNextPage)}
      {console.log(
        "data?.pages[0]?.totalPageNum",
        data?.pages[0]?.totalPageNum
      )} */}

      {/* {!hasNextPage && lastPageDataLength === 0 && (
        <div>
          <div className="noMoreData">더 이상 데이터가 없습니다.</div>
          <div> {data?.pages[0]?.totalPageNum} </div>
        </div>
      )} */}

      {/* {!hasNextPage &&
        lastPageDataLength === 0 &&
        data?.pages[0]?.totalPageNum === "0" && (
          <div className="noMoreData">더 이상 데이터가 없습니다.</div>
        )} */}
      {/* </div> */}
      <div className="fixedBtnArea">
        <button type="button" className="topBtn" onClick={scrollToTop}>
          <span>topBtn</span>
        </button>
      </div>
    </Content>
  );
};

export default ClassPage;
