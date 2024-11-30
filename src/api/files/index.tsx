import { instance } from '../instance';
import { IFile } from '../../types/fileType';
import { AxiosResponse } from 'axios';

//최근 열기 파일 가져오기
const getFiles = async (): Promise<IFile[]> => {
  const { data } = await instance.get('/api/file');
  return data;
};

// 즐겨찾기 파일 불러오기
const getBookmarkFiles = async (tag: string): Promise<IFile[]> => {
  const { data } = await instance.get(`/api/file/bookmark?tag=${tag}`);

  return data;
};

// 휴지통 파일 불러오기
const getStorageFiles = async (): Promise<IFile[]> => {
  const { data } = await instance.get('/api/file/storage');

  return data;
};

//파일 태그 수정
const patchFileTag = async (payload: {
  file_id: string;
  tag: string;
}): Promise<AxiosResponse> => {
  const response = await instance.patch('/api/file/update/tag', payload);
  return response;
};

export { getFiles, getBookmarkFiles, getStorageFiles, patchFileTag };
