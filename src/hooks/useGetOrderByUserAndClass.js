import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetOrderByUserAndClass = ({ classId }) => {
  return api.get(`/order/byUserAndClass?classId=${classId}`);
};

export const useGetOrderByUserAndClassQuery = ({ classId }) => {
  return useQuery({
    queryKey: ["get-orderByUserAndClass", { classId }],
    queryFn: () => fetchGetOrderByUserAndClass({ classId }),
    select: (result) => result.data,
  });
};
