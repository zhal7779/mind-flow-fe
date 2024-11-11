import { atom } from "recoil";
import { FileList } from "../../types/fileType";

export const fileDataState = atom<FileList[] | []>({
  key: "fileDataState",
  default: [],
});
