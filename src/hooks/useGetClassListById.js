import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGetClassListById = ({ userId }) => {
    return api.get(`/admin?userId=${userId}`);
    
};

export const useGetClassListByIdQuery = ({ userId }) => {
  return useQuery({
    queryKey: ["get-classListById", { userId }],
    queryFn: () => fetchGetClassListById({ userId }),
    select: (result) => result.data,
  });
};
