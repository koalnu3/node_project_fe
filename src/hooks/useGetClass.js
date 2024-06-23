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
