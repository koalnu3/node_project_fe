import create from 'zustand';

//예시입니다
const userStore = create((set) => ({
  user:{
    id:0,
    nickname:'aaa',
    email:'',
    profileImage:'',
    phoneNumber:'',
    level:'student',
    greetings:''
  },
 setUser: (updateFn) => set((state) => ({
    user: updateFn(state.user)
  })),}));

export default userStore;