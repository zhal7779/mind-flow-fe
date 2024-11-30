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

const postFile = async () => {
  const { data } = await instance.post('/api/file/create');
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

//파일 복구
const patchRestoreFile = async (payload: {
  file_list: string[];
}): Promise<AxiosResponse> => {
  const response = await instance.patch(`/api/file/update/storage`, payload);
  return response;
};
// 파일 삭제 (보관함 이동)
// 실제 삭제가 아니기에 api 메소드는 patch 사용
const deleteFile = async (payload: {
  file_list: string[];
}): Promise<AxiosResponse> => {
  const response = await instance.patch(`/api/file/delete`, payload);
  return response;
};

export {
  getFiles,
  getBookmarkFiles,
  getStorageFiles,
  postFile,
  patchFileTag,
  patchRestoreFile,
  deleteFile,
};
