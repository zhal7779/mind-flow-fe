import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie } from "../auth/cookie";

const baseUrl = import.meta.env.VITE_API_URL;

// axios 인스턴스 생성 함수
const createAxiosInstance = (
  baseURL: string, // 도메인
  getAuthToken: () => string | undefined, // 토큰
  contentType: string = "application/json;charset=UTF-8", // 컨텐츠 타입
  additionalConfig?: AxiosRequestConfig //추가 설정
): AxiosInstance => {
  // 새로운 인스턴스 생성
  const instance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    ...additionalConfig,
  });

  //요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      // 요청을 보내기 전에 작업 수행
      const token = getAuthToken();
      if (token) {
        config.headers.Accept = "application/json, text/plain, */*";
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = contentType;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  // 응답 인터셉터
  instance.interceptors.response.use(
    (response) => response, // 응답 데이터를 처리
    (error) => Promise.reject(error)
  );

  return instance;
};

//기본 인스턴스
const instance = createAxiosInstance(baseUrl, getCookie);

export default { instance };
