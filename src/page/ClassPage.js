import React, { useState, useEffect, useCallback } from "react";
import { useGetClassQuery } from "../hooks/useGetClass";
import { useSearchParams } from "react-router-dom";
import ClassList from "../components/ClassList";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import "../style/ClassDetailPage.style.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../utils/api";
import RoundTab from "../components/RoundTab";

const ClassPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name") || "";
  const category = query.get("category") || "";

  useEffect(() => {
    setQuery({ name, category });
  }, [name, category]);

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["get-class-infinite", name, category],
      queryFn: async ({ queryKey, pageParam }) => {
        const name = queryKey[1];
        const category = queryKey[2];
        const { data } = await api.get(
          `/class?page=${pageParam}&name=${name}&category=${category}`
        );
        console.log("data infi", data);
        return data;
      },

      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPageParam > 20) return undefined;
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam === 1) return undefined;
        return firstPageParam - 1;
      },
    });

  console.log("data", data);
  console.log("data", hasNextPage);

  const roundTabList = [
    { name: "전체", link: "#" },
    {
      name: "피트니스",
      link: "#",
    },
    { name: "개발", link: "#" },
  ];

  const [roundTabActive, setRoundTabActive] = useState("");

  const handleRoundTabClick = (category) => {
    setRoundTabActive(category);
    if (category === "전체") {
      setQuery({ name }); // 전체 선택 시 category를 쿼리에서 제거
    } else {
      setQuery({ name, category });
    }
  };

  return (
    <div className="App">
      <RoundTab
        list={roundTabList}
        setRoundTabActive={handleRoundTabClick}
        roundTabActive={roundTabActive}
        tagType="button"
      />

      {data?.pages.map((item) => (
        <div className="classList">
          {item.data.length > 0 ? (
            <ClassList list={item?.data} />
          ) : (
            <NoData icon>클래스 정보를 찾을 수 없습니다.</NoData> //여기에 더보기 안보이게 해야된다
          )}
        </div>
      ))}
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? <Loading noBg noFixed /> : "더보기"}
        </button>
      </div>
    </div>
  );
};
export default ClassPage;
