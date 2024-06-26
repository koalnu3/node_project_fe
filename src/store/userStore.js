import { create } from "zustand";

const userStore = create((set) => ({
  user: {
    _id: 0,
    nickname: "",
    email: "",
    profileImage: "",
    phoneNumber: "",
    level: "customer",
    greetings: "",
  },
  setUser: (user) => set({ user }),
}));

export default userStore;
