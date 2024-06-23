import React, { useState } from "react";
import * as S from "./styles";

const Tree = () => {
  const [tree, setTree] = useState({
    title: "root",
    node: 0,
    parentNode: null,
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);

  function addNode(parentNode) {
    const updateTree = (currentNode, level) => {
      if (currentNode.node === parentNode) {
        return {
          ...currentNode,
          childNode: [
            ...currentNode.childNode,
            {
              title: "level" + level,
              node: nodeValue,
              parentNode: parentNode,
              childNode: [],
            },
          ],
        };
      }

      return {
        ...currentNode,
        childNode: currentNode.childNode.map((child) =>
          updateTree(child, level + 1)
        ),
      };
    };

    setTree((prevTree) => updateTree(prevTree, 1));

    setNodeValue((prevValue) => prevValue + 1);
  }

  const TreeNode = ({ node }) => {
    const handleClick = (e) => {
      console.log(node.node);
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
    <S.Wrapper>
      <TreeNode node={tree} />
    </S.Wrapper>
  );
};

export default Tree;
