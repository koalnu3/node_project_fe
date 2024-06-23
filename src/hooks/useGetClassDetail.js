import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetClassDetail = ({ id }) => {
  return api.get(`/class/${id}`);
};

export const useGetClassDetailQuery = ({ id }) => {
  return useQuery({
    queryKey: ["get-classDetail", { id }],
    queryFn: () => fetchGetClassDetail({ id }),
    select: (result) => result.data,
  });
};
