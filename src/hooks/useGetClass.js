import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetClass = ({ page, name, category }) => {
  return api.get(`/class?page=${page}&name=${name}&category=${category}`);
};

export const useGetClassQuery = ({ page, name, category }) => {
  return useQuery({
    queryKey: ["get-class", { page, name, category }],
    queryFn: () => fetchGetClass({ page, name, category }),
    select: (result) => result.data,
  });
};

//베스크클래스 (좋아요순)
const fetchGetClassLike = ({ page, name, category }) => {
  return api.get(
    `/class?page=${page}&name=${name}&category=${category}&sortBy=likes`
  );
};

export const useGetClassLikeQuery = ({ page, name, category }) => {
  return useQuery({
    queryKey: ["get-classLike", { page, name, category }],
    queryFn: () => fetchGetClassLike({ page, name, category }),
    select: (result) => result.data,
  });
};

//신규클래스 (createdAt : 최신순)
const fetchGetClassRecent = ({ page, name, category }) => {
  return api.get(
    `/class?page=${page}&name=${name}&category=${category}&sortBy=createdAt`
  );
};

export const useGetClassRecentQuery = ({ page, name, category }) => {
  return useQuery({
    queryKey: ["get-classRecent", { page, name, category }],
    queryFn: () => fetchGetClassRecent({ page, name, category }),
    select: (result) => result.data,
  });
};
