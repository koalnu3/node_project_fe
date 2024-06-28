import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetOrderList = ({ page, orderNum }) => {
  return api.get(`/order?page=${page}&orderNum=${orderNum}`);
};

export const useGetOrderListQuery = ({ page, orderNum }) => {
  return useQuery({
    queryKey: ["get-orderList", { page, orderNum }],
    queryFn: () => fetchGetOrderList({ page, orderNum }),
    select: (result) => result.data,
  });
};