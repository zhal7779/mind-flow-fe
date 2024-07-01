import React, { useState } from 'react';
import { TreeContainer } from './styles';
import NodeRender from '../NodeRender';

const MindMapTree = () => {
  const [tree, setTree] = useState({
    title: 'Root',
    node: 0,
    position: { x: 0, y: 0 },
    parentNode: {
      node: -1,
      position: { x: 0, y: 0 },
    },
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  function addNode(targetNode) {
    const updateTree = (curNode, level) => {
      if (curNode.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
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
  }

  const updateNodePosition = (node, position) => {
    const updatePosition = (tree) => {
      if (tree.node === node) {
        return { ...tree, position };
      }
      return { ...tree, childNode: tree.childNode.map(updatePosition) };
    };
    setTree((prevTree) => updatePosition(prevTree));
  };

  function deleteNode(targetNode) {
    const updateTree = (tree) => {
      if (tree.node === targetNode) {
        return { ...tree, childNode: [] };
      }
      return {
        ...tree,
        childNode: tree.childNode.map((child) => updateTree(child)),
      };
    };
    setTree((prevTree) => updateTree(prevTree));
  }

  return (
    <TreeContainer>
      <NodeRender
        tree={tree}
        node={tree}
        addNode={addNode}
        updateNodePosition={updateNodePosition}
        deleteNode={deleteNode}
      />
    </TreeContainer>
  );
};

export default MindMapTree;
