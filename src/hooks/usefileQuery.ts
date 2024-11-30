import { useQuery } from '@tanstack/react-query';
import { getFiles, getBookmarkFiles, getStorageFiles } from '../api/files';
import { IFile } from '../types/fileType';

const useGetFilesQuery = (options?: { enabled?: boolean }) =>
  useQuery<IFile[], Error>({
    queryKey: ['files'],
    queryFn: getFiles,
    enabled: options?.enabled,
  });
const useGetBookmarkFilesQuery = (tag: string) =>
  useQuery<IFile[], Error>({
    queryKey: ['bookmarkfiles', tag],
    queryFn: () => getBookmarkFiles(tag),
  });

const useGetStorageFilesQuery = () =>
  useQuery<IFile[], Error>({
    queryKey: ['storagefiles'],
    queryFn: getStorageFiles,
  });

export { useGetFilesQuery, useGetBookmarkFilesQuery, useGetStorageFilesQuery };
