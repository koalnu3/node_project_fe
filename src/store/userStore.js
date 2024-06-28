import { create } from "zustand";

const userStore = create((set) => ({
  user: {
    _id: 0,
    nickname: "",
    email: "",
    image: "",
    phoneNumber: "",
    level: "customer",
    greetings: "",
    career: [],
    status: "",
    introduction: "",
  },
  setUser: (user) => set({ user }),
}));

export default userStore;
