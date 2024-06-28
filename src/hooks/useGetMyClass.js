import { useQuery } from "@tanstack/react-query";
import userStore from "../store/userStore";
import api from "../utils/api";

const fetchGetMyClass = ({ user }) => {
  return api.get(`/class/my/${user._id}`);
};

export const useGetMyClass = () => {
  const { user } = userStore();

  return useQuery({
    queryKey: ["get-my-class"],
    queryFn: () => fetchGetMyClass({ user }),
    select: (result) => result.data,
    staleTime: 5 * 60 * 1000,
  });
};
