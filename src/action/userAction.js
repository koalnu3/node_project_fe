import api from "../utils/api";

export const registerUser = async ({
  email,
  password,
  nickname,
  phonenumber,
  type,
}) => {
  return await api.post("/user/", {
    email,
    password,
    nickname,
    phoneNumber: phonenumber,
    type,
  });
};
