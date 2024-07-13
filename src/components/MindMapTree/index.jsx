import React, { useEffect, useRef, useState } from "react";
import { TreeContainer } from "./styles";
import NodeRender from "../NodeRender";

const MindMapTree = () => {
  const [tree, setTree] = useState({
    value: "Root",
    node: 0,
    position: { x: 0, y: 0 },
    parentNode: {
      node: -1,
      position: { x: 0, y: 0 },
    },
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);
  const treeRef = useRef(null);
  const treeChangedRef = useRef(true);

  const addNode = (targetNode) => {
    const updateTree = (curNode, level) => {
      if (curNode.node === targetNode) {
        treeChangedRef.current = true;
        const newNode = {
          value: `level.${level} - node${nodeValue}`,
          node: nodeValue,
          position: { x: 0, y: 0 },
          parentNode: {
            node: curNode.node,
            position: curNode.position,
          },
          childNode: [],
        };

        return {
          ...curNode,
          childNode: [...curNode.childNode, newNode],
        };
      }
      return {
        ...curNode,
        childNode: curNode.childNode.map((child) =>
          updateTree(child, level + 1)
        ),
      };
    };
    setTree((prevTree) => updateTree(prevTree, 1));
    setNodeValue((prevValue) => prevValue + 1);
  };

  const deleteNode = (targetNode) => {
    const updateTree = (tree) => {
      if (tree.node === targetNode) {
        treeChangedRef.current = true;
        return { ...tree, childNode: [] };
      }
      return {
        ...tree,
        childNode: tree.childNode.map((child) => updateTree(child)),
      };
    };
    setTree((prevTree) => updateTree(prevTree));
  };

  const updateNodePosition = (node, nodeId, curPosition, parentPositon) => {
    if (node.node === parseInt(nodeId)) {
      const { position: prevPosition } = node;
      if (
        prevPosition.x !== curPosition.x ||
        prevPosition.y !== curPosition.y
      ) {
        return {
          ...node,
          parentNode: {
            ...node.parentNode,
            position: parentPositon,
          },
          position: curPosition,
        };
      }
    }

    if (node.childNode) {
      const parentNodePosition = node.position;
      return {
        ...node,
        childNode: node.childNode.map((child) =>
          updateNodePosition(child, nodeId, curPosition, parentNodePosition)
        ),
      };
    }
    return node;
  };

  const updateTreeWithNodePositions = (treeRef, setTree) => {
    const positionCalculate = (node) => {
      const { width, height, x, y } = node.getBoundingClientRect();
      return {
        x: x,
        y: y,
        r: width / 2,
        t: height / 2,
      };
    };

    const treePositionRecursion = (node) => {
      if (!node.children) {
        return;
      }
      if (node.id) {
        const currentPosition = positionCalculate(node);
        setTree((prevTree) =>
          updateNodePosition(prevTree, node.id, currentPosition, tree.position)
        );
      }
      Array.from(node.children).forEach((child) => {
        treePositionRecursion(child);
      });
    };

    if (treeRef.current) {
      treePositionRecursion(treeRef.current);
    }
  };

  useEffect(() => {
    if (treeChangedRef.current) {
      updateTreeWithNodePositions(treeRef, setTree);
      treeChangedRef.current = false;
    }
  }, [tree]);

  return (
    <TreeContainer>
      <NodeRender
        node={tree}
        addNode={addNode}
        deleteNode={deleteNode}
        ref={treeRef}
      />
    </TreeContainer>
  );
};

export default MindMapTree;
