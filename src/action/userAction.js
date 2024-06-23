import api from "../utils/api";

export const registerUser = async ({
  email,
  password,
  nickname,
  phonenumber,
  type,
}) => {
  return await api.post("/user", {
    email,
    password,
    nickname,
    phoneNumber: phonenumber,
    type,
  });
};

export const loginUser = async ({ email, password }) => {
  return await api.post("/auth/login", {
    email,
    password,
  });
};
