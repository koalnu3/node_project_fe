import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetOrderListById = ({ userId }) => {
    return api.get(`/order?userId=${userId}`);
};

export const useGetOrderListByIdQuery = ({ userId }) => {
  return useQuery({
    queryKey: ["get-orderListById", { userId }],
    queryFn: () => fetchGetOrderListById({ userId }),
    select: (result) => result.data,
  });
};