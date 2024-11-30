import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getFiles,
  getBookmarkFiles,
  getStorageFiles,
  patchFileTag,
  deleteFile,
} from '../api/files';
import { IFile } from '../types/fileType';
import { alert } from '../utils/alert';

const useGetFilesQuery = (options?: { enabled?: boolean }) =>
  useQuery<IFile[], Error>({
    queryKey: ['files'],
    queryFn: getFiles,
    enabled: options?.enabled,
  });
const useGetBookmarkFilesQuery = (
  tag: string,
  options?: { enabled?: boolean }
) =>
  useQuery<IFile[], Error>({
    queryKey: ['bookmarkfiles', tag],
    queryFn: () => getBookmarkFiles(tag),
    enabled: options?.enabled,
  });

const useGetStorageFilesQuery = (options?: { enabled?: boolean }) =>
  useQuery<IFile[], Error>({
    queryKey: ['storagefiles'],
    queryFn: getStorageFiles,
    enabled: options?.enabled,
  });

const usePatchFileTagQuery = (queryKey: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { file_id: string; tag: string }) => {
      await patchFileTag(payload);
    },
    onSuccess() {
      return queryClient.invalidateQueries({ queryKey: queryKey });
    },
    onError(error) {
      console.error(error);
    },
  });
};

const useDeleteFileQuery = (queryKey: string[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { file_list: string[] }) => {
      await deleteFile(payload);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKey });

      return alert('파일이 삭제되었습니다.', 'success');
    },
    onError(error) {
      console.error(error);
    },
  });
};

export {
  useGetFilesQuery,
  useGetBookmarkFilesQuery,
  useGetStorageFilesQuery,
  usePatchFileTagQuery,
  useDeleteFileQuery,
};
