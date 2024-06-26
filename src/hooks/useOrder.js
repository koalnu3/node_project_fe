import api from "../utils/api";

export const createOrder = async ({ classId, price, payMethod }) => {
  return await api.post("/order", {
    classId,
    price,
    payMethod,
  });
};
