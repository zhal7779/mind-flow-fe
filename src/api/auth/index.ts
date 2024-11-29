import { instance } from "../instance";

const usePostJoin = async (payload: {
  id: string;
  name: string;
  password: string;
}) => {
  const { data } = await instance.post("/api/auth/", payload);
  return data;
};

const usePostLogin = async () => {};

export { usePostJoin, usePostLogin };
