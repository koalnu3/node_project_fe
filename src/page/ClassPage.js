import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";
import ClassList from "../components/ClassList";
import Loading from "../components/Loading";
import RoundTab from "../components/RoundTab";
import NoData from "../components/NoData";
import "../style/ClassDetailPage.style.css";

const ClassPage = () => {
  const [query, setQuery] = useSearchParams();
  const name = query.get("name") || "";
  const category = query.get("category") || "";
  const observerRef = useRef();

  useEffect(() => {
    setQuery({ name, category });
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
        console.log("data infi", data);
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

  const roundTabList = [
    { name: "전체", link: "#" },
    { name: "피트니스", link: "#" },
    { name: "댄스", link: "#" },
    { name: "개발", link: "#" },
  ];

  const [roundTabActive, setRoundTabActive] = useState("");

  const handleRoundTabClick = (category) => {
    setRoundTabActive(category);
    if (category === "전체") {
      setQuery({ name });
    } else {
      setQuery({ name, category });
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

  console.log("dddddddddd", data);

  // 마지막 페이지의 data.length 확인
  const lastPageDataLength =
    data?.pages?.[data.pages.length - 1]?.data.length || 0;

  return (
    <div className="App">
      <RoundTab
        list={roundTabList}
        setRoundTabActive={handleRoundTabClick}
        roundTabActive={roundTabActive}
        tagType="button"
      />

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
          <div className="classList" key={index}>
            {item.data.length > 0 ? <ClassList list={item?.data} /> : null}
          </div>
        ))
      )}

      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
      {isFetchingNextPage && <Loading noBg noFixed />}

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
    </div>
  );
};

export default ClassPage;
