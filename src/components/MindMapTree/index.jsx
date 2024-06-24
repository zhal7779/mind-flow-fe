import React, { useState } from "react";
import * as S from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const MindMapTree = () => {
  const [tree, setTree] = useState({
    title: "level.0 -root",
    node: 0,
    parentNode: null,
    childNode: [],
  });

  const [nodeValue, setNodeValue] = useState(1);
  const [active, setActive] = useState(null);

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

  const TreeNode = ({ node }) => {
    const handleAddChild = () => {
      addNode(node.node); // 해당 노드에 새로운 자식 노드 추가
    };

    const handleDeleteNode = () => {
      deleteNode(node.node); // 해당 노드 삭제
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <S.Node>
          <S.Button
            onClick={handleAddChild}
            style={{ right: "-4rem" }}
            $size={2.6}
            $color={"var(--color-blue)"}
          >
            <FontAwesomeIcon icon={faPlus} />
          </S.Button>
          <S.Button
            onClick={handleDeleteNode}
            style={{ right: "-1.5rem" }}
            $size={2}
            $color={"var(--color-red)"}
          >
            <FontAwesomeIcon icon={faMinus} />
          </S.Button>
          <S.NodeText>{node.title}</S.NodeText>
        </S.Node>
        {node.childNode.length > 0 && (
          <div style={{ marginLeft: "30px" }}>
            {node.childNode.map((child, index) => (
              <React.Fragment key={child.node}>
                {/* {index > -1 && <S.Line />} */}
                <TreeNode
                  node={child}
                  addNode={addNode}
                  deleteNode={deleteNode}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <S.Wrapper>
      <TreeNode node={tree} level={1} xPos={0} />
    </S.Wrapper>
  );
};

export default MindMapTree;
