import { instance } from '../instance';

//트리 데이터 가져오기
const getTree = async (file_id: string) => {
  const { data } = await instance.get(`/api/node/tree?file_id=${file_id}`);
  return data.data;
};

export { getTree };
