import axios, { AxiosError } from "axios";

export interface ResponseDataType {
  msg: string;
  code: number;
}

export const isAxiosError = <ResponseDataType>(
  error: unknown
): error is AxiosError<ResponseDataType> => {
  return axios.isAxiosError(error);
};
