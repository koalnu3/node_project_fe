import React, { useState, useEffect } from "react";
import "../style/ClassDetailPage.style.css";
import ClassList from "../components/ClassList";
import { useGetClassQuery } from "../hooks/useGetClass";
import { useGetClassDetailQuery } from "../hooks/useGetClassDetail";
import NoData from "../components/NoData";
import Loading from "../components/Loading";

const ClassPage = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("1");
  const [category, setCategory] = useState("피트니스");

  const { data, isLoading, isError, error } = useGetClassQuery({
    page,
    name,
    category,
  });
  ////////////////////////////////////////////////////////////////////////////////////
  // 클래스 상세조회
  // const [id, setId] = useState("6676c6d1f6dbee872e0e635d");
  // const { data, isLoading, isError, error } = useGetClassDetailQuery({ id });

  console.log("data", data);

  if (isLoading) {
    return <Loading noBg noFixed />;
  }
  if (isError) {
    return <NoData icon>Error: {error.message}</NoData>;
  }

  return data ? <ClassList list={data.data} /> : null;
};

export default ClassPage;
