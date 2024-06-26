// store/useAdminPageStore.js
import create from 'zustand';

const useAdminPageStore = create((set) => ({
  tabActive: "",
  setTabActive: (tab) => set({ tabActive: tab }),

  page: 1,
  setPage: (page) => set({ page }),

  email: "",
  setEmail: (email) => set({ email }),

  nickname: "",
  setNickName: (nickname) => set({ nickname }),

  level: "teacher",
  setLevel: (level) => set({ level }),

  status: "",
  setStatus: (status) => set({ status }),

  selectedUserId: "",
  setSelectedUserId: (id) => set({ selectedUserId: id }),

  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),

  inputName: "",
  setInputName: (name) => set({ inputName: name }),
  
  userList: [],
  setUserList: (list) => set({ userList: list })
}));

export default useAdminPageStore;
