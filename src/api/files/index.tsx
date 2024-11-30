import { instance } from '../instance';
import { IFile } from '../../types/fileType';

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

export { getFiles, getBookmarkFiles, getStorageFiles };
