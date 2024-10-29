import { atom } from "recoil";
import { FileDataType } from "../../types/fileDataType";

export const fileDataState = atom<FileDataType[] | []>({
  key: "fileDataState",
  default: [],
});
