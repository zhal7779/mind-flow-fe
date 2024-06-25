import React, { useState } from "react";
import { Wrapper } from "./styles";
import Node from "../Node";

const MindMapTree = () => {
  const [tree, setTree] = useState({
    title: "level.0 -root",
    node: 0,
    parentNode: null,
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  function addNode(targetNode) {
    const updateTree = (currentTree, level) => {
      if (currentTree.node === targetNode) {
        const newNode = {
          title: `level.${level} - node${nodeValue}`,
          node: nodeValue,
          parentNode: targetNode,
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
      <Node tree={tree} addNode={addNode} deleteNode={deleteNode} />
    </Wrapper>
  );
};

export default MindMapTree;
