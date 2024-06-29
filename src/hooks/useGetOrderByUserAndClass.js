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
// const fetchGetOrderByUserAndClass = ({ userId, classId }) => {
//   return api.get(`/order?userId=${userId}&classId=${classId}`);
// };

// export const useGetOrderByUserAndClassQuery = ({ userId, classId }) => {
//   return useQuery({
//     queryKey: ["get-orderByUserAndClass", { userId, classId }],
//     queryFn: () => fetchGetOrderByUserAndClass({ userId, classId }),
//     select: (result) => result.data,
//   });
// };
