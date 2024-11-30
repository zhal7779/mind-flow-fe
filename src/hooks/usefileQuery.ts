import { useQuery } from '@tanstack/react-query';
import { getFiles, getBookmarkFiles, getStorageFiles } from '../api/files';
import { IFile } from '../types/fileType';

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

export { useGetFilesQuery, useGetBookmarkFilesQuery, useGetStorageFilesQuery };
