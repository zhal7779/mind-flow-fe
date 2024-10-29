interface Position {
  x: number;
  y: number;
  r: number;
  t: number;
}

interface ParentNode {
  node: number;
  position: Position;
}

interface TreeNode {
  value: string;
  node: number;
  level: number;
  position: Position;
  parentNode: ParentNode;
  leftChildNode: TreeNode[];
  rightChildNode: TreeNode[];
}

export interface FileDataType {
  fileName: string;
  tree: TreeNode;
}
