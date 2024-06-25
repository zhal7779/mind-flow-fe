import React, { useCallback, useState } from "react";
import { Wrapper } from "./styles";
import Node from "../Node";

const MindMapTree = () => {
  const [tree, setTree] = useState({
    title: "level.0 -root",
    node: 0,
    position: { top: 0, left: 0 },
    parentNode: null,
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  const updateNodePosition = useCallback((node, position) => {
    const updatePosition = (tree) => {
      if (tree.node === node) {
        return { ...tree, position };
      }
      return { ...tree, childNode: tree.childNode.map(updatePosition) };
    };
    setTree((prevTree) => updatePosition(prevTree));
  }, []);

  function addNode(targetNode) {
    const updateTree = (currentTree, level) => {
      if (currentTree.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
          node: nodeValue,
          parentNode: targetNode,
          position: { top: 0, left: 0 },
          childNode: [],
        };

        return {
          ...currentTree,
          childNode: [...currentTree.childNode, newNode],
        };
      }

      return {
        ...currentTree,
        childNode: currentTree.childNode.map((child) =>
          updateTree(child, level + 1)
        ),
      };
    };

    setTree((currentTree) => updateTree(currentTree, 1));
    setNodeValue((prevValue) => prevValue + 1);
  }

  function deleteNode(targetNode) {
    const updateTree = (currentTree) => {
      if (currentTree.node === targetNode) {
        return { ...currentTree, childNode: [] };
      }

      return {
        ...currentTree,
        childNode: currentTree.childNode.map((child) => updateTree(child)),
      };
    };
    setTree((currentTree) => updateTree(currentTree));
  }

  return (
    <Wrapper>
      <Node
        tree={tree}
        addNode={addNode}
        deleteNode={deleteNode}
        updateNodePosition={updateNodePosition}
      />
    </Wrapper>
  );
};

export default MindMapTree;
