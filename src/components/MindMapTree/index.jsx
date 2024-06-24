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

  //트리 렌더링  컴포넌트
  const TreeNode = ({ node, level }) => {
    console.log(node);
    const handleOver = (e) => {
      setActive(node.node);
    };

    const handleAddNode = (e) => {
      addNode(node.node);

      e.stopPropagation();
    };

    const handleDeleteNode = (e) => {
      deleteNode(node.node);
      setActive(null);
      e.stopPropagation();
    };

    console.log(S.Button);

    return (
      <S.Node className="node">
        <S.NodeText>{node.title}</S.NodeText>
        <>
          <S.Button
            style={{ right: "-4rem" }}
            $size={2.6}
            $color={"var(--color-blue)"}
            onClick={(e) => {
              handleAddNode(e); // 버튼 클릭 시 노드 추가 함수 호출
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </S.Button>
          <S.Button
            style={{ right: "-1.5rem" }}
            $size={2}
            $color={"var(--color-red)"}
            onClick={(e) => {
              handleDeleteNode(e); // 버튼 클릭 시 노드 삭제 함수 호출
            }}
          >
            <FontAwesomeIcon icon={faMinus} />
          </S.Button>
        </>

        {node.childNode && node.childNode.length > 0 && (
          <S.NodeContent>
            {node.childNode.map((child, index) => (
              <React.Fragment key={child.node}>
                {index > -1 && <S.Line />}
                <TreeNode node={child} level={level + 1} />
              </React.Fragment>
            ))}
          </S.NodeContent>
        )}
      </S.Node>
    );
  };

  return (
    <S.Wrapper>
      <TreeNode node={tree} level={1} xPos={0} />
    </S.Wrapper>
  );
};

export default MindMapTree;
