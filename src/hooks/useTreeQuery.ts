import { useQuery } from '@tanstack/react-query';
import { getTree } from '../api/tree';
import { ITree } from '../types/treeType';

const useReadTreeQuery = (file_id: string) =>
  useQuery<ITree, Error>({
    queryKey: ['tree', file_id],
    queryFn: () => getTree(file_id),
  });

export { useReadTreeQuery };
