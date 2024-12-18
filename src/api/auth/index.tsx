import { instance } from "../instance";

//아이디 중복 조회
const postDuplicateId = async (id: string | undefined) => {
  const { data } = await instance.post("/api/auth/duplicate-id", { id });

  return data;
};

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
//로그아웃
const postLogout = async () => {
  const { data } = await instance.post("/api/auth/logout");

  return data;
};

export { postDuplicateId, postJoin, postLogin, postLogout };
