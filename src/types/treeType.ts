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
  parent_node: ParentNode;
  child_node: ChildNode[] | [];
}

export interface GeneralNode extends ChildNode {
  child_node: ChildNode[] | [];
}

export interface RootNode extends BaseNode {
  parent_node: ParentNode;
  left_child: GeneralNode[];
  right_child: GeneralNode[];
}

export interface ITree {
  node_id: number;
  file_id: string;
  file_name: string;
  tag: null | string;
  theme_color: string;
  updated_at: string;
  tree: {
    value: string;
    node: number;
    level: number;
    position: Position;
    parent_node: ParentNode;
    left_child: GeneralNode[];
    right_child: GeneralNode[];
  };
}
