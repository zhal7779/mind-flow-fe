import { atom } from 'recoil';
import { RootNode } from '../../types/treeType';

export const treeState = atom<RootNode>({
  key: 'treeState',
  default: {
    value: '',
    node: 0,
    level: 0,
    position: { x: 0, y: 0, r: 0, t: 0 },
    parent_node: {
      node: 0,
      position: { x: 0, y: 0, r: 0, t: 0 },
    },
    left_child: [],
    right_child: [],
  },
});
