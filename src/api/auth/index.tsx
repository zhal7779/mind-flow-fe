import { instance } from "../instance";

//회원가입
const postJoin = async (payload: {
  id: string;
  name: string;
  password: string;
}) => {
  const { data } = await instance.post("/api/auth/", payload);
  return data;
};

//로그인
const postLogin = async (payload: {
  id: undefined | string;
  password: undefined | string;
}) => {
  const { data } = await instance.post("/api/auth/login", payload);

  return data;
};

export { postJoin, postLogin };
