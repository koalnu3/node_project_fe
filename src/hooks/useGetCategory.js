import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetCategory = () => {
  return api.get(`/category`);
};

export const useGetCategoryQuery = () => {
  return useQuery({
    queryKey: ["class-category"],
    queryFn: () => fetchGetCategory(),
    select: (result) => result.data,
  });
};
