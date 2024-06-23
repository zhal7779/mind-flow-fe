import React, { useState } from "react";
import * as S from "./styles";

const Tree = () => {
  const [tree, setTree] = useState({
    title: "root",
    node: 0,
    parentNode: null,
    childNode: [],
  });

  function addNode(parentNode) {
    const updateTree = (currentNode) => {
      if (currentNode.node === parentNode) {
        return {
          ...currentNode,
          childNode: [
            ...currentNode.childNode,
            {
              title: "level" + (parentNode + 1),
              node: parentNode + 1,
              parentNode: parentNode,
              childNode: [],
            },
          ],
        };
      }

      return {
        ...currentNode,
        childNode: currentNode.childNode.map((child) => updateTree(child)),
      };
    };

    setTree((prevTree) => updateTree(prevTree));
  }
  console.log(tree);
  const TreeNode = ({ node }) => {
    const handleClick = (e) => {
      e.stopPropagation();
      addNode(node.node);
    };

    return (
      <S.Node onClick={handleClick}>
        {node.title}
        {node.childNode && node.childNode.length > 0 && (
          <ul>
            {node.childNode.map((child, index) => (
              <TreeNode key={index} node={child} />
            ))}
          </ul>
        )}
      </S.Node>
    );
  };

  return (
    <div>
      <TreeNode node={tree} />
    </div>
  );
};

export default Tree;
