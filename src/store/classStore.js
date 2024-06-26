import { create } from "zustand";

//예시입니다
const userStore = create((set) => ({
  user: {
    totalPageNum: 0,
    classList: [],
    isLoading: false,
  },
}));

export default userStore;
