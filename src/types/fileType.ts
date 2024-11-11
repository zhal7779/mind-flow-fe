export interface Position {
  x: number;
  y: number;
  r: number;
  t: number;
}

interface ParentNode {
  node: number;
  position: Position;
}

interface BaseNode {
  value: string;
  node: number;
  level: number;
  position: Position;
}

interface ChildNode extends BaseNode {
  side: string;
  parentNode: ParentNode;
}

export interface GeneralNode extends ChildNode {
  childNode: ChildNode[];
}

export interface RootNode extends BaseNode {
  parentNode: ParentNode;
  leftChildNode: GeneralNode[];
  rightChildNode: GeneralNode[];
}

export interface FileList {
  fileName: string;
  updatedDate: string;
  tree: RootNode;
}
