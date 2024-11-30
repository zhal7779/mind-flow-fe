import { GeneralNode } from '../types/treeType';

const nodeLineProps = (node: GeneralNode) => {
  const { x: x1, y: y1 } = node.parent_node.position;

  const {
    x: x2,
    y: y2,
    r: r2,
    t: t2,
  } = node.position || { x: 0, y: 0, r: 0, t: 0 };
  return {
    $top: t2,
    $right: r2,
    $width: Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
    $angle: (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI,
  };
};

export default nodeLineProps;
