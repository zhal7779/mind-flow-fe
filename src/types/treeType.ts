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

export interface ChildNode extends BaseNode {
  side: string;
  parentNode: ParentNode;
  childNode: ChildNode[] | [];
}

export interface GeneralNode extends ChildNode {
  childNode: ChildNode[] | [];
}

export interface RootNode extends BaseNode {
  parentNode: ParentNode;
  leftChildNode: GeneralNode[];
  rightChildNode: GeneralNode[];
}

export interface ITree {
  node_id: number;
  file_id: string;
  value: string;
  node: number;
  level: number;
  position: Position;
  parent_node: ParentNode;
  left_child: ChildNode[];
  right_child: ChildNode[];
}
