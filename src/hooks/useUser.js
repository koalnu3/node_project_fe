import api from "../utils/api";

export const registerUser = async ({
  email,
  password,
  nickname,
  phonenumber,
  type,
  level,
}) => {
  return await api.post("/user", {
    email,
    password,
    nickname,
    phoneNumber: phonenumber,
    type,
    level,
  });
};

export const loginUser = async ({ email, password }) => {
  return await api.post("/auth/login", {
    email,
    password,
  });
};

export const loginWithToken = async () => {
  return await api.get("/user/me");
};
