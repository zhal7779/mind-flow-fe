import { ITree } from '../../types/treeType';
import { instance } from '../instance';

//트리 데이터 가져오기
const getTree = async (file_id: string) => {
  const { data } = await instance.get(`/api/node/tree?file_id=${file_id}`);
  return data.data;
};

//트리 데이터 저장
const putTree = async (newTree: ITree) => {
  const { data } = await instance.put('/api/node/tree/update', newTree);
  return data.data;
};

export { getTree, putTree };
