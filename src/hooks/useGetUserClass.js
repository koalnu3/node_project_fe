import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const getUserClass = async () => {
  return await api.get(`/order/me`);
};

export const useGetUserClassQuery = () => {
  return useQuery({
    queryKey: ["get-user-class"],
    queryFn: () => getUserClass(),
    select: (result) => result.data,
    staleTime: 60000,
  });
};
