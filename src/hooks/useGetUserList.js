import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetUserList = ({ page, email, nickname, level, status }) => {
  return api.get(`/user?page=${page}&email=${email}&nickname=${nickname}&level=${level}&status=${status}`);
};

export const useGetUserListQuery = ({ page, email, nickname, level, status }) => {
  return useQuery({
    queryKey: ["get-userList", { page, email, nickname, level, status }],
    queryFn: () => fetchGetUserList({ page, email, nickname, level, status }),
    select: (result) => result.data,
  });
};