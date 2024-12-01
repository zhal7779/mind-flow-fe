import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getTree, putTree } from '../api/tree';
import { ITree } from '../types/treeType';
import { alert } from '../utils/alert';
import { useNavigate } from 'react-router-dom';

const useReadTreeQuery = (file_id: string) =>
  useQuery<ITree, Error>({
    queryKey: ['tree', file_id],
    queryFn: () => getTree(file_id),
  });

const useUpdateTreeQuery = (queryKey: string[]) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: ITree) => {
      await putTree(payload);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: queryKey });
      alert('파일이 저장되었습니다.', 'success');
      return navigate(-1);
    },
    onError(error) {
      console.error(error);
    },
  });
};

export { useReadTreeQuery, useUpdateTreeQuery };
