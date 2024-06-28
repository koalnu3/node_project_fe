import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetUserList = ({ page, nickname, level }) => {
  return api.get(`/user?page=${page}&nickname=${nickname}&level=${level}`);
};

export const useGetUserListQuery = ({ page, nickname, level }) => {
  return useQuery({
    queryKey: ["get-userList", { page, nickname, level }],
    queryFn: () => fetchGetUserList({ page, nickname, level }),
    select: (result) => result.data,
  });
};